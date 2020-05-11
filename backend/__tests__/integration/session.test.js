const request = require('supertest');

const app = require('../../src/app');
const User = require('../../src/models/User');
const md5 = require('md5');

describe('Authentication', () => {
    beforeEach(async () => {
        await User.collection.drop();
    });
    it('should receive a JWT token, email and name of user when authenticated with valid credentials', async () => {
        const user = await User.create({
            name: 'Ronaldo',
            email: 'ronaldosg1999@outlook.com',
            password: md5('123456')
        });

        const response = await request(app)
            .post('/users/authenticate')
            .send({
                email: user.email,
                password: '123456'
            });

        expect(response.status).toBe(201);   
    });

    it('should not authenticate with invalid credentials', async () => {
        const user = await User.create({
            name: 'Ronaldo',
            email: 'ronaldosg1999@outlook.com',
            password: md5('123456')
        });

        const response = await request(app)
            .post('/users/authenticate')
            .send({
                email: user.email,
                password: '123441241'
            });

        expect(response.status).toBe(404);   
    });

    it('should not authenticate with no credentials', async() => {
        await User.create({
            name: 'Ronaldo',
            email: 'ronaldosg1999@outlook.com',
            password: md5('123456')
        });

        const response = await request(app)
            .post('/users/authenticate')
            .send({});

        expect(response.status).toBe(400);   
    });
});

describe('Refresh-token', () =>{
    beforeEach(async () => {
        await User.collection.drop();
    });

    it('should receive a new token', async () => {
        const user = await User.create({
            name: 'Ronaldo',
            email: 'ronaldosg1999@outlook.com',
            password: md5('123456')
        });

        const response = await request(app)
            .post('/users/authenticate')
            .send({
                email: user.email,
                password: '123456'
            });

        const token = response.body.token;

        const response2 = await request(app)
            .post('/users/refresh-token')
            .set('x-access-token', token)
            .send();

        expect(response2.status).toBe(201);   
    });
})