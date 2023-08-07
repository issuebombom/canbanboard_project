'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserBoard extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        targetKey: 'userId',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.Board, {
        targetKey: 'boardId',
        foreignKey: 'boardId',
        onDelete: 'CASCADE',
      });
    }
  }
  UserBoard.init(
    {
      userBoardId: {
        allowNull: false,
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
