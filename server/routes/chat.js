import massges from '../models/massgesSchema.js';
import Rooms from '../models/roomSchema.js';
import fs from 'fs';
/*
import { getRoomList, setRoom, sendMessage, setNewGrupe,
     deleteMessage, infoMsgTest, likeMessage, dislikeMessage } from '../controllers/chat.js'
*/
const koko = (io, socket) => {

    const setRoom = async (Data) => {
        console.log("User try to joined room: " + JSON.stringify(Data) + " socket.id " + socket.id);
        socket.join(Data.room.name);
        try {
            const messages = await massges.find({ room: Data._id});
            messages.reduce((msg)=>{msg.toAdmin&&!Data.room.users.findIndex(x=>x==user)>-1});
            messages.forEach((msg) => {
                //if msg for admin && you the admin
           //     if (msg.toAdmin&&!Data.room.users.findIndex(x=>x==user)>-1);
                console.log("msg.image.img = " + msg.image.img);
                // delete msg.image;
                if (msg.image.mime != "" && msg.image.mime != "url") msg.image.img = fs.readFileSync(msg.image.img, { encoding: 'base64' });
            });
            socket.emit('setMessages', messages);
        }
        catch (e) { console.log(e); }
        console.log("User joined room: " + Data + " socket.id " + socket.id);
    }

    const sendMessage = async (Data) => {
        console.log("****** 0.2 ******");
        if (Data.image.mime != "" && Data.image.mime != "url") {
            fs.writeFile('./public/images/' + Data.image.name, Data.image.img, (err) => console.log(err ? err : "success"));
            let filePath = "./public/images/" + Data.image.name;
            delete Data.image.img;
            Data.image.img = filePath;
        }
        // console.log("****** 0.3 ******Data "+JSON.stringify(Data));
        try {
            const newMassge = new massges(Data);
            await newMassge.save().then(async (msg) => {
                Rooms.update({ _id: msg.room }, { $push: { massges: [msg._id] } }, function (err, docs) {
                    err ? console.log(err) : console.log("Updated User : ", docs);
                });
                if (msg.image.mime != "" && msg.image.mime != "url") Data.image.img = fs.readFileSync(Data.image.img, { encoding: 'base64' });
                io.to(Data.room.name).emit('NewMessage', Data);
                console.log("----// Data.room.name " + Data.room.name);
            });
        } catch (e) { console.log("----//---" + e + "----//---"); }
    }

    const setNewGrupe = async (Data) => {
        console.log("------------------"); console.log("setNewGrupe: " + Data); console.log("------------------");
        try {
            if(Data.admin.length<1){socket.emit('info', "Error: Try to login again."); return 0;}
            if(Data.name.length<1){socket.emit('info', "Error: Name mest be longer."); return 0;}
            const newRoom = new Rooms(Data);
            console.log("newRoom: " + newRoom); console.log("Data: " + Data);
            await newRoom.save().then(() => socket.emit('info', "New room created"));
        } catch (err) { socket.emit('info', "Error: fail to open new grupe.");
            console.log("--*** ERR ***--"); console.log(err); console.log("--*** ERR ***--"); }
    }

    const deleteMessage = async (Data) => {
        await massges.deleteOne({ _id: Data.message._id }).then(() => {
            Rooms.findOne({ _id: Data.message.room }).then((room) => {
                var msg = room.massges ? room.massges.indexOf(Data.message.room) : -1;
                room.massges.splice(msg, 1);
                Rooms.update({ _id: Data.message.room }, { $set: { massges: room.massges } }, function (err, docs) {
                    err ? console.log(err) : console.log("Updated User : ", docs);
                });
            });
        }).then(async () => {
            socket.emit('setMessages', await massges.find({ room: Data.message.room }));
            socket.emit('info', "message deleted");
        })
    }

    const infoMsgTest = async (Data) => { console.log("inf"); socket.emit('info', "message testing works!"); }

    const likeMessage = async (Data) => {
        console.log("11111111");
        massges.findOne({ _id: Data.message._id }).then((msg) => {
            var likes = msg.likes ? msg.likes.indexOf(Data.user.result.email) : -1;
            var dislikes = msg.dislikes ? msg.dislikes.indexOf(Data.user.result.email) : -1;

            if (likes == -1 && dislikes == -1) msg.likes.push(Data.user.result.email);
            else if (dislikes > -1) { msg.dislikes.splice(dislikes, 1); msg.likes.push(Data.user.result.email); }
            else if (likes > -1) msg.likes.splice(likes, 1);

            massges.update({ _id: msg._id }, { $set: { likes: msg.likes, dislikes: msg.dislikes } }, function (err, docs) {
                err ? console.log(err) : console.log("Updated massges : ", docs);
            }).then(() => {
                console.log("rrrrrr msg._id " + msg._id);
                socket.emit('updateMessages', { _id: msg._id, likes: msg.likes ? msg.likes : [], dislike: msg.dislikes ? msg.dislikes : [] });
            })
        })
    }

    const dislikeMessage = async (Data) => {
        massges.findOne({ _id: Data.message._id }).then((msg) => {
            var likes = msg.likes ? msg.likes.indexOf(Data.user.result.email) : -1;
            var dislikes = msg.dislikes ? msg.dislikes.indexOf(Data.user.result.email) : -1;

            if (likes == -1 && dislikes == -1) msg.dislikes.push(Data.user.result.email);
            else if (likes > -1) { msg.likes.splice(likes, 1); msg.dislikes.push(Data.user.result.email); }
            else if (dislikes > -1) msg.dislikes.splice(dislikes, 1);

            massges.update({ _id: msg._id }, { $set: { likes: msg.likes, dislikes: msg.dislikes } }, function (err, docs) {
                err ? console.log(err) : console.log("Updated massges : ", docs);
            }).then(() => {
                console.log("rrrrrr");
                socket.emit('updateMessages', { _id: msg._id, likes: msg.likes ? msg.likes : [], dislike: msg.dislikes ? msg.dislikes : [] });
            })
        })
    }

    const getRoomList = async (Data) => {
        try { socket.emit('roomList', await Rooms.find({approved:true})); }
        catch (e) { console.log("----//---" + e + "----//---"); }
    }

    const approvedJoinRoomRequest = async (Data) => {
        console.log("approvedJoinRoomRequest")
        try {
            Rooms.update({ _id: Data.message.room }, { $push: { users:Data.message.creatorEmail } }, function (err, docs) {
                err ? console.log(err) : console.log("approvedJoinRoomRequest : ", docs);
            });
            socket.emit('info', "User join to the room!");
        } catch (e) { console.log("----//---" + e + "----//---"); }

        //socket.to(Data.room.admin).emit("AdminJoinRoomRequest",Data);
    }

    socket.on("getRoomList", getRoomList);
    socket.on("setRoom", setRoom);
    socket.on("sendMessage", sendMessage);
    socket.on("setNewGrupe", setNewGrupe);
    socket.on("deleteMessage", deleteMessage);
    socket.on("infoMsgTest", infoMsgTest);
    socket.on("likeMessage", likeMessage);
    socket.on("dislikeMessage", dislikeMessage);
    socket.on("approvedJoinRoomRequest", approvedJoinRoomRequest);
}
export default koko;

function reverseString(str) {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--) { newString += str[i]; }
    return newString;
}
