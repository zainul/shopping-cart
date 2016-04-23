'use strict'
const productPerInventoryDetil     = {};
const models              = require('../models/index');
const query               = require('../helper/query');

productPerInventoryDetil.all = (options, callback) => {
  var relationship = query.filter(options, models.ProductPerInventoryDetil);
  relationship.all = true;

  models.ProductPerInventoryDetil.findAll(
    {
      include: [
        relationship
      ]
    }
  )
  .then((productPerInventoryDetil) => {
    callback(productPerInventoryDetil);
  })
  .catch(function (error) {
    callback({ error })
  });
}

module.exports = productPerInventoryDetil;
