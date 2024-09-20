require('dotenv').config();

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD
})

connection.addListener('error', (err) => {
    console.log(err);
});

module.exports = connection;