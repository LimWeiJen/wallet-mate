const request = require('supertest')
const { server } = require('../dist/index.js')
const { expect } = require('chai');

describe('Account API', () => {
  var token;

  it('should post an account', async () => {
    await request(server)
        .post('/users/sign-in')
        .send({ username: 'test', password: 'test' })
        .then(res => {
          token = res.body.token;
        });

    const res = await request(server)
      .post('/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({ account: { name: 'test account', color: 'ffffff', accountType: 'e wallet', startingAmount: 100 } });
    expect(res.statusCode).to.equal(200);
    expect(res.body.success).to.equal(true);
  });

  it('should get accounts', async () => {
    const res = await request(server)
      .get('/accounts')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body.success).to.equal(true);
    expect(Array.isArray(res.body.accounts)).to.equal(true);
  });

  it('should update an account', async () => {
    const res = await request(server)
      .post('/accounts/update')
      .set('Authorization', `Bearer ${token}`)
      .send({ account: { name: 'test account 2', color: 'ffffff', accountType: 'e wallet', startingAmount: 100 }, index: 0 });
    expect(res.statusCode).to.equal(200);
    expect(res.body.success).to.equal(true);

    const res2 = await request(server)
      .get('/accounts')
      .set('Authorization', `Bearer ${token}`);
    expect(res2.statusCode).to.equal(200);
    expect(res2.body.success).to.equal(true);
    expect(res2.body.accounts[0].name).to.equal('test account 2');
  });

  it('should delete an account', async () => {
    const res = await request(server)
      .delete('/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({ accountIndex: 0 });
    expect(res.statusCode).to.equal(200);
    expect(res.body.success).to.equal(true);
  });

  it('should not post an account without a token', async () => {
    const res = await request(server)
      .post('/accounts')
      .send({ account: { name: 'test account', color: 'ffffff', accountType: 'e wallet', startingAmount: 100 } });
    expect(res.status).to.equal(401);
  });

  it('should not get accounts without a token', async () => {
    const res = await request(server)
      .get('/accounts');
    expect(res.status).to.equal(401);
  });

  it('should not delete an account without a token', async () => {
    const res = await request(server)
      .delete('/accounts')
      .send({ accountIndex: 0 });
    expect(res.status).to.equal(401);
  });
});