'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('product', { 
      id:{
        type:Sequelize.UUID,
        primaryKey:true,
        defaultValue:Sequelize.UUIDV4
        },
      name: Sequelize.STRING,
      is_available:Sequelize.BOOLEAN

      });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('product');
  }
};
