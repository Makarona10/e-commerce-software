import express from 'express';
import cust from './routes/customer.routes.js';
import merchant from './routes/merchant.routes.js';
import delivery from './routes/delivery_boy.routes.js';
import auth from './routes/auth.js'
import products from './routes/products.routes.js'
import categories from './routes/categories.routes.js'
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();

app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsDir));

app.use('/api/v1/customer', cust);
app.use('/api/v1/merchant', merchant);
app.use('/api/v1/delivery', delivery);
app.use('/api/v1/auth', auth)
app.use('/api/v1/products', products)
app.use('/api/v1/categories', categories)

app.listen(3001, () => {
  console.log('listening on 3001');
});
