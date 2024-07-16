export const clients_table = `CREATE TABLE IF NOT EXISTS clients (
    client_id BIGINT REFERENCES users(id) PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
    )`;
