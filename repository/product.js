'use strict'
const product     = {};
const models              = require('../models/index');
const query               = require('../helper/query');

product.create = (options, callback) => {
  models.Product.create(options).then((product) => {
    callback(product);
  })
}

product.all = (options, callback) => {
  var relationship = query.filter(options, models.Product);
  relationship.include = [
    { model: models.ProductCategory, required: false },
    { model: models.DiscountCoupon, required: false },
    { model: models.DiscountTotalPurchase, required: false },
    { model: models.ProductPerInventory, required: false }
  ];

  models.Product.findAll(relationship)
  .then((product) => {
    callback(product);
  })
  .catch(function (error) {
    callback({ error })
  });
}

product.show = (id, callback) => {
  models.Product.findOne({ where: id }).then((product)=> {
    callback(product);
  })
  .catch(function (error) {
    callback({ error })
  });
}

product.update = (id, options, callback) =>  {
  models.Product.find({
    where: { id }
  }).then((product) => {
    product.updateAttributes(options).then((product)=>{
      callback(product);
    })
  })
  .catch(function (error) {
    callback({ error })
  });
}

product.delete = (id, callback) => {
  models.Product.destroy({
    where:{ id }
  }).then((product) => {
    callback(product);
  })
  .catch(function (error) {
    callback({ error })
  });
}

module.exports = product;
