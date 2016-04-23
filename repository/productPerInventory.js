'use strict'
const productPerInventory = {};
const models              = require('../models/index');
const query               = require('../helper/query');

productPerInventory.create = (options, callback) => {
  models.ProductPerInventory.create(options).then((productPerInventory) => {
    callback(productPerInventory);
  })
}

productPerInventory.all = (options, callback) => {
  var relationship = query.filter(options, models.ProductPerInventory);
  relationship.all = true,
  relationship.nested = true;

  models.ProductPerInventory.findAll(
    {
      include: [
        relationship
      ]
    }
  )
  .then((productPerInventory) => {
    callback(productPerInventory);
  })
  .catch(function (error) {
    callback({ error })
  });
}

productPerInventory.show = (id, callback) => {
  models.ProductPerInventory.findOne({ where: id }).then((productPerInventory)=> {
    callback(productPerInventory);
  })
  .catch(function (error) {
    callback({ error })
  });
}

productPerInventory.update = (id, options, callback) =>  {
  models.ProductPerInventory.find({
    where: { id }
  }).then((productPerInventory) => {
    productPerInventory.updateAttributes(options).then((productPerInventory)=>{
      callback(productPerInventory);
    })
  })
  .catch(function (error) {
    callback({ error })
  });
}

productPerInventory.delete = (id, callback) => {
  models.ProductPerInventory.destroy({
    where:{ id }
  }).then((productPerInventory) => {
    callback(productPerInventory);
  })
  .catch(function (error) {
    callback({ error })
  });
}

module.exports = productPerInventory;
