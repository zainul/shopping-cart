'use strict'
const coupon     = {};
const models              = require('../models/index');
const query               = require('../helper/query');

coupon.create = (options, callback) => {
  let listpreCreated = [];

  if (options.totalCreated < 1)
    options.totalCreated =1;

  for(var i=0, len = options.totalCreated; i< len; i++) {
    listpreCreated.push({
      code: Math.random().toString(36).substr(2, 6),
      usedAt: null,
      usedBy: null,
      DiscountCouponId: options.DiscountCouponId
    })
  }

  models.Coupon.bulkCreate(listpreCreated).then((res) => {
    models.Coupon.findAll(
      {
        where : {
          DiscountCouponId: options.DiscountCouponId
        }
      }
    ).then((res)=> {
      callback(res);
    })
  }).catch(function (error) {
    callback({ error })
  });
}

coupon.all = (options, callback) => {
  var relationship = query.filter(options, models.Coupon);
  // relationship.all = true,
  // relationship.nested = true;

  models.Coupon.findAll(
    // {
      // include: [
        relationship
      // ]
    // }
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
