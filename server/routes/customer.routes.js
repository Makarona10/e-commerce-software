import express from 'express';
import controller from '../controller/customer.js';
import { auth } from '../middleware/authentication.js';

const router = express.Router();

router
  .route('/')
  .get(auth, controller.list_orders)
  .post(auth, controller.place_order);

router
  .route('/:order_id')
  .get(auth, controller.get_order_items)
  .delete(auth, controller.cancel_order)

router
  .route('/payment/:order_id')
  .post(auth, controller.confirm_payment)

router
  .route('/:product_id')
  .post(auth, controller.post_review);


export default router;
