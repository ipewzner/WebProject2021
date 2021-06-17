import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizontalIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { deleteProdect, likeProdect } from '../../../actions/store';

const Prodect = ({ Prodect, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={Prodect.selectedFile} title={Prodect.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{Prodect.creator}</Typography>
                <Typography variant="body2">{moment(Prodect.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(Prodect._id)}>
                    <MoreHorizontalIcon fontSize="default" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{Prodect.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{Prodect.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" components="p">{Prodect.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => dispatch(likeProdect(Prodect._id))}>
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp; Like &nbsp;
                    {Prodect.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => dispatch(deleteProdect(Prodect._id))}>
                    <DeleteIcon fontSize="small" />
                         Delete
                    </Button>
            </CardActions>
        </Card>);
}
export default Prodect;