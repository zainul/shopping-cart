'use strict'
const receiveProduct = {};
const models              = require('../models/index');
const query               = require('../helper/query');
const async               = require('async');

receiveProduct.create = (options, callbackCreate) => {
  let saveReceiveProduct = (callback) => {
    models.ReceiveProduct.create(options).then((receiveProduct) => {
      callback(null, receiveProduct.get());
    })
  }

  let addToProductInventoryDetil = (result, callback) => {
    var options = {};
    options.stock = result.total;
    options.price = result.costOfGoodSold || 0;
    options.ReceiveProductId = result.id;

    models.ProductPerInventoryDetil.create(options).then((res) => {
      callback(null, result);
    });
  }

  async.waterfall([
    saveReceiveProduct,
    addToProductInventoryDetil
  ], (err, result) => {
    callbackCreate(result)
  })
}

receiveProduct.all = (options, callback) => {
  var relationship = query.filter(options, models.ReceiveProduct);
  relationship.all = true,
  // relationship.nested = true;

  models.ReceiveProduct.findAll(
    {
      include: [
        relationship
      ]
    }
  )
  .then((receiveProduct) => {
    callback(receiveProduct);
  })
  .catch(function (error) {
    callback({ error })
  });
}

receiveProduct.show = (id, callback) => {
  models.ReceiveProduct.findOne({ where: id }).then((receiveProduct)=> {
    callback(receiveProduct);
  })
  .catch(function (error) {
    callback({ error })
  });
}

receiveProduct.update = (id, options, callback) =>  {
  models.ReceiveProduct.find({
    where: { id }
  }).then((receiveProduct) => {
    receiveProduct.updateAttributes(options).then((receiveProduct)=>{
      callback(receiveProduct);
    })
  })
  .catch(function (error) {
    callback({ error })
  });
}

receiveProduct.delete = (id, callback) => {
  models.ReceiveProduct.destroy({
    where:{ id }
  }).then((receiveProduct) => {
    callback(receiveProduct);
  })
  .catch(function (error) {
    callback({ error })
  });
}

module.exports = receiveProduct;
