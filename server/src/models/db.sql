-- Create a new database called 'inventory_app'
CREATE DATABASE inventory_app;
CREATE TABLE users (
 id SERIAL PRIMARY KEY NOT NULL,
 username VARCHAR(24) UNIQUE NOT NULL,
 email VARCHAR(60) UNIQUE NOT NULL,
 password TEXT NOT NULL,
 country VARCHAR(45) NOT NULL,
 state VARCHAR(45),
 inventory_location VARCHAR(100),
 date_of_birth DATE,
 is_admin BOOLEAN NOT NULL
);
CREATE TABLE manufacturers (
 id SERIAL PRIMARY KEY NOT NULL,
 brand_name VARCHAR(50) NOT NULL,
 brand_type VARCHAR(50) NOT NULL
);
CREATE TABLE item_types (
 id SERIAL PRIMARY KEY NOT NULL,
 item_type_name VARCHAR(50) NOT NULL
);
CREATE TABLE items (
 id SERIAL PRIMARY KEY NOT NULL,
 name VARCHAR(50) NOT NULL,
 price INTEGER NOT NULL,
 purchase_location VARCHAR(100),
 info VARCHAR(200),
 has_warranty BOOLEAN NOT NULL,
 user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 manufacturer_id INTEGER NOT NULL REFERENCES manufacturers(id),
 item_type_id INTEGER NOT NULL REFERENCES item_types(id)
);
CREATE TABLE comments (
 id SERIAL PRIMARY KEY NOT NULL,
 comment VARCHAR(80) NOT NULL,
 date_of_birth DATE NOT NULL,
 item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
 author_id INTEGER NOT NULL REFERENCES users(id)
);