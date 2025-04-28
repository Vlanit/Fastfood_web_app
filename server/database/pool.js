const pool = require('pg').Pool;
require('dotenv').config();

const client_pool = new pool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    user: process.env.DB_ADMINNAME,
    password: process.env.DB_ADMINPASSWORD
});

module.exports = client_pool;