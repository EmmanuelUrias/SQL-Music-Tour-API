'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
await queryInterface.bulkInsert('stage_event', [//{
      //   stage_event_id: 1,
      //   stage_id: 4,
      //   event_id: 6
      // },
      // {
      //   stage_event_id: 2,
      //   stage_id: 5,
      //   event_id: 7
      // }
    ]);
    
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('stage_event', null, {});
     
  }
};
