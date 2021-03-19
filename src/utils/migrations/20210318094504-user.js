'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('user', { 
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
       primaryKey:true,
    },
    username: Sequelize.STRING,
    profile_image:Sequelize.STRING,
     email:Sequelize.STRING,
      password:Sequelize.STRING,
      branch_id:{
        type:Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'branch',
          key: 'id'
        }
      },
        is_admin: {
            type:Sequelize.BOOLEAN,
        default:false},
     is_active:{type:Sequelize.BOOLEAN,
    default:true},
        token:Sequelize.STRING,
     created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
      
      });
  },



  //npx sequelize-cli db:migrate --to20210318094804-user.js

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('user');
  }
};
