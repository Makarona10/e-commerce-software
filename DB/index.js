import pkg from 'pg';
const { Client } = pkg;
import express from 'express';
import { clients_table } from './clients.js';
import { orders_table } from './orders.js';
import { products_table } from './products.js';
import { users_table } from './users.js';
import { reviews_table } from './reviews.js';
import { merchants_table } from './merchant.js';
import { delivery_table } from './delivery.js';


const app = express()

const connection = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'root',
    database: 'shippingDB'
});



try
{
    await connection.connect();
        console.log('Connected to database successfully !');
}   catch (err) {
        console.error('Error connecting to the database', err);
}


try {
    await connection.query(users_table);
    await connection.query(clients_table);
    await connection.query(delivery_table);
    await connection.query(merchants_table);
    await connection.query(products_table);
    await connection.query(orders_table);
    await connection.query(reviews_table);
} catch (err) {
    console.log('error creating a table:\n', err);
}


app.listen(3001, () => console.log('listening to 3001'))

export { connection };
