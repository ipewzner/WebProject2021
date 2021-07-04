import { useDispatch } from 'react-redux';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { removeFromCart } from '../../../actions/cart';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const CartItem = ({ item, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);
    const profile = JSON.parse(localStorage.getItem('profile'));
    const user = profile.newUser ? profile.newUser._id : profile.result._id;
  
    const handleRemoveClick = () => {
      // console.log(user + '\n' + item._id);
      removeFromCart(user, item._id);
    };

    return (
      <Card className={classes.root}>
        <CardHeader
          title={item.name}
          subheader={item.brand}
        />
        <CardMedia
          className={classes.media}
          image={item.image}
          title={item.name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
              {item.price} $
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="remove from cart" onClick={handleRemoveClick}>
            <RemoveShoppingCartIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent> 
            <Typography paragraph>
             {item.description}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
}
export default CartItem;
