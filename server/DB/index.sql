CREATE TABLE IF NOT EXISTS users(
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS clients (
    id BIGINT REFERENCES users(id) PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS merchants (
    id BIGINT REFERENCES users(id) PRIMARY KEY,
    store_name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL
    img VARCHAR(512),
    about TEXT
);

CREATE TABLE IF NOT EXISTS delivery_boys (
    id BIGINT REFERENCES users(id) PRIMARY KEY,
    first_name VARCHAR(32) NOT NULL,
    last_name VARCHAR(32) NOT NULL,
    national_id VARCHAR(64) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
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

CREATE INDEX name_idx ON products (product_name);

CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_id BIGINT REFERENCES products(product_id) NOT NULL,
    client_id BIGINT REFERENCES clients(client_id) NOT NULL,
    comment VARCHAR(255),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 1,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE IF NOT EXISTS orders (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    client_id BIGINT REFERENCES clients(client_id),
    delivery_id BIGINT REFERENCES delivery_boys(delivery_id),
    address VARCHAR(255),
    amount REAL,
    'status' VARCHAR(255) DEFAULT 'pending',
    date_created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deliver_date TIMESTAMPTZ DEFAULT NULL,
    active INT,
    canceled INT
);

CREATE TABLE IF NOT EXISTS cart (
    id SERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES orders(id),
    product_id BIGINT REFERENCES products(id),
    quantity INT,
    date_time DATE DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE IF NOT EXISTS categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    img VARCHAR (512) NOT NULL
);

CREATE TABLE IF NOT EXISTS subcategories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    category INT REFERENCES categories.id
);

CREATE TABLE product_subcategory (
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    subcategory_id INT REFERENCES subcategories(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, subcategory_id)
);