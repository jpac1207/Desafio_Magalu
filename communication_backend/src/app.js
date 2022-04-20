require('dotenv').config({ path: 'config.env' });

async function main() {
    const port = process.env.SERVER_PORT;
    if (port) {
        const routesRecorder = require('./routes/routesRecorder');
        const express = require('express');        
        const app = express();        

        app.use(express.json());
        routesRecorder(app);
        app.listen(port);
    } else {
        throw new Error('Verify the config file!');
    }
}

main().then(() => console.log('Our endpoint is running...'), (err) => { console.log(err); })