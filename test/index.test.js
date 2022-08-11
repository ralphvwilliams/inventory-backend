import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../index.js';
import { User } from '../models/User.js';
import {
  addProdObj,
  createUserObj,
  loginObj,
  updateUserObj,
} from '../services/faker.js';
import 'dotenv/config';
chai.use(chaiHttp);
let token;
//POST
describe('post and put requests', () => {
  before(async () => {
    await User.deleteMany({});
  });
  it('creates a user', (done) => {
    chai
      .request(app)
      .post('/api/user/create')
      .send(createUserObj)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  }).timeout(12000);

  it('logs in a user', (done) => {
    chai
      .request(app)
      .post('/api/login')
      .send({
        userEmail: createUserObj.email,
        userPassword: createUserObj.password,
      })
      .end((err, res) => {
        token = res.body.data;

        expect(res.status).to.equal(200);
        done();
      });
  });

  it('updates a user', (done) => {
    chai
      .request(app)
      .put('/api/user/update')
      .set('token', token)
      .send(updateUserObj)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('adds a product to a user', (done) => {
    chai
      .request(app)
      .post('/api/products/add')
      .set('token', token)
      .send(addProdObj)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
});
//GET
describe('Get requests', () => {
  it('sends back all users', (done) => {
    chai
      .request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('gets a single user', (done) => {
    chai
      .request(app)
      .get('/api/user')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('gets all user products', (done) => {
    chai
      .request(app)
      .get('/api/products')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('gets a single product', (done) => {
    chai
      .request(app)
      .get('/api/product/1')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);

        done();
      });
  });
});

//DELETE
describe('delete requests', () => {
  it('deletes a product', (done) => {
    chai
      .request(app)
      .delete('/api/products/1/delete')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('deletes a user', (done) => {
    chai
      .request(app)
      .delete('/api/user/delete')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);

        done();
      });
  });
});
