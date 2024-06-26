import express from 'express';
import controller from '../controller/customer.js';
import { auth } from '../middleware/authentication.js';

const router = express.Router();

router
  .route('/')
  .get(auth, controller.list_orders)
  .post(auth, controller.place_order);

router
  .route('/:id')
  .delete(auth, controller.cancel_order)
  .post(auth, controller.post_review);

export default router;
