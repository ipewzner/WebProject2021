
import { useDispatch } from 'react-redux';
import { deleteProduct} from '../../../actions/product';
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
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { addToCart } from '../../../actions/cart';

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

const Product = ({ product, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);
    
    const profile = JSON.parse(localStorage.getItem('profile'));
    const user = profile.newUser ? profile.newUser._id : profile.result._id;

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  
    const handleAddClick = () => {
      addToCart(user, product._id);
    };
    const handleRemoveClick = () => {
      console.log("in removee handler");
      deleteProduct(product._id);
    };

    return (
      <Card className={classes.root}>
        <CardHeader
          title={product.name}
          subheader={product.brand}
        />
        <CardMedia
          className={classes.media}
          image={product.image}
          title={product.name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
              {product.price} $
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to shopping cart" onClick={handleAddClick}>
            <AddShoppingCartIcon />
          </IconButton>
          <IconButton aria-label="remove from store" onClick={handleRemoveClick}>
            <DeleteForeverIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent> 
            <Typography paragraph>
             {product.description}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
}
export default Product;
