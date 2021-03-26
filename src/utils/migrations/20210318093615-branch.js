'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('branches',{ 
      id:
       { 
        type: Sequelize.INTEGER,
        autoIncrement: true,
       primaryKey:true,
       } ,
     branch_name: Sequelize.STRING,
     is_active:
     {
       type:Sequelize.BOOLEAN,
       default:true
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
     await queryInterface.dropTable('branches');
  }
};
