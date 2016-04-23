'use strict'
const discountTotalPurchase     = {};
const models              = require('../models/index');
const query               = require('../helper/query');

discountTotalPurchase.create = (options, callback) => {
  models.DiscountTotalPurchase.create(options).then((discountTotalPurchase) => {
    callback(discountTotalPurchase);
  })
}

discountTotalPurchase.all = (options, callback) => {
  var relationship = query.filter(options, models.discountTotalPurchase);
  relationship.all = true,
  relationship.nested = true;

  models.DiscountTotalPurchase.findAll(
    {
      include: [
        relationship
      ]
    }
  )
  .then((discountTotalPurchase) => {
    callback(discountTotalPurchase);
  })
  .catch(function (error) {
    callback({ error })
  });
}

discountTotalPurchase.show = (id, callback) => {
  models.DiscountTotalPurchase.findOne({ where: id }).then((discountTotalPurchase)=> {
    callback(discountTotalPurchase);
  })
  .catch(function (error) {
    callback({ error })
  });
}

discountTotalPurchase.update = (id, options, callback) =>  {
  models.DiscountTotalPurchase.find({
    where: { id }
  }).then((discountTotalPurchase) => {
    discountTotalPurchase.updateAttributes(options).then((discountTotalPurchase)=> {
      callback(discountTotalPurchase);
    })
  })
  .catch(function (error) {
    callback({ error })
  });
}

discountTotalPurchase.delete = (id, callback) => {
  models.DiscountTotalPurchase.destroy({
    where:{ id }
  }).then((discountTotalPurchase) => {
    callback(discountTotalPurchase);
  })
  .catch(function (error) {
    callback({ error })
  });
}

module.exports = discountTotalPurchase;
