import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String },
    rating: { type: Number },
    comment: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

const productSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    image: { type: String },
    brand: { type: String },
    category: { type: String },
    description: { type: String },
    reviews: [reviewSchema],
    rating: { type: Number , default: 0 },
    numReviews: { type: Number, default: 0 },
    price: { type: Number, default: 0  },
    countInStock: { type: Number, default: 0 },
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

export default Product
