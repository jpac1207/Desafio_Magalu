const config = {
    host: process.env.DATABASE_HOST,
    schema: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
};

module.exports = dbClient;