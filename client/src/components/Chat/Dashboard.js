import React, { useState, useRef, useEffect } from 'react';
import { produce, immer } from 'immer';
import { Hidden, Paper, Typography, List, ListItem, ListItemText, Chip, Button, TextField } from '@material-ui/core';
import NewGroupForm from './newGroupForm/newGroupForm.js';
import InfoPopup from './infoPopup.js';
//import { Delete, ThumbUpAlt, ThumbDownAlt } from '@material-ui/icons';
//import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

import useStyles from './styles';
import moment from 'moment';
import io from 'socket.io-client';
import Message from './Message/Message.js';
const CONECTION_PORT = 'http://localhost:4000/';

let socketRef;

export default function Dashboard() {

    const classes = useStyles();
    const socketRef = useRef();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [message, addMessage] = useState([]);
    const [textValue, changeTextValue] = useState('');
    const [room, setRoom] = useState(null);
    const [yourID, setYourID] = useState();
    const [file, setFile] = useState();
    const [roomList, setRoomList] = useState([]);
    const [infoMsg, setInfoMsg] = useState(null);
    const [tempData, setTempData] = useState(null);

    useEffect(() => {
        socketRef.current = io.connect(CONECTION_PORT, {
            withCredentials: true,
            extraHeaders: { "my-custom-header": "abcd" },
            methods: ["GET", "POST"],
        });
        socketRef.current.on("connect", () => socketRef.current.emit("getRoomList"))
        socketRef.current.on("your id", id => { setYourID(id); })
        socketRef.current.on('info', (Data) => { setInfoMsg(Data); })
        socketRef.current.on('roomList', (Data) => setRoomList(Data));
        socketRef.current.on('NewMessage', (Data) => addMessage(message => [...message, Data]));
        socketRef.current.on('updateMessages', (Data) => setTempData(Data));
        socketRef.current.on('setMessages', (Data) => {addMessage(Data);console.log("ddd " + message.length)});

    }, []);
    /*  useEffect(() =>{
          console.log( "1 message.length "+message.length);
          console.log( "2 message.length "+message.length);
      },[message]);
  */
    useEffect(() => {
        if (tempData) {
            let i = message.findIndex((x) => x._id == tempData._id);
            message[i].likes = tempData.likes;
            message[i].dislikes = tempData.dislikes;
        }
    }, [tempData]);

    return (
        <div>
            <Paper className={classes.root}>
                <InfoPopup msg={infoMsg} op={setInfoMsg} />
                <Typography variant="h5" component="h3">Chat app</Typography>
                <Typography component="p"> Topic placeHolder </Typography>
                <div className={classes.flex}>
                    <div className={classes.topicWindow}>
                        {/*  <Button size="small" color="primary" onClick={() => setNewGroup(true)}>
                            <GroupAddIcon fontSize="small">Add Group</GroupAddIcon>
                        </Button>*/}
                        <NewGroupForm socket={socketRef.current} user={user} ></NewGroupForm>
                        <List>
                            {
                                roomList.length > 0 ? roomList.map((topic, i) => (
                                    <ListItem key={i} button onClick={(e) => {
                                        setRoom(roomList[i]);
                                        socketRef.current.emit('setRoom',{room: roomList[i],user:user?.email});
                                    }}>
                                        <ListItemText primary={topic?.name} />
                                    </ListItem>
                                )) : console.log("roomList empty")
                            }
                        </List>
                    </div>
                    <div className={classes.chatWindow}>
                        {
                            message.length > 0 ? message.map((chat, i) => (
                                <div className={classes.flex} key={i}>
                                    <Message socket={socketRef.current} message={chat} user={user} />
                                </div>
                            )) : null
                        }
                    </div>
                </div>
                <div className={classes.flex}>
                    {room?.users.findIndex(x=>x==user?.email)>-1? (
                        <TextField label="send message" className={classes.chatBox} value={textValue} onChange={e => changeTextValue(e.target.value)} />
                    ) : null}

                    <input color="primary" accept="image/*" type="file" onChange={(e) => setFile(e.target.files[0])} id="icon-button-file" style={{ display: 'none', }} />
                    <label htmlFor="icon-button-file" hidden={!(room?.users.findIndex(x=>x==user?.email)>-1)}>
                        <Button component="span" className={classes.button} size="small" color="primary">
                            <AddPhotoAlternateIcon />
                        </Button>
                    </label>

                   {/* <Button variant="contained" onClick={(e) => socketRef.current.emit('infoMsgTest')} color="primary">infoMsgTest</Button>*/} <Button variant="contained" onClick={(e) => {
                            (room && user) ? socketRef.current.emit('sendMessage', {
                                creatorName: JSON.parse(localStorage.getItem('profile'))?.name,
                                creatorEmail: JSON.parse(localStorage.getItem('profile')).email,
                                room: room,
                                msg:room?.users.findIndex(x=>x==user?.email)>-1 ? ( textValue):(`Can i join the grope plases? `),
                                toAdmin:!(room?.users.findIndex(x=>x==JSON.parse(localStorage.getItem('profile'))?.email)>-1),     
                                image: { img: file ? file : "", mime: file ? file.type : "", name: file ? file.name : "" }, likes: [], dislikes: [], time: moment().format('YYYY-MM-DD HH:mm:ss')
                            }) : infoMessage("Make sure that you login and enter a Room")
                    }
                    } color="primary">{room?.users.findIndex(x=>x==user?.email)>-1 ? "send" : "Send request to join this room"}</Button>
                </div>
            </Paper>
            {/*   <NewGroupForm socket={socketRef.current} user={user} trigger={newGroup} setTrigger={setNewGroup} ></NewGroupForm>
         */}
        </div>
    )
}



const infoMessage = (msg) => {
    //TO_DO: make pupup message
    console.log("msg: " + msg);
}




