'use strict'
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const expect = require('code').expect;

const describe    = lab.describe;
const it          = lab.it;
const after       = lab.after;
const before      = lab.before;

const models              = require('../../models/index');
const server              = require('../../');
const async               = require('async');
const productCategoryRepository = require('../../repository/productCategory')

describe('functional tests - product', () => {
  let id = 0;
  let productCategory = {};

  let initProduct = (callback) => {
    models.Product.destroy({truncate: true}).then((res) => {
      callback(null, res);
    });
  }

  let getProductCategory = (initResult, callback) => {
    productCategoryRepository.create({ name : 'man'}, (productCategory) => {
      callback(null, productCategory.get())
    })
  }

  before((done) => {
    async.waterfall([
      initProduct,
      getProductCategory
    ], (err, result) => {
      productCategory = result;
      done();
    })
  })

  it('should create product', (done) => {
      server.inject({
          method: 'POST',
          url: '/products',
          payload: {
            name: 'Adidas Shoes',
            ProductCategoryId: productCategory.id
          }
      }, (response) => {
          var result = JSON.parse(response.payload);
          expect(response.statusCode).to.equal(200);
          expect(result).to.be.a.object();
          expect(result.name).to.equal('Adidas Shoes')
          id = result.id;
          done();
      });
  });

  it('should get list product', (done) => {
    server.inject({
        method: 'GET',
        url: '/products'
    }, (response) => {
      var result = JSON.parse(response.payload);
      expect(response.statusCode).to.equal(200);
      expect(result).to.be.an.array();
      expect(result.length).to.be.at.least(1);
      done();
    });
  });

  it('should get single product', (done) => {
    server.inject({
        method: 'GET',
        url: '/products/'+ id
    }, (response) => {
      var result = JSON.parse(response.payload);
      expect(response.statusCode).to.equal(200);
      expect(result).to.be.an.object();
      done();
    });
  });

  it('should update product', (done) => {
    server.inject({
        method: 'PUT',
        url: '/products/'+ id,
        payload: {
          name: 'Nike Shoes',
          ProductCategoryId: productCategory.id
        }
    }, (response) => {
      var result = JSON.parse(response.payload);
      expect(response.statusCode).to.equal(200);
      expect(result).to.be.an.object();
      expect(result.name).to.equal('Nike Shoes')
      done();
    });
  });

  it('should delete product', (done) => {
    server.inject({
        method: 'DELETE',
        url: '/products/'+ id
    }, (response) => {
      var result = JSON.parse(response.payload);
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  after((done) => {
      done();
  });
})
