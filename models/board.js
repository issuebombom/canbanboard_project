'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    static associate(models) {
      // define association here
    }
  }
  Board.init(
    {
      boardId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      admins: {
        type: DataTypes.STRING,
      },
      color: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      totalColumnsNum: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
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
      modelName: 'Board',
    }
  );
  return Board;
};
