-- Create a new database called 'inventory_app'
CREATE DATABASE inventory_app;
-- Create a table called 'users'
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
-- Create a table called 'manufacturers'
CREATE TABLE manufacturers (
 id SERIAL PRIMARY KEY NOT NULL,
 brand_name VARCHAR(50) NOT NULL,
 brand_type VARCHAR(50) NOT NULL
);
-- Create a type called 'item_type_enum'
CREATE TYPE item_type_enum AS ENUM ('inventory', 'non-inventory', 'service');
-- Create a table called 'items'
CREATE TABLE items (
 id SERIAL PRIMARY KEY NOT NULL,
 name VARCHAR(50) NOT NULL,
 price INTEGER NOT NULL,
 purchase_location VARCHAR(100),
 info VARCHAR(200),
 has_warranty BOOLEAN NOT NULL,
 user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 manufacturer_id INTEGER NOT NULL REFERENCES manufacturers(id),
 item_type_id item_type_enum NOT NULL
);
-- Create a table called 'comments'
CREATE TABLE comments (
 id SERIAL PRIMARY KEY NOT NULL,
 comment VARCHAR(80) NOT NULL,
 date_of_birth DATE NOT NULL,
 item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
 author_id INTEGER NOT NULL REFERENCES users(id)
);
-- DROPS
DROP TABLE users;
DROP TABLE manufacturers;
DROP TABLE items;
DROP TABLE comments;