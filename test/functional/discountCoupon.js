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
const moment              = require('moment');
const async               = require('async');

const productRepository = require('../../repository/product');
const productCategoryRepository = require('../../repository/productCategory');

describe('functional tests - discount coupon ', () => {
  let id = 0;
  let productCategory = {};
  let product = {}

  let getProductCategory = (res, callback) => {
    productCategoryRepository.create({ name : 'man'}, (result) => {
      productCategory = result.get();
      callback(null, productCategory);
    })
  }

  let getProduct = (res, callback) => {
    productRepository.create(
      {
        name: 'Adidas Shoes',
        ProductCategoryId: productCategory.id
      },
     (result) => {
      product = result.get();
      callback(null, product);
    })
  }

  let init = (callback) => {
    models.DiscountCoupon.destroy({truncate: true}).then((res) => {
      callback(null, res);
    });
  }

  before((done) => {
    async.waterfall([
      init,
      getProductCategory,
      getProduct
    ], (err, result) => {
      done();
    })
  })

  it('should create discount coupon with type product', (done) => {

      server.inject({
          method: 'POST',
          url: '/discount_coupons',
          payload: {
            name: 'Hari Belanja Online Nasional',
            start: (new Date()),
            end: moment(new Date()).add(6, 'days'),
            typeable: 'product',
            type_id: product.id,
            amount: 100000
          }
      }, (response) => {
          var result = JSON.parse(response.payload);
          expect(response.statusCode).to.equal(200);
          expect(result).to.be.a.object();
          expect(result.name).to.equal('Hari Belanja Online Nasional')
          expect(result.typeable).to.equal('product')
          expect(moment(result.end).format('YYYYY-MM-DD'))
            .to.equal(moment(new Date()).add(6, 'days').format('YYYYY-MM-DD'))
          id = result.id;
          done();
      });
  });

  it('should create discount coupon with type category product', (done) => {

      server.inject({
          method: 'POST',
          url: '/discount_coupons',
          payload: {
            name: 'Hari Kartini',
            start: (new Date()),
            end: moment(new Date()).add(1, 'days'),
            typeable: 'product_category',
            type_id: productCategory.id,
            amount: 50000
          }
      }, (response) => {
          var result = JSON.parse(response.payload);
          expect(response.statusCode).to.equal(200);
          expect(result).to.be.a.object();
          expect(result.name).to.equal('Hari Kartini')
          expect(result.typeable).to.equal('product_category')
          expect(moment(result.end).format('YYYYY-MM-DD'))
            .to.equal(moment(new Date()).add(1, 'days').format('YYYYY-MM-DD'))
          id = result.id;
          done();
      });
  });

  it('should get list discount coupon', (done) => {
    server.inject({
        method: 'GET',
        url: '/discount_coupons'
    }, (response) => {
      var result = JSON.parse(response.payload);
      expect(response.statusCode).to.equal(200);
      expect(result).to.be.an.array();
      expect(result.length).to.be.at.least(2);
      done();
    });
  });

  after((done) => {
      done();
  });
})
