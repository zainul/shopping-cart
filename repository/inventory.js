'use strict'
const inventory     = {};
const models              = require('../models/index');
const query               = require('../helper/query');

inventory.create = (options, callback) => {
  models.Inventory.create(options).then((inventory) => {
    callback(inventory);
  })
}

inventory.all = (options, callback) => {
  models.Inventory.findAll(query.filter(options, models.Inventory ))
  .then((inventory) => {
    callback(inventory);
  })
  .catch(function (error) {
    callback({ error })
  });
}

inventory.show = (id, callback) => {
  models.Inventory.findOne({ where: id }).then((inventory)=> {
    callback(inventory);
  })
  .catch(function (error) {
    callback({ error })
  });
}

inventory.update = (id, options, callback) =>  {
  models.Inventory.find({
    where: { id }
  }).then((inventory) => {
    inventory.updateAttributes(options).then((inventory)=>{
      callback(inventory);
    })
  })
  .catch(function (error) {
    callback({ error })
  });
}

inventory.delete = (id, callback) => {
  models.Inventory.destroy({
    where:{ id }
  }).then((inventory) => {
    callback(inventory);
  })
  .catch(function (error) {
    callback({ error })
  });
}

module.exports = inventory;
