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
     await queryInterface.bulkInsert('user', [
       {
         id:'123',
         username:"prem",
         profile_image:"http://localhost:5000/public/f3727ca9-5ea6-4d14-b84c-7081771cbda2-table.png",
         email:"prem.panwala@bacancy.com",
         password:"prem0131",
         is_admin:false,
         is_active:true
       },
       {
        id:'12223',
        username:"Nisarg",
        profile_image:"http://localhost:5000/public/f3727ca9-5ea6-4d14-b84c-7081771cbda2-table.png",
        email:"Nisarg.Choksi@bacancy.com",
        password:"Nisagr345131",
        is_admin:false,
        is_active:true
      },
      {
        id:'345123',
        username:"Bhargav",
        profile_image:"http://localhost:5000/public/f3727ca9-5ea6-4d14-b84c-7081771cbda2-table.png",
        email:"Bhargav.kanodiya@bacancy.com",
        password:"345566",
        is_admin:false,
        is_active:true
      },
      {
        id:'222123',
        username:"Bhoomi mheta",
        profile_image:"http://localhost:5000/public/f3727ca9-5ea6-4d14-b84c-7081771cbda2-table.png",
        email:"Bhommi.mheta@bacancy.com",
        password:"Bacancy",
        is_admin:true,
        is_active:true
      },
      {
        id:'45123',
        username:"Ankita Acharya",
        profile_image:"http://localhost:5000/public/f3727ca9-5ea6-4d14-b84c-7081771cbda2-table.png",
        email:"Ankita.Acharya@bacancy.com",
        password:"Bacancy",
        is_admin:true,
        is_active:true
      }
      ],{})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('user', null, {});
  }
};
