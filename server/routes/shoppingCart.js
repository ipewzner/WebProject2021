import express from 'express';
import {getCart, getCartProducts, addToCart} from '../controllers/shoppingCart.js'
const router=express.Router();
router.get('/:user',getCart);
router.get('/:user/products',getCartProducts);
router.post('/:user/:id',addToCart);
//router.post('/:user:id',addProduct).delete( removeProduct).patch(updateQuantity);
export default router;