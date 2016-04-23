'use strict'
const coupon     = {};
const models              = require('../models/index');
const query               = require('../helper/query');

coupon.create = (options, callback) => {
  models.Coupon.create(options).then((coupon) => {
    callback(coupon);
  })
}

coupon.all = (options, callback) => {
  var relationship = query.filter(options, models.ReceiveProduct);
  relationship.all = true,
  relationship.nested = true;

  models.Coupon.findAll(
    {
      include: [
        relationship
      ]
    }
  )
  .then((coupon) => {
    callback(coupon);
  })
  .catch(function (error) {
    callback({ error })
  });
}

coupon.show = (id, callback) => {
  models.Coupon.findOne({ where: id }).then((coupon)=> {
    callback(coupon);
  })
  .catch(function (error) {
    callback({ error })
  });
}

coupon.update = (id, options, callback) =>  {
  models.Coupon.find({
    where: { id }
  }).then((coupon) => {
    coupon.updateAttributes(options).then((coupon)=>{
      callback(coupon);
    })
  })
  .catch(function (error) {
    callback({ error })
  });
}

coupon.delete = (id, callback) => {
  models.Coupon.destroy({
    where:{ id }
  }).then((coupon) => {
    callback(coupon);
  })
  .catch(function (error) {
    callback({ error })
  });
}

module.exports = coupon;
