'use strict';
module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define('Product', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Product.belongsTo(models.ProductCategory)
        Product.hasMany(models.DiscountCoupon, {
          foreignKey: 'type_id',
          constraints: false,
          scope: {
            typeable: 'product'
          }
        });

        Product.hasMany(models.DiscountTotalPurchase, {
          foreignKey: 'type_id',
          constraints: false,
          scope: {
            typeable: 'product'
          }
        });

        Product.hasMany(models.ProductPerInventory)
      }
    }
  });
  return Product;
};
