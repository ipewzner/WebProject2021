import React from 'react';
import { Grid, Card,CardContent,CardMedia,Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import CartItem from './CartItem.js/CartItem';

const CartItems = ({ setCurrentId }) => {
    const items = useSelector((state) => state.products);

        
    console.log(items);
    return (
        !items.length ? 
        <CardMedia
          image="/images/empty-cart.png"
          title="No Product Here!" >
              No Product Here!
        </CardMedia> 
        : (
            <Grid container spacing={4}>
                {items.map((item) => (
                    <Grid item key={item} xs={12} sm={6} md={4}>
                        <CartItem item={item} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>

        )
    );
}
export default CartItems;

