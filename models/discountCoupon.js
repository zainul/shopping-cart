'use strict';
module.exports = function(sequelize, DataTypes) {
  var DiscountCoupon = sequelize.define('DiscountCoupon', {
    name: DataTypes.TEXT,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    typeable: DataTypes.STRING,
    type_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        DiscountCoupon.belongsTo(models.Product, {
          foreignKey: 'type_id',
          constraints: false,
          as: 'product'
        });

        DiscountCoupon.belongsTo(models.ProductCategory, {
          foreignKey: 'type_id',
          constraints: false,
          as: 'product_category'
        });

      }
    }
  });
  return DiscountCoupon;
};
