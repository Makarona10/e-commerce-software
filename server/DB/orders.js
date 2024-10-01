export const orders_table = `CREATE TABLE IF NOT EXISTS orders (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    client_id BIGINT REFERENCES clients(client_id),
    delivery_id BIGINT REFERENCES delivery_boys(delivery_id),
    adress VARCHAR(255),
    amount REAL,
    status VARCHAR(255) DEFAULT 'pending',
    data_created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deliver_date TIMESTAMPTZ DEFAULT NULL,
    active BOOLEAN
)`;
