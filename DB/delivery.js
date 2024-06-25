export const delivery_table = `CREATE TABLE IF NOT EXISTS delivery_boys (
    delivery_id BIGINT REFERENCES users(id) PRIMARY KEY,
    first_name VARCHAR(32) NOT NULL,
    last_name VARCHAR(32) NOT NULL,
    national_id VARCHAR(64) UNIQUE NOT NULL
    )`