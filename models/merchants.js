import { connection } from '../DB/index.js';
import express from 'express';

const app = express();

const merchants_table = `CREATE TABLE IF NOT EXISTS merchants (
    id BIGINT REFERENCES users(id),
    store_name VARCHAR(255),
    location VARCHAR(255)
    )`;

connection.query(merchants_table);

app.listen(3001, () => console.log('listening to 3001'));
