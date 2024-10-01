export const products_table = `CREATE TABLE IF NOT EXISTS products (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_name VARCHAR(64) NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    offer REAL DEFAULT NULL,
    quantity INTEGER CHECK (quantity >= 0) NOT NULL,
    image VARCHAR(255),
    merchant_id BIGINT REFERENCES merchants(merchant_id),
    sell_times INTEGER DEFAULT 0,
    );

    CREATE INDEX name_idx ON products (product_name);`;
