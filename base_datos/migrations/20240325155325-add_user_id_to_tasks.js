'use strict';

/** @type {import('sequelize-cli').Migration} */
/** Se utiliza cuando se inicia la migracion */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Tasks', 'userId',{
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      }
    })
  },
/** Se usa cuando se revierte la migracion */
   down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Tasks','userId');
  }
};
