import express from 'express';
import controller from '../controller/merchant.js';
import { auth } from '../middleware/authentication.js';
import { upload } from '../middleware/photos_handler.js';
import { check_product_id, check_publish_body } from '../middleware/product_validation.js';

const router = express.Router();

router
  .route('/')
  .get(auth, controller.get_store_products)
  .post(auth, upload, check_publish_body,controller.publish_product);

router
  .route('/best')
  .get(auth, controller.get_best_sellers);

router
  .route('/:product_id')
  .patch(auth, check_product_id, controller.update_product)
  .delete(auth, check_product_id, controller.delete_product);

router
  .route('/info')
  .put(auth, controller.update_merchant)
  .get(auth, controller.get_store_info);


export default router;

