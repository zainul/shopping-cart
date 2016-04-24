'use strict'
const sale     = {};
const models              = require('../models/index');
const query               = require('../helper/query');
const async               = require('async');

sale.create = (options, callback) => {
  models.Sale.create({
    date: (new Date()),
    is_finished: false,
    UserId: 1,
  }).then((sale) => {
    var sale_items = options.sale_items.map(function(item) {
      item.SaleId = sale.id
      return item;
    });
    models.SaleItem.bulkCreate(sale_items).then((res) => {
      callback(sale);
    })
  })
}

sale.all = (options, callback) => {
  models.Sale.findAll(query.filter(options, models.Sale ))
  .then((sale) => {
    callback(sale);
  })
  .catch(function (error) {
    callback({ error })
  });
}

sale.show = (id, callback) => {
  models.Sale.findOne({ where: id }).then((sale)=> {
    callback(sale);
  })
  .catch(function (error) {
    callback({ error })
  });
}

sale.update = (id, options, callback) =>  {
  models.Sale.find({
    where: { id }
  }).then((sale) => {
    sale.updateAttributes(options).then((sale)=>{
      callback(sale);
    })
  })
  .catch(function (error) {
    callback({ error })
  });
}

sale.preCheckout = (id, options, callback) => {
  if (options.discountType == 'coupon') {
    models.Coupon.findOne({
      where : {
        code: options.code
      },
      include: [
        { model: models.DiscountCoupon, require: false,
          where : {
            start: {
              $gte: new Date()
            },
            end: {
              $lte: new Date()
            }
          }
        }
      ]
    }).then((coupon) => {
      callback(coupon);
    })
  }else if(options.discountType == 'total_purchase') {

  }else{

  }
}

sale.delete = (id, callback) => {
  models.Sale.destroy({
    where:{ id }
  }).then((sale) => {
    callback(sale);
  })
  .catch(function (error) {
    callback({ error })
  });
}

module.exports = sale;
