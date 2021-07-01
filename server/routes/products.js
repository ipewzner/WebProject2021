import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct
} from '../controllers/product.js'
import auth from '../middleware/auth.js'

router.route('/').get(getProducts).post(createProduct)
router
  .route('/:id')
  .get(getProductById)
  .delete(auth, deleteProduct)
  .put(auth, updateProduct)

export default router
