const request = require('supertest')
const { server } = require('../dist/index.js')
const { expect } = require('chai');

describe('Transaction API', () => {
  var token;

  it('should post a transaction', async () => {
    await request(server)
        .post('/users/sign-in')
        .send({ username: 'test', password: 'test' })
        .then(res => {
          token = res.body.token;
        });

    const res = await request(server)
      .post('/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({ transaction: { amount: 100, type: 'income', description: 'this is a test', accountId: '', category: 'hello' } });
    expect(res.statusCode).to.equal(200);
    expect(res.body.success).to.equal(true);
  });

  it('should get transactions', async () => {
    const res = await request(server)
      .get('/transactions')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body.success).to.equal(true);
    expect(Array.isArray(res.body.transactions)).to.equal(true);
  });

  it('should delete a transaction', async () => {
    const res = await request(server)
      .delete('/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({ transactionIndex: 0 });
    expect(res.statusCode).to.equal(200);
    expect(res.body.success).to.equal(true);
  });

  it('should not post a transaction without a token', async () => {
    const res = await request(server)
      .post('/transactions')
      .send({ transaction: { amount: 100, type: 'credit' } });
    expect(res.status).to.equal(401);
  });

  it('should not get transactions without a token', async () => {
    const res = await request(server)
      .get('/transactions');
    expect(res.status).to.equal(401);
  });

  it('should not delete a transaction without a token', async () => {
    const res = await request(server)
      .delete('/transactions')
      .send({ transactionIndex: 0 });
    expect(res.status).to.equal(401);
  });
});