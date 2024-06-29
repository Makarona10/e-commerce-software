import express from 'express';
import {list_products} from '../controller/products.js';

const router = express.Router();

router.route('/')
    .get(list_products)

export default router;