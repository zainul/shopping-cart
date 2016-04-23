'use strict';
module.exports = function(sequelize, DataTypes) {
  var DiscountTotalPurchase = sequelize.define('DiscountTotalPurchase', {
    name: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    typeable: DataTypes.STRING,
    type_id: DataTypes.INTEGER,
    discount_value: DataTypes.INTEGER,
    type_discount: DataTypes.STRING,
    min_purchase: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here

        DiscountTotalPurchase.belongsTo(models.Product, {
          foreignKey: 'type_id',
          constraints: false,
          as: 'product'
        });

        DiscountTotalPurchase.belongsTo(models.ProductCategory, {
          foreignKey: 'type_id',
          constraints: false,
          as: 'product_category'
        });

      }
    }
  });
  return DiscountTotalPurchase;
};
