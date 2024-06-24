import express from 'express';
import controller from '../controller/merchant.js'
import { auth } from '../middleware/authentication.js'

const router = express.Router();

router.route('/')
        .get(auth ,controller.get_store_products)
        .post(auth, controller.publish_product)

router.route('/:id')
        .patch(auth, controller.update_product)
        .delete(auth, controller.delete_product)

export default router;