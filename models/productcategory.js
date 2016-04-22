'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProductCategory = sequelize.define('ProductCategory', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        ProductCategory.hasMany(models.Product)
      }
    }
  });
  return ProductCategory;
};
