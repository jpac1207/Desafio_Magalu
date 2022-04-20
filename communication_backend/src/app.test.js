const supertest = require('supertest');
const app = require('./app');

test('Receive Valid Token', async() => {
    const response = await supertest(app).post('/communicationrequest/register');
    expect(response.statusCode).toEqual(200);
    expect(response.body.code.length).toEqual(36);
});