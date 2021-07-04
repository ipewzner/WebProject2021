import mongoose from 'mongoose'


const productSchema = mongoose.Schema(
  {
    name: { type: String },
    image: { type: String },
    brand: { type: String },
    category: { type: String },
    description: { type: String },
    rating: { type: Number , default: 0 },
    price: { type: Number, default: 0  },
    countInStock: { type: Number, default: 0 },
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

export default Product
