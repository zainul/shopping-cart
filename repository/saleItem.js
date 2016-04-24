'use strict'
const saleItem     = {};
const models              = require('../models/index');
const query               = require('../helper/query');

saleItem.create = (options, callback) => {
  models.SaleItem.create(options).then((saleItem) => {
    callback(saleItem);
  })
}

saleItem.all = (options, callback) => {
  models.SaleItem.findAll(query.filter(options, models.SaleItem ))
  .then((saleItem) => {
    callback(saleItem);
  })
  .catch(function (error) {
    callback({ error })
  });
}

saleItem.show = (id, callback) => {
  models.SaleItem.findOne({ where: id }).then((saleItem)=> {
    callback(saleItem);
  })
  .catch(function (error) {
    callback({ error })
  });
}

saleItem.update = (id, options, callback) =>  {
  models.SaleItem.find({
    where: { id }
  }).then((saleItem) => {
    saleItem.updateAttributes(options).then((saleItem)=>{
      callback(saleItem);
    })
  })
  .catch(function (error) {
    callback({ error })
  });
}

saleItem.delete = (id, callback) => {
  models.SaleItem.destroy({
    where:{ id }
  }).then((saleItem) => {
    callback(saleItem);
  })
  .catch(function (error) {
    callback({ error })
  });
}

module.exports = saleItem;
