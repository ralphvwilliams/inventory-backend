import chai, { expect } from 'chai';
// import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../index.js';
import { addProdObj, createUserObj, loginObj } from '../services/faker.js';

chai.use(chaiHttp);

//GET
describe('Get requests', () => {
  it('sends back all users', (done) => {
    chai
      .request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(err);
      });
  });

  it('gets a single user', (done) => {
    chai
      .request(app)
      .get('/api/user')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(req).to.have.header('token');
        done(err);
      });
  });

  it('gets all user products', (done) => {
    chai
      .request(app)
      .get('/api/products')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(req).to.have.header('token');
        done(err);
      });
  });

  it('gets a single product', (done) => {
    chai
      .request(app)
      .get('/api/product/:productId')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(req).to.have.header('token');
        expect(req).to.have.param('productId');

        done(err);
      });
  });
});

//POST
describe('post and put requests', () => {
  it('creates a user', (done) => {
    chai
      .request(app)
      .post('/api/user/create')
      .send(createUserObj)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done(err);
      });
  });

  it('updates a user', (done) => {
    chai
      .request(app)
      .put('/api/user/update')
      .send(createUserObj)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(req).to.have.header('token');
        done(err);
      });
  });

  it('logs in a user', (done) => {
    chai
      .request(app)
      .post('/login')
      .send(loginObj)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(err);
      });
  });

  it('adds a product to a user', (done) => {
    chai
      .request(app)
      .post('/api/products/add')
      .send(addProdObj)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(req).to.have.header('token');
        done(err);
      });
  });
});

//DELETE
describe('delete requests', () => {
  it('deletes a product', (done) => {
    chai
      .request(app)
      .delete('/api/products/:productsId/delete')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(req).to.have.header('token');
        expect(req).to.have.param('productId');

        done(err);
      });
  });

  it('deletes a user', (done) => {
    chai
      .request(app)
      .delete('/api/user/delete')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(req).to.have.header('token');

        done(err);
      });
  });
});
