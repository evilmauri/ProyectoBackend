'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    title: DataTypes.STRING,
    color: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    //las associaciones van definidas aqui..
    Category.belongsToMany(models.Task,{
      through: 'TaskCategories',
      as: 'tasks',
      foreignkey: 'taskId'
    });
  };
  return Category;
};