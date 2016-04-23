'use strict';
module.exports = function(sequelize, DataTypes) {
  var ReceiveProduct = sequelize.define('ReceiveProduct', {
    date: DataTypes.DATE,
    total: DataTypes.INTEGER,
    costOfGoodSold: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        ReceiveProduct.belongsTo(models.ProductPerInventory);
      }
    }
  });
  return ReceiveProduct;
};
