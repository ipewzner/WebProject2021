import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizontalIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { deleteProdect, likeProdect } from '../../../actions/store';

const Product = ({ product, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.cardMedia}
                image={process.env.PUBLIC_URL + product.image}
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                </Typography>
                <Typography>
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    View
                </Button>
                <Button size="small" color="primary">
                    Edit
                </Button>
            </CardActions>
        </Card>);
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