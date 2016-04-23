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

const productRepository = require('../../repository/product');
const inventoryRepository = require('../../repository/inventory');
const productCategoryRepository = require('../../repository/productCategory');
const productPerInventoryRepository = require('../../repository/productPerInventory');

describe('functional tests - receive product', () => {
  let id=0;
  let productCategory = {};
  let product = {};
  let inventory = {};
  let productPerInventory = {};

  let initReceiveProduct = (callback) => {
    models.ReceiveProduct.destroy({truncate: true}).then((res) => {
      callback(null, res);
    });
  }

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

  before((done) => {
    async.waterfall([
      initReceiveProduct,
      getProductCategory,
      getProduct,
      getInventory,
      getProductPerInventory
    ], (err, result) => {
      done();
    })
  })

  it('should create receive product', (done) => {
    server.inject({
        method: 'POST',
        url: '/receive_products',
        payload: {
          date: (new Date()),
          ProductPerInventoryId: productPerInventory.id,
          total: 10,
          costOfGoodSold: (800* 1000)
        }
    }, (response) => {
        var result = JSON.parse(response.payload);
        expect(response.statusCode).to.equal(200);
        expect(result).to.be.a.object();
        expect(result.ProductPerInventoryId).to.equal(productPerInventory.id)
        id = result.id;
        done();
    });
  });

  it('should get list receive product', (done) => {
    server.inject({
        method: 'GET',
        url: '/receive_products'
    }, (response) => {
      var result = JSON.parse(response.payload);
      expect(response.statusCode).to.equal(200);
      expect(result).to.be.an.array();
      expect(result.length).to.be.at.least(1);
      done();
    });
  });

  it('should get single receive product', (done) => {
    server.inject({
        method: 'GET',
        url: '/receive_products/'+ id
    }, (response) => {
      var result = JSON.parse(response.payload);
      expect(response.statusCode).to.equal(200);
      expect(result).to.be.an.object();
      done();
    });
  });

  it('should delete receive product', (done) => {
    server.inject({
        method: 'DELETE',
        url: '/receive_products/'+ id
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
