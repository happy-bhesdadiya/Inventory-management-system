'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('stocks', {
      id:{
        type: Sequelize.INTEGER,
         autoIncrement: true,
        primaryKey:true,
    },
    product_name: Sequelize.STRING,
     available_qty:Sequelize.INTEGER,
     total_qty:Sequelize.INTEGER,
     product_image:Sequelize.STRING,
     price_per_product:Sequelize.INTEGER,
     status:{
      type:Sequelize.BOOLEAN,
      defaultValue:true
     }
      });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('stocks');
  }
};
