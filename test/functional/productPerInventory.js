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

describe('functional tests - product per inventory', () => {
  let id=0;
  let productCategory = {};
  let product = {}
  let inventory = {}

  let initProductPerInventory = (callback) => {
    models.ProductPerInventory.destroy({truncate: true}).then((res) => {
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

  before((done) => {
    async.waterfall([
      initProductPerInventory,
      getProductCategory,
      getProduct,
      getInventory
    ], (err, result) => {
      done();
    })
  })

  it('should create product', (done) => {
      server.inject({
          method: 'POST',
          url: '/product_per_inventories',
          payload: {
            InventoryId: inventory.id,
            ProductId: product.id
          }
      }, (response) => {
          var result = JSON.parse(response.payload);
          expect(response.statusCode).to.equal(200);
          expect(result).to.be.a.object();
          expect(result.ProductId).to.equal(product.id)
          id = result.id;
          done();
      });
  });

  it('should get list product per inventory', (done) => {
    server.inject({
        method: 'GET',
        url: '/product_per_inventories'
    }, (response) => {
      var result = JSON.parse(response.payload);
      expect(response.statusCode).to.equal(200);
      expect(result).to.be.an.array();
      expect(result.length).to.be.at.least(1);
      done();
    });
  });

  it('should get single product per inventory', (done) => {
    server.inject({
        method: 'GET',
        url: '/product_per_inventories/'+ id
    }, (response) => {
      var result = JSON.parse(response.payload);
      expect(response.statusCode).to.equal(200);
      expect(result).to.be.an.object();
      done();
    });
  });

  it('should update product per inventory', (done) => {
    server.inject({
        method: 'PUT',
        url: '/product_per_inventories/'+ id,
        payload: {
          InventoryId: inventory.id,
          ProductId: product.id
        }
    }, (response) => {
      var result = JSON.parse(response.payload);
      expect(response.statusCode).to.equal(200);
      expect(result).to.be.an.object();
      expect(result.ProductId).to.equal(product.id)
      done();
    });
  });

  it('should delete product per inventory', (done) => {
    server.inject({
        method: 'DELETE',
        url: '/product_per_inventories/'+ id
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
