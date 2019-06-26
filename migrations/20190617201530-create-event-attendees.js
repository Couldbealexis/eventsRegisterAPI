'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('eventAttendees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // foreign key
      event: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'event',
          key: 'id',
        },
      },
      // foreign key
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'attendeesType',
          key: 'id',
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }, {
      freezeTableName: true,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('eventAttendees');
  }
};
