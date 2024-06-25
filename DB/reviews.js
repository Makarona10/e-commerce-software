export const reviews_table = `CREATE TABLE IF NOT EXISTS reviews (
    review_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_id BIGINT REFERENCES products(product_id) NOT NULL,
    client_id BIGINT REFERENCES clients(client_id) NOT NULL,
    order_id BIGINT REFERENCES orders(order_id) NOT NULL,
    comment VARCHAR(255),
    rating INTEGER CHECK (rating >= 0 AND rating <= 5)
    )`
