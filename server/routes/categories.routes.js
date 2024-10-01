import express from 'express';
import { list_subcategory } from '../controller/categories.js';
import { auth } from '../middleware/authentication.js';


const router = express.Router();

router
  .route('/subcategories')
  .get(auth, list_subcategory);


export default router;