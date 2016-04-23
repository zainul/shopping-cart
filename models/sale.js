'use strict';
module.exports = function(sequelize, DataTypes) {
  var Sale = sequelize.define('Sale', {
    date: DataTypes.DATE,
    is_finished: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Sale.belongsTo(models.User)
        Sale.belongsTo(models.DiscountTotalPurchase)
      }
    }
  });
  return Sale;
};
