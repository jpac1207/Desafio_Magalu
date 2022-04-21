const supertest = require('supertest');
const app = require('./app');

function executeRegisterCommunicationTests() {
    test('Receive Valid Token', async () => {
        const response = await supertest(app).post('/communicationrequest/register').send({
            "deliveryTime": "2022-05-01T23:28:56.782Z",
            "receiverEmail": "email.teste@hotmail.com",
            "message": "No minimo 10 caracteres",
            "deliveryType": 1
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.communicationRequestCode.length).toEqual(36);
    });

    test('Refuse invalid e-mail', async () => {
        const response = await supertest(app).post('/communicationrequest/register').send({
            "deliveryTime": "2022-05-01T23:28:56.782Z",
            "receiverEmail": "invalidEMail",
            "message": "No minimo 10 caracteres",
            "deliveryType": 1
        });
        expect(response.statusCode).toEqual(500);
        expect(response.body.error).toBeDefined();
    });

    test('Refuse invalid date', async () => {
        const response = await supertest(app).post('/communicationrequest/register').send({
            "deliveryTime": "2022-05-01T24:28:56.782Z",
            "receiverEmail": "email.teste@hotmail.com",
            "message": "No minimo 10 caracteres",
            "deliveryType": 1
        });
        expect(response.statusCode).toEqual(500);
        expect(response.body.error).toBeDefined();
    });

    test('Refuse invalid message', async () => {
        const response = await supertest(app).post('/communicationrequest/register').send({
            "deliveryTime": "2022-05-01T23:28:56.782Z",
            "receiverEmail": "email.teste@hotmail.com",
            "message": "-",
            "deliveryType": 1
        });
        expect(response.statusCode).toEqual(500);
        expect(response.body.error).toBeDefined();
    });

    
    test('Refuse invalid delivery type', async () => {
        const response = await supertest(app).post('/communicationrequest/register').send({
            "deliveryTime": "2022-05-01T23:28:56.782Z",
            "receiverEmail": "email.teste@hotmail.com",
            "message": "No minimo 10 caracteres",
            "deliveryType": 10
        });
        expect(response.statusCode).toEqual(500);
        expect(response.body.error).toBeDefined();
    });
}

executeRegisterCommunicationTests();