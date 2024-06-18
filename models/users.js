import { connection } from "../DB";

const users_table = `CREATE TABLE IF NOT EXISTS users
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL`

connection.query(users_table)
