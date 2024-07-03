import express from 'express';
import cust from './routes/customer.routes.js';
import merchant from './routes/merchant.routes.js';
import delivery from './routes/delivery_boy.routes.js';
import auth from './routes/auth.js'
import products from './routes/products.routes.js'
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();

app.use(express.json());
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

console.log(path.join(__dirname, 'uploads'))

app.use('/api/customer', cust);
app.use('/api/merchant', merchant);
app.use('/api/delivery', delivery);
app.use('/api/auth', auth)
app.use('/api/products', products)

app.listen(3001, () => {
  console.log('listening on 3001');
});
