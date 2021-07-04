import react, { useState, useEffect } from "react";
import { Avatar, Typography, Grid } from '@material-ui/core';
import useStyles from './styles';

const NewAvatar = (props) => {
    const classes = useStyles();
    const [imgSrc, setImgSrc] = useState("");
    let room = props.avatarFor ? props.avatarFor : { image: { mime: "" }, name: "Entar grupe." };

    useEffect(() => {
        switch (room.image.mime) {
            case "url": setImgSrc(room.image.name); break;
            case "": setImgSrc(null); break;
            default:
                let blob = b64toBlob(room.image.img, room.image.mime);
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => { setImgSrc(reader.result); }
        }
    }, [props]);
    return (
        <>
            <Grid className={classes.grid} container  >
                <Avatar className={classes.purple} alt={room.name} src={imgSrc}>{room?.name.charAt(0)}</Avatar>
                <Typography backgroundColor="blue" component="p"> {room?.name ? "" + room?.name : 'Entar grupe.'} </Typography>
            </Grid>
        </>
    );
}
export default NewAvatar;


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