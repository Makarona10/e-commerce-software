import express from 'express';
import cust from './routes/customer.routes.js';
import merchant from './routes/merchant.routes.js';
import delivery from './routes/delivery_boy.routes.js';


const app = express();

app.use(express.json())
app.use('api/customer', cust)
app.use('api/merchant', merchant)
app.use('api/delivery', delivery)

app.listen(3001, () => {
    console.log("listening on 3001");
});