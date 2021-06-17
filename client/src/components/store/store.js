import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux';
import Prodect from './prodect/prodect';
import useStyles from './styles';

const Store= ({setCurrentId})=>{

    const Store = useSelector((state) => state.Store);
    const classes = useStyles();

    console.log(Store);
    return (
     /*   !Store.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {Store.map((Prodect) => (
                    <Grid key={Prodect._id} item xs={12} sm={6}>
                        <Prodect post={Prodect} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>*/
            <h1>i am in store</h1>
        )
 //   );
}

export default Store;
