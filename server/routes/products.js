import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview
} from '../controllers/product.js'
import auth from '../middleware/auth.js'

router.route('/').get(getProducts).post(auth, createProduct)
router.route('/:id/reviews').post(auth, createProductReview)
router
  .route('/:id')
  .get(getProductById)
  .delete(auth, deleteProduct)
  .put(auth, updateProduct)

export default router
