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
     await queryInterface.bulkInsert('stock', [
       {
         // id:'12',
          productname:'hp  mouse',
          available_qty:20,
          total_qty:50,
          product_image:'http://localhost:5000/public/f3727ca9-5ea6-4d14-b84c-7081771cbda2-table.png',
          price_per_product:400

       },
       {
       // id:'122',
        productname:'hp  keyboard',
        available_qty:10,
        total_qty:150,
        product_image:'http://localhost:5000/public/f3727ca9-5ea6-4d14-b84c-7081771cbda2-table.png',
        price_per_product:500
     },
     {
      //id:'2212',
      productname:'dell  mouse',
      available_qty:30,
      total_qty:50,
      product_image:'http://localhost:5000/public/f3727ca9-5ea6-4d14-b84c-7081771cbda2-table.png',
      price_per_product:400
   },
   {
    //id:'1342',
    productname:'dell  keyboard',
    available_qty:20,
    total_qty:50,
    product_image:'http://localhost:5000/public/f3727ca9-5ea6-4d14-b84c-7081771cbda2-table.png',
    price_per_product:400
 },
 {
  //id:'12342',
  productname:'Dell Monitor',
  available_qty:20,
  total_qty:50,
  product_image:'http://localhost:5000/public/f3727ca9-5ea6-4d14-b84c-7081771cbda2-table.png',
  price_per_product:2000

},
{
 // id:'222312',
  productname:'Sony projector',
  available_qty:20,
  total_qty:50,
  product_image:'http://localhost:5000/public/f3727ca9-5ea6-4d14-b84c-7081771cbda2-table.png',
  price_per_product:10000
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
      await queryInterface.bulkDelete('stock', null, {});
  }
};
