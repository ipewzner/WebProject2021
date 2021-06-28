import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Avatar, Toolbar, AppBar, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import memories from '../../images/Cyber3D.JPG';
import * as actionType from '../../constants/actionTypes';
import { logout1 } from '../../actions/auth';

export default function Navbar() {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const logout = () => {

        dispatch({ type: actionType.LOGOUT });
        console.log("navBar->logout ");
        dispatch(logout1());
        history.push('/auth');
        setUser(null);
    }
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Cyber 3D</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                <Button component={Link} to="/chat" variant="contained" color="primary">Chat</Button>
                <Button component={Link} to="/about" variant="contained" color="primary">About</Button>
                <Button component={Link} to="/store" variant="contained" color="primary">store</Button>
                <Button component={Link} to="/blogs" variant="contained" color="primary">Blogs</Button>

                {user? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.name} src={user?.imageUrl}>{user?.name?.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}
