'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserBoard extends Model {
    static associate(models) {
      // define association here
    }
  }
  UserBoard.init(
    {
      userBoardId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      boardId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'UserBoard',
      timestamps: false,
    }
  );
  return UserBoard;
};
