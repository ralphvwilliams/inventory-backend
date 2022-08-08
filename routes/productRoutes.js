import { Router } from 'express';
import {
  getProduct,
  addProduct,
  deleteProduct,
  getAllUserProducts,
} from '../controllers/products.js';
import { createProductId } from '../middleware/product.js';
import { checkForUser, getToken } from '../middleware/user.js';
import { addProductsValidation } from '../middleware/validation.js';

const router = Router();
router.use(getToken);

router.post(
  '/products/add',
  addProductsValidation,
  createProductId,
  addProduct
);
router.delete('/products/:productId/delete', deleteProduct);
router.get('/products', getAllUserProducts);
router.get('/product/:productId', getProduct);

export default router;
