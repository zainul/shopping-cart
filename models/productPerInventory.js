'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProductPerInventory = sequelize.define('ProductPerInventory', {
    stock: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        ProductPerInventory.belongsTo(models.Inventory);
        ProductPerInventory.belongsTo(models.Product);
      }
    }
  });
  return ProductPerInventory;
};
