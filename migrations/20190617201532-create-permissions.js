'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // foreign key
      menu: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'menus',
          key: 'id',
        },
      },
      // foreign key
      user: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
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
      // freezeTableName: true,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('permissions');
  }
};
