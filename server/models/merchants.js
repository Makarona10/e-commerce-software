import { connection } from '../DB/index.js';

const merchants_table = `CREATE TABLE IF NOT EXISTS merchants (
    id BIGINT REFERENCES users(id),
    store_name VARCHAR(255),
    location VARCHAR(255)
    )`;

connection.query(merchants_table);
