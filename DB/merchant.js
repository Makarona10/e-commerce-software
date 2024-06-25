export const merchants_table = `CREATE TABLE IF NOT EXISTS merchants (
    merchant_id BIGINT REFERENCES users(id) PRIMARY KEY,
    store_name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL
    )`