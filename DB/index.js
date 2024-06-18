import pkg from 'pg';
const { Client } = pkg;
import express from 'express';

const app = express()

const connection = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'root',
    database: 'shippingDB'
})



try
{
    await connection.connect();
        console.log('Connected to database successfully !');
}   catch (err) {
        console.error('Error connecting to the database', err);
}

const users_table = `CREATE TABLE IF NOT EXISTS users(
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL
    )`

const merchants_table = `CREATE TABLE IF NOT EXISTS merchants (
    id BIGINT REFERENCES users(id) PRIMARY KEY,
    store_name VARCHAR(255),
    location VARCHAR(255)
    )`


const products_table = `CREATE TABLE IF NOT EXISTS products (
    id BIGINT PRIMARY KEY,
    product_name VARCHAR(255),
    description VARCHAR(255),
    price REAL,
    quantity INTEGER,
    image BYTEA,
    merchant_id BIGINT REFERENCES merchants(id)
    )`


const delivery_table = `CREATE TABLE IF NOT EXISTS delivery_boys (
    worker_id BIGINT REFERENCES users(id) PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    image BYTEA
    )`


const clients_table = `CREATE TABLE IF NOT EXISTS clients (
    client_id BIGINT REFERENCES users(id) PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    )`


const orders_table = `CREATE TABLE IF NOT EXISTS orders (
    order_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    client_id REFERENCES clients(client_id),
    delivery_id REFERENCES delivery_boys(delivery_id),
    content JSONB,
    adress VARCHAR(255),
    amount REAL,
    status VARCHAR(255),
    data_created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    )`


const reviews_table = `CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_id REFERENCES products(id),
    client_id REFERENCES clients(client_id),
    order_id REFERENCES orders(order_id),
    comment VARCHAR(255),
    rating INTEGER CHECK (rating >= 0 AND rating <= 5)
    )`

connection.query(users_table)
connection.query(merchants_table)
connection.query(products_table)

app.listen(3001, () => console.log('listening to 3001'))

export { connection };
