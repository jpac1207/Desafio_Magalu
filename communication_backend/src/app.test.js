const supertest = require('supertest');
const app = require('./app');
const communicationRequestDomain = require('./domain/communicationRequestDomain');

function executeRegisterCommunicationTests() {
    test('Receive Valid Token', async () => {
        const response = await supertest(app).post('/communicationrequest/register').send({
            "deliveryTime": "2022-05-01T23:28:56.782Z",
            "receiverEmail": "email.teste@hotmail.com",
            "message": "No minimo 10 caracteres",
            "deliveryType": communicationRequestDomain.communicationTypes.email
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.communicationRequestCode.length).toEqual(communicationRequestDomain.communicationRequestTokenSize);
    });

    test('Refuse invalid e-mail', async () => {
        const response = await supertest(app).post('/communicationrequest/register').send({
            "deliveryTime": "2022-05-01T23:28:56.782Z",
            "receiverEmail": "invalidEMail",
            "message": "No minimo 10 caracteres",
            "deliveryType": communicationRequestDomain.communicationTypes.email
        });
        expect(response.statusCode).toEqual(500);
        expect(response.body.error).toBeDefined();
    });

    test('Refuse invalid date', async () => {
        const response = await supertest(app).post('/communicationrequest/register').send({
            "deliveryTime": "2022-05-01T24:28:56.782Z",
            "receiverEmail": "email.teste@hotmail.com",
            "message": "No minimo 10 caracteres",
            "deliveryType": communicationRequestDomain.communicationTypes.email
        });
        expect(response.statusCode).toEqual(500);
        expect(response.body.error).toBeDefined();
    });

    test('Refuse invalid message', async () => {
        const response = await supertest(app).post('/communicationrequest/register').send({
            "deliveryTime": "2022-05-01T23:28:56.782Z",
            "receiverEmail": "email.teste@hotmail.com",
            "message": "-",
            "deliveryType": communicationRequestDomain.communicationTypes.email
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

function executeCheckCommunicationTests() {
    test('Check if status of a new communication request is equals to waiting', async () => {
        // Create communication request
        let futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);
        const communicationRequestResponse = await supertest(app).post('/communicationrequest/register').send({
            "deliveryTime": futureDate.toISOString(),
            "receiverEmail": "email.teste@hotmail.com",
            "message": "No minimo 10 caracteres",
            "deliveryType": communicationRequestDomain.communicationTypes.sms
        });
        let confirmationToken = communicationRequestResponse.body.communicationRequestCode;
        // Check Status
        const response = await supertest(app).post('/communicationrequest/check').send({
            "communicationRequestToken": confirmationToken
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.communicationRequest).toBeDefined();
        expect(response.body.communicationRequest.status).toEqual(communicationRequestDomain.communicationStatus.waiting);
    });

    test('Refuse check without token', async () => {       
        // Check Status
        const response = await supertest(app).post('/communicationrequest/check');
        expect(response.statusCode).toEqual(500);
        expect(response.body.error).toBeDefined();       
    });

    test('Refuse check with invalid token', async () => {       
        // Check Status
        const response = await supertest(app).post('/communicationrequest/check').send({
            "communicationRequestToken": 'ablnmkoqnfoqfnoqqfnqfonqoqwxafdwf'
        });
        expect(response.statusCode).toEqual(500);
        expect(response.body.error).toBeDefined();        
    });
}
executeRegisterCommunicationTests();
executeCheckCommunicationTests();