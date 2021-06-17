/*
import React, { useState, useEffect } from 'react';
import {
    Dialog, Button, DialogTitle,
    DialogContentText, DialogActions, DialogContent
} from '@material-ui/core';

export default function InfoPopup(props) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => { setOpen(true); };
    const handleClose = () => {setOpen(false);props.op(null)};
   
    useEffect(() => {setOpen(props.open);},[props.open])
    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Info</DialogTitle>
                <DialogContent>
                    <DialogContentText>{props.msg}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary"> Close </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
*/
import React, { useState, useEffect } from 'react';
import {
    Dialog, Button, DialogTitle,
    DialogContentText, DialogActions, DialogContent
} from '@material-ui/core';

export default function InfoPopup(props) {
    const handleClose = () => props.op(null);

    return (
        <div>
            <Dialog open={props.msg != null} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Info</DialogTitle>
                <DialogContent>
                    <DialogContentText >{props.msg}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary"> Close </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}