'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'MeetGreet', // name of Source model
      'band_id', // name of the key we're changing
      {
        type: Sequelize.UUID,
        references: {
          model: 'Band', // name of Target model
          key: 'band_id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    .then(() => {
      return queryInterface.changeColumn(
        'MeetGreet', // name of Target model
        'event_id', // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: 'Event', // name of Source model
            key: 'event_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'MeetGreet', // name of Source model
      'band_id', // name of the key we're changing
      {
        type: Sequelize.SMALLINT,
        references: {},
        onUpdate: '',
        onDelete: '',
      }
    )
    .then(() => {
      return queryInterface.changeColumn(
        'MeetGreet', // name of Target model
        'event_id', // name of the key we're adding
        {
          type: Sequelize.SMALLINT,
          references: {},
          onUpdate: '',
          onDelete: '',
        }
      );
    });
  }
};
