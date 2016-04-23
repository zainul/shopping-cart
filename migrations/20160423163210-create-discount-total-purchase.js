'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('DiscountTotalPurchases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      start: {
        type: Sequelize.DATE
      },
      end: {
        type: Sequelize.DATE
      },
      typeable:{
        type: Sequelize.STRING
      },
      type_id: {
        type: Sequelize.INTEGER
      },
      discount_value: {
        type: Sequelize.INTEGER
      },
      type_discount: {
        type: Sequelize.STRING
      },
      min_purchase: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('DiscountTotalPurchases');
  }
};
