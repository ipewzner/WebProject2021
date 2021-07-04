import massges from '../models/massgesSchema.js';
import Rooms from '../models/roomSchema.js';
import fs from 'fs';
/*
import { getRoomList, setRoom, sendMessage, setNewGrupe,
     deleteMessage, infoMsgTest, likeMessage, dislikeMessage } from '../controllers/chat.js'
*/
let users = [];
let roomList = [];

const koko = (io, socket) => {

    //----------------------------------
    const joinServer = async (userName, cb) => {
        const user = { userName, id: socket.id };
        console.log("join server: " + JSON.stringify(userName.email));
        users.findIndex(u => u == user) > -1 && users.push(user);
        io.emit("new user", users);
        try {
            user.userName.type == 'admin' ?
                roomList = await Rooms.find() :
                roomList = await Rooms.find({ approved: true });

            roomList.forEach((room) => {
                if (room.image.mime != "" && room.image.mime != "url")
                    room.image.img = fs.readFileSync(room.image.img, { encoding: 'base64' });
            });
        }
        catch (e) { console.log(e); }
        cb(roomList);
    }

    const joinRoom = async (data, cb) => {
        console.log("join room: " + data.room.name);
        socket.join(data.room.name);
        cb(await Message(data));
    }

    const disconnect = async (u) => {
        users = users.filter(u = u.id !== socket.id);
        io.emit('new user', users);
    }

    //----*----------

    const Message = async (data) => {
        console.log("sendMessage for room: " + data.room.name);
        let messages = [];
        try {
            messages = await massges.find({ room: data.room._id });
            if (data.room.admin !== data.user.email && data.user.type !== 'admin' && messages.length > 0)
                messages = await messages.filter(msg => !msg.toAdmin);
            await messages.sort((a, b) => new Date(a.time) - new Date(b.time));
            messages.forEach((msg) => {
                if (msg.image.mime != "" && msg.image.mime != "url")
                    msg.image.img = fs.readFileSync(msg.image.img, { encoding: 'base64' });
            });
        }
        catch (e) { console.log(e); }
        //  console.log(messages);
        return messages;
    }

    const search = async (data, cb) => {
        console.log("data " + data.search)
        let messages = [];
        messages = await Message({ room: data.room, user: data.user });
        messages = messages.filter(msg => msg.msg.search(data.search) > -1);
        cb(messages);
    }

    //--------------------------------

    const sendMessage = async (Data) => {

        console.log("****** 0.2 ******users " + JSON.stringify(users));
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
        try {
            if (Data.admin.length < 1) { socket.emit('info', "Error: Try to login again."); return 0; }
            if (Data.name.length < 1) { socket.emit('info', "Error: Name mest be longer."); return 0; }
            if (Data.image.mime != "" && Data.image.mime != "url") {
                try {
                    fs.writeFile('./public/images/' + Data.image.name, Data.image.img, (err) => console.log(err ? err : "success"));
                    let filePath = "./public/images/" + Data.image.name;
                    delete Data.image.img;
                    Data.image.img = filePath;
                } catch (e) { console.log(e); }
            }

            const newRoom = new Rooms(Data);
            await newRoom.save().then(() => socket.emit('info', "New room created"));
        } catch (err) {
            socket.emit('info', "Error: fail to open new grupe.");
            console.log("--*** ERR ***--"); console.log(err); console.log("--*** ERR ***--");
        }
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

    const approvedJoinRoomRequest = async (Data) => {
        console.log("approvedJoinRoomRequest");
        try {
            await Rooms.update({ _id: Data.message.room }, { $push: { users: Data.message.creatorEmail } }, function (err, docs) {
                err ? console.log("***" + err) : console.log("approvedJoinRoomRequest : ", docs);
            });
            await deleteMessage(Data);
            await socket.emit('info', "User join to the room!");
        } catch (e) { console.log("----//---" + e + "----//---"); }
    }

    const roomApprove = async (Data) => {
        //  console.log("room Approve "+JSON.stringify(Data));
        console.log("room Approve " + Data.room.approved);
        try {
            await Rooms.update({ _id: Data.room._id }, { $set: { approved: Data.room.approved } }, function (err, docs) {
                err ? console.log("***" + err) : console.log("room Approve : ", docs);
            });
            await socket.emit('info', "Room approve changed!");
        } catch (e) { console.log("----//---" + e + "----//---"); }
    }

    const deleteRoom = async (Data,cb) => {
        console.log("delete Room"); 
        try {
            await Rooms.findOne({ _id: Data.room._id }).then(async(room) => {
                console.log("room1 "+JSON.stringify(room)); 
                await massges.remove({ room: room._id });
                await Rooms.remove({ _id: room._id });
                socket.emit('info', "room and all is massges deleted!");
                cb(await Rooms.find());
            });
        } catch (e) { 
            console.log("err: "+e); 
        socket.emit('info', "room delete fail!"); 
    }
    }

    const totelLikesAndDislikes = async (data, cb) => {
        console.log("totelLikesAndDislikes " + (data.email))
        let message = [];
        message = await massges.find({ creatorEmail: data.email });
        let likes = message.map(msg => msg.likes.length).reduce((acc, msg) => msg + acc);
        let dislikes = message.map(msg => msg.dislikes.length).reduce((acc, msg) => msg + acc);
        cb({ likes: likes, dislikes: dislikes });
    }
    
    socket.on("deleteRoom", deleteRoom);
    socket.on("room approve", roomApprove);
    socket.on("join server", joinServer);
    socket.on('join room', joinRoom);
    socket.on('disconnect', disconnect);
    socket.on("search", search);
    socket.on("sendMessage", sendMessage);
    socket.on("setNewGrupe", setNewGrupe);
    socket.on("deleteMessage", deleteMessage);
    socket.on("infoMsgTest", infoMsgTest);
    socket.on("likeMessage", likeMessage);
    socket.on("dislikeMessage", dislikeMessage);
    socket.on("approvedJoinRoomRequest", approvedJoinRoomRequest);
    socket.on("totelLikesAndDislikes", totelLikesAndDislikes);
}
export default koko;

function reverseString(str) {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--) { newString += str[i]; }
    return newString;
}
