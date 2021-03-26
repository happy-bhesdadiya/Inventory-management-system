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
    */
     await queryInterface.bulkInsert('branches', [
       {
        // id:'1',
         branch_name:"Time Square 12 floor"
        },
        {
          //id:'2',
          branch_name:"Time Square 8 floor"
         },
         {
         // id:'3',
          branch_name:"GIFT CITY"
         }
      ] ,{});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('branches', null, {});
  }
};
