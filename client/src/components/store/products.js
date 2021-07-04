import React from 'react';
import { Grid, Card,CardContent,CardMedia,Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Product from './Product/Product';

const Products = ({ setCurrentId }) => {
    const products = useSelector((state) => state.products);

        
    return (
        !products.length ? 
        <CardMedia
          image="/images/empty-cart.png"
          title="No Product Here!" >
              No Product Here!
        </CardMedia> 
        : (
            <Grid container spacing={4}>
                {products.map((product) => (
                    <Grid item key={product} xs={12} sm={6} md={4}>
                        <Product product={product} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>

        )
    );
}
export default Products;


// <Grid className={classes.container} container alignItems="stretch" spacing={3}>
// {products.map((product) => (
//     <Grid key={product._id} item xs={12} sm={6}>
//         <Post post={product} setCurrentId={setCurrentId} />
//     </Grid>
// ))}
// </Grid>