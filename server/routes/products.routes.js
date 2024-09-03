import express from 'express';
import {
    list_products, list_latest,
    list_popular, search_prod, list_for_subcategory
}
    from '../controller/products.js';

const router = express.Router();

router.route('/list-latest')
    .get(list_latest)
router.route('/list-popular')
    .get(list_popular)
router.route('/search-prod/:id')
    .get(search_prod)
router.route('/list-subctg')
    .get(list_for_subcategory)


export default router;