'use strict';

const socket = require('../realtime/client');
module.exports = (sequelize, DataTypes) => {

  //modelo en la variable Task.
  var Task = sequelize.define('Task', {
    description: DataTypes.TEXT
  }, {});

  //ejecutamos la propiedad para la relacion de pertenencia
  Task.associate = function(models){
    Task.belongsTo(models.User,{
      as: 'user',
      foreignKey: 'userId'
    });

    Task.belongsToMany(models.Category,{
      through: 'TaskCategories',
      as: 'categories'
      /*En caso de que no se ejecute al insertar una relacion de uno a muchos se coloca
      foreignKey: 'userId' */
    })
  };

  Task.afterCreate(function(task,options){
    socket.emit('new_task',task);
  })
  return Task;
};