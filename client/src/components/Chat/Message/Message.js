import React, { useState, useEffect } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { ThumbUpAlt, ThumbDownAlt, Delete, MoreHorizontal } from '@material-ui/icons';
import moment from 'moment';
import useStyles from './styles';
import Image from './Image'

const Message = (props) => {

    const classes = useStyles();
    const socket = props.socket;
    const message = props.message;
    const user = props.user;
    const [likes, setLikes] = useState([]);
    const [dislikes, setDislikes] = useState(message.dislikes);

    useEffect(() => {
       setLikes(message.likes);
    }, [message.likes]);
   
    

    return (
        <Card className={classes.card}>
            <div className={classes.overlay}>
                <CardActions className={classes.cardActions}>
                    <Typography variant="h10">{message.creatorName}</Typography>
                    <Typography variant="body2">{message.time}</Typography>
                </CardActions>
            </div>
            <CardContent>{
                message.image?.mime != "" ? (
                    message.image.mime != "url" ? (
                        <Image fileName={message.image.name} blob={b64toBlob(message.image.img, message.image.type)}></Image>
                    ) : (<img style={{ width: 150, height: "auto" }} src={message.img} alt={props.fileName}></img>
                    )
                ) : null
            }
                <Typography variant="body2" color="textSecondary" variant="h5" components="p">{message.msg}</Typography>



            </CardContent>

            <CardActions className={classes.cardActions}>
            {message.toAdmin?(<Button size="small" color="primary" onClick={() => socket.emit('approvedJoinRoomRequest', { 'user': user, 'message': message })}>Yes</Button>):null}
              
                <Button size="small" color="primary" onClick={() => socket.emit('likeMessage', { 'user': user, 'message': message })}>
                    <ThumbUpAlt color="primary" fontSize="small" />
                    &nbsp;{likes?.length} Like &nbsp;

                </Button>
                <Button size="small" color="primary" onClick={() => socket.emit('dislikeMessage', { 'user': user, 'message': message })}>
                    <ThumbDownAlt color="primary" fontSize="small" />
                    &nbsp;{dislikes?.length} Dislike &nbsp;

                </Button>
                {(message.creatorEmail == user.result.email) ?
                    <Button size="small" color="primary"  onClick={() => socket.emit('deleteMessage', { 'user': user, 'message': message })}>
                        <Delete fontSize="small" />
                         Delete
                    </Button> : null}
            </CardActions>
        </Card>);
}
export default Message;

const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}