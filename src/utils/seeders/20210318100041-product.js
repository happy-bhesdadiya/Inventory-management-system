'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     * 
    */
     await queryInterface.bulkInsert('products', [
       {
        // id:'123',
         product_name:"hp mouse 1",
         is_available:0
       },
       {
       // id:'234123',
        product_name:"hp mouse 2",
        is_available:0
      },
      {
       // id:'233123',
        product_name:"hp mouse 3",
        is_available:1
      }
      
      ],{});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('products', null, {});
  }
};
