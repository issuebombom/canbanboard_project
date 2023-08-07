'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Column extends Model {
    static associate(models) {
      // define association here
    }
  }
  Column.init(
    {
      columnId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      boardId: {
        type: DataTypes.INTEGER,
      },
      order: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Column',
    }
  );
  return Column;
};
