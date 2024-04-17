'use strict';
module.exports = {
  //metodo up para crear una tabla en la migracion
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  //metodo down para revetir la migracion
  down: (queryInterface, Sequelize)=> {
    return queryInterface.dropTable('Tasks');
  }
};