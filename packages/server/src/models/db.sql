-- Create a new database called 'inventory_app'
CREATE DATABASE inventory_app;
-- Create a table called 'user'
CREATE TABLE user (
	id SERIAL PRIMARY KEY NOT NULL,
	username VARCHAR(24) UNIQUE NOT NULL,
	email VARCHAR(60) UNIQUE NOT NULL,
	password TEXT NOT NULL,
	country VARCHAR(45) NOT NULL,
	state VARCHAR(45),
	inventory_location VARCHAR(100),
	date_of_birth DATE,
	is_admin BOOLEAN NOT NULL DEFAULT false
);
-- Create a type called 'item_type_enum'
CREATE TYPE item_type_enum AS ENUM ('inventory', 'non-inventory', 'service');
-- Create a table called 'item'
CREATE TABLE item (
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(50) NOT NULL,
	price INTEGER NOT NULL,
	purchase_location VARCHAR(100),
	info VARCHAR(200),
	has_warranty BOOLEAN NOT NULL,
	user_id INTEGER NOT NULL REFERENCES user(id) ON DELETE CASCADE,
	manufacturer VARCHAR(200) NOT NULL,
	item_type item_type_enum NOT NULL
);
-- Create a table called 'comment'
CREATE TABLE comment (
	id SERIAL PRIMARY KEY NOT NULL,
	comment VARCHAR(80) NOT NULL,
	commented_at DATE NOT NULL,
	item_id INTEGER NOT NULL REFERENCES item(id) ON DELETE CASCADE,
	author_id INTEGER NOT NULL REFERENCES user(id) ON DELETE CASCADE
);
-- DROPS
DROP TABLE user;
DROP TABLE item;
DROP TABLE comment;