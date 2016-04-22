'use strict';
module.exports = function(sequelize, DataTypes) {
  var Inventory = sequelize.define('Inventory', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Inventory;
};
