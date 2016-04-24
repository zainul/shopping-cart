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
const discountCouponRepository = require('../../repository/discountCoupon');

describe('functional tests - coupon ', () => {
  let id = 0;
  let productCategory = {};
  let product = {};
  let discountCoupon = {};

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

  let getDiscountCoupon = (res, callback) => {
    discountCouponRepository.create(
      {
        name: 'Hari Belanja Online Nasional',
        start: (new Date()),
        end: moment(new Date()).add(6, 'days'),
        typeable: 'product',
        type_id: product.id,
        amount: 100000
      },
     (result) => {
      discountCoupon = result.get();
      callback(null, discountCoupon);
    })
  }

  let init = (callback) => {
    models.Coupon.destroy({truncate: true}).then((res) => {
      callback(null, res);
    });
  }

  before((done) => {
    async.waterfall([
      init,
      getProductCategory,
      getProduct,
      getDiscountCoupon
    ], (err, result) => {
      done();
    })
  })

  it('should create Coupon', (done) => {

      server.inject({
          method: 'POST',
          url: '/coupons',
          payload: {
            totalCreated: 100,
            DiscountCouponId: discountCoupon.id
          }
      }, (response) => {
          var result = JSON.parse(response.payload);
          expect(response.statusCode).to.equal(200);
          expect(result).to.be.an.array();
          expect(result[0].DiscountCouponId).to.equal(discountCoupon.id)
          id = result.id;
          done();
      });
  });

  it('should get list coupon', (done) => {
    server.inject({
        method: 'GET',
        url: '/coupons'
    }, (response) => {
      var result = JSON.parse(response.payload);
      expect(response.statusCode).to.equal(200);
      expect(result).to.be.an.array();
      expect(result.length).to.be.at.least(50);
      done();
    });
  });

  after((done) => {
      done();
  });
})
