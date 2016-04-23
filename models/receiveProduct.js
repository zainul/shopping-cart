'use strict';
module.exports = function(sequelize, DataTypes) {
  var Receiveproduct = sequelize.define('ReceiveProduct', {
    date: DataTypes.DATETIME,
    ProductPerInventoryId: DataTypes.INTEGER,
    InventoryId: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    costOfGoodSold: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Receiveproduct.belongsTo(models.ProductPerInventory);
      }
    }
  });
  return ReceiveProduct;
};
