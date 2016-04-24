'use strict'
const productPerInventoryDetil     = {};
const models              = require('../models/index');
const query               = require('../helper/query');

productPerInventoryDetil.all = (options, callback) => {
  var relationship = query.filter(options, models.ProductPerInventoryDetil);
  relationship.where = {
    stock: {
      $gt: 0
    }
  },
  relationship.include = [
    {
      model: models.ReceiveProduct, required: false,
      include: [
        {
          model: models.ProductPerInventory, required: false,
          include: [
            { model: models.Product, required: false },
            { model: models.Inventory, required: false }
          ]
        }
      ]
    }
  ]

  models.ProductPerInventoryDetil.findAll(relationship)
  .then((productPerInventoryDetil) => {
    callback(productPerInventoryDetil);
  })
  .catch(function (error) {
    callback({ error })
  });
}

module.exports = productPerInventoryDetil;
