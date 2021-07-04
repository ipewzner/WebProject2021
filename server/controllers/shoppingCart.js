import asyncHandler from 'express-async-handler'
import Product from '../models/product.js'
import ShoppingCart from '../models/shoppingCart.js';

const getCart = asyncHandler(async (req, res) => {
  try {
    const cart = await ShoppingCart.findOne({user: req.user});
    console.log(cart);
    res.status(200).json(cart);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
})

const getCartProducts = asyncHandler(async (req, res) => {
    try {
        console.log(req.params.user);
      const cart = await ShoppingCart.findOne({user: req.params.user});
      console.log(cart);
      const products = await Product.find({ '_id': { $in: cart.products } });
      res.status(200).json(products);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  })

  const addToCart = asyncHandler(async (req, res) => {
    try {
      console.log(req.params.user);
      const cart = await ShoppingCart.findOne({user: req.params.user});
      console.log(cart);
      const product = await Product.findById(req.params.id);
      console.log(product);

      cart.products.push(product);
      cart.save();
      console.log("pushed maybe.....................");
      res.status(200).json(cart.products);
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: err.message });
    }
  })

const createCart = asyncHandler(async (userId) => {
    const cart = new ShoppingCart({
        user: userId,
        products: []
      })
    
      const createdCart = await cart.save();
      console.log(createdCart);
});

export {
    getCart,
    createCart,
    getCartProducts,
    addToCart
}
