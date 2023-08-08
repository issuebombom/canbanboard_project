'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        targetKey: 'userId',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.Card, {
        targetKey: 'cardId',
        foreignKey: 'cardId',
        onDelete: 'CASCADE',
      });
    }
  }
  Comment.init(
    {
      commentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      cardId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      content: {
        type: DataTypes.TEXT,
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
      modelName: 'Comment',
    }
  );
  return Comment;
};
