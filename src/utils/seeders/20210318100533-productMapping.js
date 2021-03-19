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
     await queryInterface.bulkInsert('productMappings', [
       {
        // id:'123',
        product_id:1,
        assigned_by:4,
        assigned_to:2,
         issued_date:sequelize.literal('CURRENT_TIMESTAMP'),
         status:'approved'
       },
       {
       // id:'1223',
       
       product_id:2,
       assigned_by:5,
       assigned_to:1,
        issued_date:sequelize.literal('CURRENT_TIMESTAMP'),
        status:'pending'
      },
      {
       // id:'34123',
       
       product_id:3,
       assigned_by:4,
       assigned_to:3,
        issued_date:sequelize.literal('CURRENT_TIMESTAMP'),
        returned_date:sequelize.literal('CURRENT_TIMESTAMP'),
        status:'approved'
      },
      
      {
       // id:'123233',
       product_id:1,
       assigned_by:4,
       assigned_to:2,
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
     await queryInterface.bulkDelete('productMappings', null, {});
  }
};
