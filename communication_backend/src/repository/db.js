const mysqlx = require('@mysql/xdevapi');

const config = {
    host: process.env.DATABASE_HOST,
    schema: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
};
const client = mysqlx.getClient(config);
module.exports = client.getSession();