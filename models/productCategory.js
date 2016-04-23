'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProductCategory = sequelize.define('ProductCategory', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        ProductCategory.hasMany(models.Product)
        ProductCategory.hasMany(models.DiscountCoupon, {
          foreignKey: 'type_id',
          constraints: false,
          scope: {
            typeable: 'product_category'
          }
        });

        ProductCategory.hasMany(models.DiscountTotalPurchase, {
          foreignKey: 'type_id',
          constraints: false,
          scope: {
            typeable: 'product_category'
          }
        });
      }
    }
  });
  return ProductCategory;
};
