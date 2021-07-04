import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Avatar, Toolbar, AppBar, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import memories from '../../images/Cyber3D.JPG';
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionTypes';

export default function Navbar() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        history.push('/auth');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Cyber 3D</Typography>
                <img className={classes.image} src={memories} alt="" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                <Button component={Link} to="/about" variant="contained" color="primary">About</Button>
                {user?.result && (
                    <>
                        <Button component={Link} to="/chat" variant="contained" color="primary">Chat</Button>
                        <Button component={Link} to="/store" variant="contained" color="primary">store</Button>
                        <Button component={Link} to="/blogs" variant="contained" color="primary">Blogs</Button>
                        <Button component={Link} to="/Users" variant="contained" color="primary">Users</Button>
                    </>)}
            </Toolbar>
            {user?.result ? (
                <div className={classes.profile}>

                    <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                  
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
            ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
            )}

        </AppBar>
    );
}
