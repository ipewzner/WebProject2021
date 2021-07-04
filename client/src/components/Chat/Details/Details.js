import React, { useState, useRef, useEffect } from 'react';
import { Card, Drawer, Grid, CardContent, Container, Hidden, Avatar, Paper, Typography, List, ListItem, ListItemText, Chip, Button, TextField } from '@material-ui/core';
import NewAvatar from '../../NewAvatar/NewAvatar';
import useStyles from './styles';
import { ThumbUpAlt, ThumbDownAlt, Delete, MoreHorizontal } from '@material-ui/icons';

export default function Details(props) {
    const classes = useStyles();

    const info = props.info;
    let user = { name: "kkk", email: "okokkokok", Likes: "5", Dislikes: "6" }
    return (
        <>
            <Typography> Name: {info.name}</Typography>
            <Typography> Email: {info.email}</Typography>
            <Typography> Totel likes and dislikes</Typography>
            <Grid container justify="center">
                <ThumbUpAlt fontSize="small" color="primary" /> {"  " + info.likes}
                <ThumbDownAlt fontSize="small" color="primary" />{"  " + info.dislikes}
            </Grid>
        </>
    )
}