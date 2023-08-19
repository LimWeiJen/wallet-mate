const request = require('supertest')
const { server } = require('../dist/index.js')
const { expect } = require('chai');

describe('User API', () => {

  it('should sign up a new user', async () => {
    const response = await request(server)
    .post('/users/sign-up')
    .send({ username: 'testuser', name: 'Test User', password: 'password' });

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.token).to.exist;
  });

  it('should return 409 if username already exists', async () => {
    const response = await request(server)
    .post('/users/sign-up')
    .send({ username: 'testuser', name: 'Test User', password: 'password' });

    expect(response.status).to.equal(409);
  });

  it('should sign in a user', async () => {
    const response = await request(server)
    .post('/users/sign-in')
    .send({ username: 'testuser', password: 'password' });

    expect(response.body.success).to.equal(true);
    expect(response.body.token).to.exist;
  });

  it('should return 404 if user does not exist', async () => {
    const response = await request(server)
    .post('/users/sign-in')
    .send({ username: 'nonexistentuser', password: 'password' });

    expect(response.status).to.equal(404);
  });

  it('should return 401 if password is incorrect', async () => {
    const response = await request(server)
    .post('/users/sign-in')
    .send({ username: 'testuser', password: 'wrongpassword' });

    expect(response.status).to.equal(401);
  });

  it('should delete a user', async () => {
    const response = await request(server)
    .delete('/users')
    .send({ username: 'testuser', password: 'password' });

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
  });
});