import express from 'express';
import {getCart, getCartProducts, addToCart,removeFromCart} from '../controllers/shoppingCart.js'
const router=express.Router();
router.get('/:user',getCart);
router.get('/:user/products',getCartProducts);
router.post('/:user/:id',addToCart);
router.delete('/:user/:id', removeFromCart);
//router.post('/:user:id',addProduct).delete( removeProduct).patch(updateQuantity);
export default router;