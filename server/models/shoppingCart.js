import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cartSchema = new Schema(
    {  
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    products: 
    [{ 
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: {type: Number} 
    }],
    sumTotal: {type: Number, default: 0},
    date: { type: Date, default: Date.now }

});

const ShoppingCart = mongoose.model('ShoppingCart', cartSchema);

export default ShoppingCart;