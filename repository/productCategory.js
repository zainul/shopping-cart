'use strict'
const productCategory = {};
const models = require('../models/index');

productCategory.create = (options, callback) => {
  models.ProductCategory.create(options).then((productCategory) => {
    callback(productCategory);
  })
}

productCategory.all = (callback) => {
  models.ProductCategory.findAll({}).then((productCategory) => {
    callback(productCategory);
  })
}

productCategory.show = (id, callback) => {
  models.ProductCategory.findOne({ where: id }).then((productCategory)=> {
    callback(productCategory);
  })
}

productCategory.update = (id, options, callback) =>  {
  models.ProductCategory.find({
    where: { id }
  }).then((productCategory) => {
    productCategory.updateAttributes(options).then((productCategory)=>{
      callback(productCategory);
    })
  })
}

productCategory.delete = (id, callback) => {
  models.ProductCategory.destroy({
    where:{ id }
  }).then((productCategory) => {
    callback(productCategory);
  })
}

module.exports = productCategory;
