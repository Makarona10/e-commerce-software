import express from 'express';
import {
    list_latest,
    list_popular, search_prod, list_for_subcategory, get_product,
    list_trending, list_offers, get_product_reviews, filterd_products
}
    from '../controller/products.js';

const router = express.Router();

router.route('/list-latest')
    .get(list_latest)
router.route('/list-popular')
    .get(list_popular)
router.route('/search-prod/:name')
    .get(search_prod)
router.route('/list-subctg')
    .get(list_for_subcategory)
router.route('/list-trending')
    .get(list_trending)
router.route('/list-offers')
    .get(list_offers)
router.route('/details/:id')
    .get(get_product)
router.route('/reviews/:id')
    .get(get_product_reviews)
router.route('/filter')
    .get(filterd_products)


export default router;