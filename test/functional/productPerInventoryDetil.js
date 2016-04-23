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
const receiveProductRepository = require('../../repository/receiveProduct');

describe('functional tests - product per inventory detil', () => {
  let id=0;
  let productCategory = {};
  let product = {};
  let inventory = {};
  let productPerInventory = {};
  let receiveProduct = {}

  let init = (callback) => {
    models.ProductPerInventoryDetil .destroy({truncate: true}).then((res) => {
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

  let getReceiveProduct = (res, callback) => {
    receiveProductRepository.create({
      date: (new Date()),
      ProductPerInventoryId: productPerInventory.id,
      total: 10,
      costOfGoodSold: (800* 1000)
    },
    (result) => {
      receiveProduct = result;
      callback(null, receiveProduct)
    }
    )
  }

  before((done) => {
    async.waterfall([
      init,
      getProductCategory,
      getProduct,
      getInventory,
      getProductPerInventory,
      getReceiveProduct
    ], (err, result) => {
      done();
    })
  })

  it('should get list product per inventory detils', (done) => {
    server.inject({
        method: 'GET',
        url: '/product_per_inventory_detils'
    }, (response) => {
      var result = JSON.parse(response.payload);
      expect(response.statusCode).to.equal(200);
      expect(result).to.be.an.array();
      expect(result.length).to.be.at.least(1);
      expect(result[0].price).to.be.equal((800* 1000));
      expect(result[0].stock).to.be.equal((10));
      done();
    });
  });

  after((done) => {
      done();
  });
})
