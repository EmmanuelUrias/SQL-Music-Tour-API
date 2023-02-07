'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stage',[{
        stage_id: 4,
        stage_name: 'Cool Festival Stage'
      },
      {
        stage_id: 5,
        stage_name: 'Amazing Festival Stage'
      }
    ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stage', null, {})

  }
};
