// src/db.js
const postgres = require('postgres');
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set.');
}

const sql = postgres(DATABASE_URL, {
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = sql;