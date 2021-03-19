//'use strict';

module.exports = {
  up: async (queryInterface, sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('productMapping', [
       {
         id:'123',
         issued_date:sequelize.literal('CURRENT_TIMESTAMP'),
         status:'approved'
       },
       {
        id:'1223',
        issued_date:sequelize.literal('CURRENT_TIMESTAMP'),
        status:'pending'
      },
      {
        id:'34123',
        issued_date:sequelize.literal('CURRENT_TIMESTAMP'),
        returned_date:sequelize.literal('CURRENT_TIMESTAMP'),
        status:'approved'
      },
      {
        id:'22123',
        issued_date:sequelize.literal('CURRENT_TIMESTAMP'),
        status:'rejected'
      },{
        id:'4565123',
        issued_date:sequelize.literal('CURRENT_TIMESTAMP'),
        status:'approved'
      },
      {
        id:'56123',
        issued_date:sequelize.literal('CURRENT_TIMESTAMP'),
        
        status:'pending'
      },
      {
        id:'244123',
        issued_date:sequelize.literal('CURRENT_TIMESTAMP'),
        
        status:'approved'
      },
      {
        id:'123233',
        issued_date:sequelize.literal('CURRENT_TIMESTAMP'),
        
        status:'rejected'
      },
       
      ],{});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('productMapping', null, {});
  }
};
