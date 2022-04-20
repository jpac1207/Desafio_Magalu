require('dotenv').config({ path: 'config.env' });

const port = process.env.SERVER_PORT;
const routesRecorder = require('./routes/routesRecorder');
const express = require('express');
const app = express();

app.use(express.json());
routesRecorder(app);

if (port) {
    if (require.main == module) {
        app.listen(port);
        console.log('Our endpoint is running...');
    }
} else {
    throw new Error('Verify the config file!');
}

module.exports = app;