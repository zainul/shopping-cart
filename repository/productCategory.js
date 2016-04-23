'use strict'
const productCategory     = {};
const models              = require('../models/index');
const query               = require('../helper/query');

productCategory.create = (options, callback) => {
  models.ProductCategory.create(options).then((productCategory) => {
    callback(productCategory);
  })
}

productCategory.all = (options, callback) => {
  models.ProductCategory.findAll(query.filter(options, models.ProductCategory ))
  .then((productCategory) => {
    callback(productCategory);
  })
  .catch(function (error) {
    callback(error.message)
  });
}

productCategory.show = (id, callback) => {
  models.ProductCategory.findOne({ where: id }).then((productCategory)=> {
    callback(productCategory);
  })
  .catch(function (error) {
    callback(error.message)
  });
}

productCategory.update = (id, options, callback) =>  {
  models.ProductCategory.find({
    where: { id }
  }).then((productCategory) => {
    productCategory.updateAttributes(options).then((productCategory)=>{
      callback(productCategory);
    })
  })
  .catch(function (error) {
    callback(error.message)
  });
}

productCategory.delete = (id, callback) => {
  models.ProductCategory.destroy({
    where:{ id }
  }).then((productCategory) => {
    callback(productCategory);
  })
  .catch(function (error) {
    callback(error.message)
  });
}

module.exports = productCategory;
