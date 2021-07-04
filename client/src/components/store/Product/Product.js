
import { useDispatch } from 'react-redux';
import { deleteProdect} from '../../../actions/store';
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
      // console.log(user + '\n' + product._id);
      addToCart(user, product._id);
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

// <Card>
//     <ListGroup variant='flush'>
//         <ListGroup.Item>
//             <Row>
//                 <Col>Price:</Col>
//                 <Col>
//                     <strong>${product.price}</strong>
//                 </Col>
//             </Row>
//         </ListGroup.Item>

//         <ListGroup.Item>
//             <Row>
//                 <Col>Status:</Col>
//                 <Col>
//                     {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
//                 </Col>
//             </Row>
//         </ListGroup.Item>

//         {product.countInStock > 0 && (
//             <ListGroup.Item>
//                 <Row>
//                     <Col>Qty</Col>
//                     <Col>
//                         <Form.Control
//                             as='select'
//                             value={qty}
//                             onChange={(e) => setQty(e.target.value)}
//                         >
//                             {[...Array(product.countInStock).keys()].map(
//                                 (x) => (
//                                     <option key={x + 1} value={x + 1}>
//                                         {x + 1}
//                                     </option>
//                                 )
//                             )}
//                         </Form.Control>
//                     </Col>
//                 </Row>
//             </ListGroup.Item>
//         )}

//         <ListGroup.Item>
//             <Button
//                 onClick={addToCartHandler}
//                 className='btn-block'
//                 type='button'
//                 disabled={product.countInStock === 0}
//             >
//                 Add To Cart
//             </Button>
//         </ListGroup.Item>
//     </ListGroup>
// </Card>