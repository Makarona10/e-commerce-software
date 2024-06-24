import express from 'express';
import controller from '../controller/delivery_boy.js';
import {auth} from '../middleware/authentication.js'

const router = express.Router();


router.route('/')
        .post(auth, controller.accept_order)
        .get(auth, controller.list_pending_orders)

router.route('/accepted')
        .get(auth, controller.list_worker_orders)

router.route('/:id')
        .patch(auth, controller.change_status)

export default router;