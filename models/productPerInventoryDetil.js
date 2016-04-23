'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProductPerInventoryDetil = sequelize.define('ProductPerInventoryDetil', {
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        ProductPerInventoryDetil.belongsTo(models.ReceiveProduct);
      }
    }
  });
  return ProductPerInventoryDetil;
};
