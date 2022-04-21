const mariadb = require('mariadb');
const client = function () { };
const pool = mariadb.createPool({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    connectionLimit: process.env.DATABASE_CONNECTION_LIMIT
});

client.getConnection = async function () {
    return pool.getConnection();
}
module.exports = client;