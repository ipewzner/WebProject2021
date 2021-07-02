import React, { useState, useEffect } from 'react';
import { Dialog, Button, Grid, TextField, DialogTitle, DialogContentText, DialogActions, DialogContent } from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CloseIcon from '@material-ui/icons/Close';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

export default function AlertDialog(props) {
    const user = props.user;
    const socket = props.socket;
    const [open, setOpen] = React.useState(false);
    // const [groupData, setGroupData] = useState({ name: '', image:{}, admin: '', users: [null], massges: [] });
    const [file, setFile] = useState({ name: "", mime: "" });
    const [gropeName, changeGropeName] = useState("");

    const handleClickOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };
    const handleSubmit = (e) => {
        e.preventDefault();
        let image;
        if (gropeName != "") {
          
            switch (file.mime) {
                case "":
                    image = { img: "", mime: "", name: "" };
                    break;
                case "url":
                    image = { img: "", mime: file.mime, name: file.name };
                    break;
                default:
                    image = { img: file, mime: file.mime, name: file.name };
            }

            socket.emit('setNewGrupe', {
                name: gropeName,
                image,
                admin: JSON.parse(localStorage.getItem('profile')).result.email,
                users: [],
                massges: []
            });
            handleClose();
        }
    }


    return (
        <div>
            <Button size="small" color="primary" onClick={handleClickOpen}>
                <GroupAddIcon fontSize="small">Add Group</GroupAddIcon>
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

                <Grid container direction="row" justify="space-between" alignItems="center">
                    <DialogTitle id="form-dialog-title">Create new group</DialogTitle>
                    <Button color="secondary" size="small" onClick={handleClose} ><CloseIcon /></Button>
                </Grid>

                <DialogContent>
                    <TextField autoFocus margin="dense" id="name" label="Grup name" onChange={e => changeGropeName(e.target.value)} />
                    <Grid container direction="row" justify="flex-start" alignItems="center">
                        <Grid>
                            <TextField autoFocus margin="dense" id="img" label="Add img URL " onChange={(e) => setFile({ mime: "url", name: e.target.value })} fullWidth />
                        </Grid>
                        <Grid>
                            <input color="primary" accept="image/*" type="file" onChange={(e) => setFile(e.target.files[0])} id="button-file" style={{ display: 'none', }} />
                            <label htmlFor="button-file" >
                                <Button component="span" size="small" color="primary">
                                    <AddPhotoAlternateIcon />
                                </Button>
                            </label>

                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color="primary"> Create group </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}