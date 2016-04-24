'use strict';
module.exports = function(sequelize, DataTypes) {
  var SaleItem = sequelize.define('SaleItem', {
    total_item: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        SaleItem.belongsTo(models.Sale)
        SaleItem.belongsTo(models.ProductPerInventoryDetil)
        SaleItem.belongsTo(models.DiscountCoupon)
      }
    }
  });
  return SaleItem;
};
