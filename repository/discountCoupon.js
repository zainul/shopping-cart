'use strict'
const discountCoupon     = {};
const models              = require('../models/index');
const query               = require('../helper/query');

discountCoupon.create = (options, callback) => {
  models.DiscountCoupon.create(options).then((discountCoupon) => {
    callback(discountCoupon);
  })
}

discountCoupon.all = (options, callback) => {
  var relationship = query.filter(options, models.DiscountCoupon);

  models.DiscountCoupon.findAll(relationship)
  .then((discountCoupon) => {
    callback(discountCoupon);
  })
  .catch(function (error) {
    callback({ error })
  });
}

discountCoupon.show = (id, callback) => {
  models.DiscountCoupon.findOne({ where: id }).then((discountCoupon)=> {
    callback(discountCoupon);
  })
  .catch(function (error) {
    callback({ error })
  });
}

discountCoupon.update = (id, options, callback) =>  {
  models.DiscountCoupon.find({
    where: { id }
  }).then((discountCoupon) => {
    discountCoupon.updateAttributes(options).then((discountCoupon)=>{
      callback(discountCoupon);
    })
  })
  .catch(function (error) {
    callback({ error })
  });
}

discountCoupon.delete = (id, callback) => {
  models.DiscountCoupon.destroy({
    where:{ id }
  }).then((discountCoupon) => {
    callback(discountCoupon);
  })
  .catch(function (error) {
    callback({ error })
  });
}

module.exports = discountCoupon;
