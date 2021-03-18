'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('productMapping', {
      id:{
        type:Sequelize.UUID,
        primaryKey:true,
        defaultValue:Sequelize.UUIDV4
           },
      issued_date:{
        type: 'TIMESTAMP',
        allowNull: true
            },
      returned_date:{
        type: 'TIMESTAMP',
        allowNull: true
            }  ,
      status:Sequelize.STRING
        });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('productMapping');
  }
};
