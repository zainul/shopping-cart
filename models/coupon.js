'use strict';
module.exports = function(sequelize, DataTypes) {
  var Coupon = sequelize.define('Coupon', {
    code: DataTypes.STRING,
    usedAt: DataTypes.DATE,
    usedBy: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Coupon.belongsTo(models.DiscountCoupon)
        // associations can be defined here
      }
    }
  });
  return Coupon;
};
