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
     await queryInterface.bulkInsert('users', [
       {
        // id:'123',
         user_name:"prem",
         profile_image:"http://localhost:5000/public/f3727ca9-5ea6-4d14-b84c-7081771cbda2-table.png",
         email:"prem.panwala@bacancy.com",
         password:"prem0131",
         branch_id:1,
         is_admin:false,
         is_active:true
       },
       {
        //id:'12223',
        user_name:"Nisarg",
        profile_image:"http://localhost:5000/public/f3727ca9-5ea6-4d14-b84c-7081771cbda2-table.png",
        email:"Nisarg.Choksi@bacancy.com",
        password:"Nisagr345131",
        branch_id:2,
        is_admin:false,
        is_active:true
      },
      {
      //  id:'345123',
        user_name:"Bhargav",
        profile_image:"http://localhost:5000/public/f3727ca9-5ea6-4d14-b84c-7081771cbda2-table.png",
        email:"Bhargav.kanodiya@bacancy.com",
        password:"345566",
        branch_id:1,
        is_admin:false,
        is_active:true
      },
      {
      //  id:'222123',
        user_name:"Bhoomi mheta",
        profile_image:"http://localhost:5000/public/f3727ca9-5ea6-4d14-b84c-7081771cbda2-table.png",
        email:"Bhommi.mheta@bacancy.com",
        password:"Bacancy",
        branch_id:'1',
        is_admin:true,
        is_active:true
      },
      {
       // id:'45123',
        user_name:"Ankita Acharya",
        profile_image:"http://localhost:5000/public/f3727ca9-5ea6-4d14-b84c-7081771cbda2-table.png",
        email:"Ankita.Acharya@bacancy.com",
        password:"Bacancy",
        branch_id:'2',
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
     await queryInterface.bulkDelete('users', null, {});
  }
};
