CREATE TABLE IF NOT EXISTS cart (
    id SERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES orders(id),
    product_id BIGINT REFERENCES products(id),
    quantity INT,
    date_time DATE DEFAULT CURRENT_TIMESTAMP,
);