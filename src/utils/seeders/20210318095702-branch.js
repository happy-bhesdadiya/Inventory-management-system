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
     await queryInterface.bulkInsert('branch', [
       {
         id:12344,
         branchname:"Time Square 12 floor"
        },
        {
          id:1242344,
          branchname:"Time Square 12 floor"
         },
         {
          id:1234435,
          branchname:"GIFT CITY"
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
     await queryInterface.bulkDelete('branch', null, {});
  }
};
