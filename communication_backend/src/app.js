require('dotenv').config({ path: 'config.env' });

async function main() {
    const port = process.env.SERVER_PORT;
    console.log(port);
}

main().then(() => console.log('Our endpoint is running...'), (err) => { console.log(err); })