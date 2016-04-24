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
const inventoryRepository = require('../../repository/inventory');
const productPerInventoryRepository = require('../../repository/productPerInventory');
const couponRepository = require('../../repository/coupon');
const discountPurchaseRepository = require('../../repository/discountTotalPurchase');
const receiveProductRepository = require('../../repository/receiveProduct');

describe('functional tests - discount total purchase ', () => {
  let id = 0;
  let productCategory = {};
  let product = {};
  let inventory = {};
  let discountCoupon = {};
  let coupon = {};
  let productPerInventory = {};
  let receiveProduct = {};
  let availableProduct = {};
  let sale = {};

  let getProductCategory = (callback) => {
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

  let getInventory = (res, callback) => {
    inventoryRepository.create(
      {
        'name': 'Jakarta Werehouse',
        'address': 'Jakarta No 1',
        'location': 'Jakarata'
      },
      (result) => {
        inventory = result.get();
        callback(null, inventory)
      }
    )
  }

  let getProductPerInventory = (res, callback) => {
    productPerInventoryRepository.create({
      'InventoryId': inventory.id,
      'ProductId': product.id
    },
    (result) => {
      productPerInventory = result.get();
      callback(null, productPerInventory)
    }
    )
  }

  let getCoupon = (res, callback) => {
    couponRepository.create({
      totalCreated: 100,
      DiscountCouponId: discountCoupon.id
    },(result) => {
      coupon = result[0].code;
      callback(null, coupon);
    })
  }

  let setDiscountTotalPurchase = (res, callback) => {
    discountPurchaseRepository.create({
      name: 'Hari Belanja Online Nasional',
      start: (new Date()),
      end: moment(new Date()).add(6, 'days'),
      typeable: 'product',
      type_id: product.id,
      discount_value: 100000,
      type_discount: 'nominal',
      min_purchase: 500000
    }, (result) => {
      callback(null, result);
    })
  }

  let setReceiveProduct = (res, callback) => {
    receiveProductRepository.create({
      date: (new Date()),
      ProductPerInventoryId: productPerInventory.id,
      total: 10,
      costOfGoodSold: (800* 1000)
    }, (result) => {
      callback(null, result);
    })
  }

  before((done) => {
    async.waterfall([
      getProductCategory,
      getProduct,
      getInventory,
      getProductPerInventory,
      getDiscountCoupon,
      getCoupon,
      setDiscountTotalPurchase,
      setReceiveProduct
    ], (err, result) => {
      done();
    })
  });

  it('should get list available product', (done) => {
    server.inject({
        method: 'GET',
        url: '/product_per_inventory_detils'
    }, (response) => {
      var result = JSON.parse(response.payload);
      availableProduct = result;
      expect(response.statusCode).to.equal(200);
      expect(result).to.be.an.array();
      expect(result.length).to.be.at.least(2);
      done();
    });
  })

  it('should create sale with sale item', (done) => {
      server.inject({
          method: 'POST',
          url: '/sales',
          payload: {
            "sale_items": [
              {
                "total_item": 3,
                "ProductPerInventoryDetilId": availableProduct[0].id
              },
              {
                "total_item": 3,
                "ProductPerInventoryDetilId": availableProduct[1].id
              }
            ]
          }
      }, (response) => {
          var result = JSON.parse(response.payload);
          id = result.id
          done();
      });
  });

  it('should create sale with sale item', (done) => {
      server.inject({
          method: 'POST',
          url: '/sales',
          payload: {
            "sale_items": [
              {
                "total_item": 3,
                "ProductPerInventoryDetilId": availableProduct[0].id
              },
              {
                "total_item": 3,
                "ProductPerInventoryDetilId": availableProduct[1].id
              }
            ]
          }
      }, (response) => {
          var result = JSON.parse(response.payload);
          sale = result;
          id = result.id
          expect(response.statusCode).to.equal(200);
          expect(result).to.be.an.object();
          expect(result.saleItem).to.be.an.array();
          expect(result.saleItem.length).to.be.an.least(2);
          done();
      });
  });

  it('should update sale item', (done) => {
      server.inject({
          method: 'PUT',
          url: '/sale_items/' + sale.saleItem[0].id,
          payload: {
            "total_item": 10
          }
      }, (response) => {
          var result = JSON.parse(response.payload);
          expect(response.statusCode).to.equal(200);
          expect(result).to.be.an.object();
          expect(result.SaleId).to.be.equal(sale.sale.id);
          done();
      });
  });

  it('should delete sale item', (done) => {
      server.inject({
          method: 'DELETE',
          url: '/sale_items/' + sale.saleItem[0].id,
          payload: {
          }
      }, (response) => {
          var result = JSON.parse(response.payload);
          expect(response.statusCode).to.equal(200);
          expect(result).to.be.an.number();
          done();
      });
  });

  it('should add new sale item', (done) => {
      server.inject({
          method: 'POST',
          url: '/sale_items',
          payload: {
            SaleId: sale.saleItem[0].id,
            total_item: 4,
            ProductPerInventoryDetilId: availableProduct[2].id
          }
      }, (response) => {
          var result = JSON.parse(response.payload);
          expect(response.statusCode).to.equal(200);
          expect(result).to.be.an.object();
          done();
      });
  });

  it('should get sales', (done) => {
    server.inject({
        method: 'GET',
        url: '/sales/' + sale.sale.id
    }, (response) => {
      var result = JSON.parse(response.payload);
      expect(response.statusCode).to.equal(200);
      expect(result).to.be.an.object();
      expect(result.SaleItems.length).to.be.equal(1);
      done();
    });
  })

  it('should get checkout information', (done) => {
    server.inject({
        method: 'GET',
        url: '/sales/' + sale.sale.id + '/pre_checkout/' + coupon
    }, (response) => {
      var result = JSON.parse(response.payload);
      expect(response.statusCode).to.equal(200);
      expect(result).to.be.an.object();
      expect(result.coupon).to.be.an.object();
      expect(result.coupon.code).to.be.string().equal(coupon);
      expect(result.sale[0].SaleItems.length).to.be.equal(1);
      expect(result.discount_total_purchase).to.be.an.object();
      expect(result.total_purchase).to.be.number()
        .least(result.discount_total_purchase.min_purchase)
      done();
    });
  })

  after((done) => {
      done();
  });
})
