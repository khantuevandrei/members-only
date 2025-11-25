#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
  DROP TABLE IF EXISTS messages;
  DROP TABLE IF EXISTS users;

  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    membership BOOLEAN DEFAULT FALSE,
    password VARCHAR(255) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );
  `;

async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("tables created successfully");
  } catch (err) {
    console.error("error creating tables", err);
  } finally {
    await client.end();
    console.log("seeding done");
  }
}

main();
