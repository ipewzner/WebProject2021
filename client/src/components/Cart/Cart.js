import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import CartItems from './CartItems';
import { getCartProducts } from '../../actions/cart';

const Cart = () => {
  const classes = useStyles();

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const profile = JSON.parse(localStorage.getItem('profile'));
  const userId = profile.newUser ? profile.newUser._id : profile.result._id;

  useEffect(() => {
    dispatch(getCartProducts(userId));
  }, [currentId, dispatch]);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <ShoppingCartIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Your Cart
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <CartItems setCurrentId={setCurrentId} />
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Total:
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
686.90 $
        </Typography>
      </footer>
    </React.Fragment>
  )
}

export default Cart;
