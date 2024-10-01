export const reviews_table = `CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_id BIGINT REFERENCES products(product_id) NOT NULL,
    client_id BIGINT REFERENCES clients(client_id) NOT NULL,
    comment VARCHAR(255),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 1,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
);`;
