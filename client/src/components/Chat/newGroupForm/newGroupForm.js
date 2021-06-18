import React, { useState, useEffect } from 'react';
import {Dialog, Button, Grid, TextField,DialogTitle,
     DialogContentText, DialogActions,DialogContent } from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CloseIcon from '@material-ui/icons/Close';

export default function AlertDialog(props) {
    const user = props.user;
    const socket = props.socket;
    const [open, setOpen] = React.useState(false);
    const [groupData, setGroupData] = useState({ name: '', image: '', admin:'', users: [null], massges: [] });

    const handleClickOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };
    const handleSubmit = (e) => {
        e.preventDefault();
        setGroupData({ ...groupData, admin: JSON.parse(localStorage.getItem('profile')).result.email, users: JSON.parse(localStorage.getItem('profile')).result.email});
        console.log("groupData: " + JSON.stringify(groupData));
        if(groupData.name!=""&&groupData.admin!=''){
        socket.emit('setNewGrupe', groupData);
        setGroupData({ name: '', image: '', admin:'', users: [], massges: [] });
        handleClose();}
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
                    <DialogContentText>To create new group please enter details below.</DialogContentText>
                    <TextField autoFocus margin="dense" id="name" label="Grup name" onChange={(e) => setGroupData({ ...groupData, name: e.target.value })} fullWidth />
                    <TextField autoFocus margin="dense" id="img" label="add img" onChange={(e) => setGroupData({ ...groupData, image: e.target.value })} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color="primary"> Create group </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}