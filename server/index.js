import express from 'express';
import cust from './routes/customer.routes.js';
import merchant from './routes/merchant.routes.js';
import delivery from './routes/delivery_boy.routes.js';
import auth from './routes/auth.js'
import products from './routes/products.routes.js'
import cors from 'cors'
const app = express();

app.use(cors())
app.use(express.json());
app.use('/api/v1/customer', cust);
app.use('/api/v1/merchant', merchant);
app.use('/api/v1/delivery', delivery);
app.use('/api/v1/auth', auth)
app.use('/api/v1/products', products)

app.listen(3001, () => {
  console.log('listening on 3001');
});
