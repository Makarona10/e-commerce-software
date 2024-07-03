import express from 'express';
import cust from './routes/customer.routes.js';
import merchant from './routes/merchant.routes.js';
import delivery from './routes/delivery_boy.routes.js';
import auth from './routes/auth.js'
import products from './routes/products.routes.js'
import cors from 'cors';


const app = express();

app.use(express.json());
app.use(cors());


app.use('/api/customer', cust);
app.use('/api/merchant', merchant);
app.use('/api/delivery', delivery);
app.use('/api/auth', auth)
app.use('/api/products', products)

app.listen(3001, () => {
  console.log('listening on 3001');
});
