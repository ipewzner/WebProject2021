import React, { useState ,useEffect} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';

import useStyles from './styles';
import FileBase from 'react-file-base64';
import { createPost,updatePost } from '../../actions/store';

const addProdectForm = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ name: '', price: '', info: '', tags: '', selectedFile: '' });
   const post=useSelector((state)=> currentId? state.prodect.find((p)=>p._id==currentId):null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(prodect) setPostData(prodect);
    },[prodect])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updateProdect(currentId,postData));
        } else {
            dispatch(createProdect(postData));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ name: '', price: '', info: '', tags: '', selectedFile: '' });
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId?'Editing':'Creating'} a Memory</Typography>
                <TextField name="name" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
                <TextField name="price" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="info" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                <Button className={classes.buttonSubmit} variant="container" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}
export default addProdectForm;