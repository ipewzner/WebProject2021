//import {setRoom,sendMessage} from '../Socket.js';
import mongoose from 'mongoose';
import massges from '../models/massgesSchema.js';
import Rooms from '../models/roomSchema.js';
import fs from 'fs';
import { isObject } from 'util';

export const onConnection = async (socket) => {
    console.log("i am in onConnection function ");
    console.log("socket.id "+socket.id);
    console.log("socket.name ");
    socket.emit("your id", socket.id);
    //let roomList = await rooms.findAll();
    try { socket.emit('roomList', await Rooms.find()); }
    catch (e) { console.log("----//---" + e + "----//---"); }


    socket.on('setRoom', async (Data) => {
        console.log("User try to joined room: " + Data + " socket.id " + socket.id);
        socket.join(Data);
        try {
            const messages = await massges.find({ room: Data._id });
            messages.forEach((msg) => {
                console.log("msg.image.img = " + msg.image.img);
                // delete msg.image;
                if (msg.image.mime != "" && msg.image.mime != "url") msg.image.img = fs.readFileSync(msg.image.img, { encoding: 'base64' });
            });
            socket.emit('setMessages', messages);
            
        }
        catch (e) { console.log(e); }
        console.log("User joined room: " + Data + " socket.id " + socket.id);
    });

    socket.on('sendMessage', async (Data) => {
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
                socket.emit('NewMessage', Data);
                
            });
        } catch (e) { console.log("----//---" + e + "----//---"); }
    });

    socket.on('setNewGrupe', async (Data) => {
        console.log("------------------"); console.log("setNewGrupe: " + Data); console.log("------------------");
        try {
            const newRoom = new Rooms(Data);
            console.log("newRoom: " + newRoom); console.log("Data: " + Data.name);
            await newRoom.save().then(() => socket.emit('info', "New room created"));
        } catch (err) { console.log("--*** ERR ***--"); console.log(err); console.log("--*** ERR ***--"); }
    });

    socket.on('deleteMessage', async (Data) => {
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
    });

    socket.on('infoMsgTest', async (Data) => { console.log("inf"); socket.emit('info', "message testing works!"); });

    socket.on('likeMessage', async (Data) => {
        console.log("11111111");

        massges.findOne({ _id: Data.message._id }).then((msg) => {
            var likes = msg.likes ? msg.likes.indexOf(Data.user.result.email) : -1;
            var dislikes = msg.dislikes ? msg.dislikes.indexOf(Data.user.result.email) : -1;

            if (likes == -1 && dislikes == -1) msg.likes.push(Data.user.result.email);
            else if (dislikes > -1) { msg.dislikes.splice(dislikes, 1); msg.likes.push(Data.user.result.email); }
            else if (likes > -1) msg.likes.splice(likes, 1);

            massges.update({ _id: msg._id }, { $set: { likes: msg.likes, dislikes: msg.dislikes } }, function (err, docs) {
                err ? console.log(err) : console.log("Updated User : ", docs);
            }).then(() => {
                console.log("rrrrrr");
                socket.emit('updateMessages', {_id: msg._id, likes: msg.likes?msg.likes:[], dislike: msg.dislikes });
            })
        })
    });

    socket.on('dislikeMessage', async (Data) => {
        massges.findOne({ _id: Data.message._id }).then((msg) => {
            var likes = msg.likes ? msg.likes.indexOf(Data.user.result.email) : -1;
            var dislikes = msg.dislikes ? msg.dislikes.indexOf(Data.user.result.email) : -1;

            if (likes == -1 && dislikes == -1) msg.dislikes.push(Data.user.result.email);
            else if (likes > -1) { msg.likes.splice(likes, 1); msg.dislikes.push(Data.user.result.email); }
            else if (dislikes > -1) msg.dislikes.splice(dislikes, 1);

            massges.update({ _id: msg._id }, { $set: { likes: msg.likes, dislikes: msg.dislikes } }, function (err, docs) {
                err ? console.log(err) : console.log("Updated User : ", docs);
            });
        })
    });
}


function reverseString(str) {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}

/*
const fff()=>{
    const addGroup;
    const deleteGroup;

    const getMessage;
    const deleteMessage;
    const addNewMessage;

    const likeMessage;
    const dislikeMessage;

    const addUser;
    const removeUser;
    const getUser;
}

*/





