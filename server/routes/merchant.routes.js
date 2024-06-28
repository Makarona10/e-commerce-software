import express from 'express';
import controller from '../controller/merchant.js';
import { auth } from '../middleware/authentication.js';
import { upload } from '../middleware/photos_handler.js';

const router = express.Router();

router
  .route('/')
  .get(auth, controller.get_store_products)
  .post(auth, upload,controller.publish_product);

router
  .route('/:product_id')
  .patch(auth,controller.update_product)
  .delete(auth, controller.delete_product);

export default router;
