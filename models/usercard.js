'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCard extends Model {
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
  UserCard.init(
    {
      userCardId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      cardId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'UserCard',
      timestamps: false,
    }
  );
  return UserCard;
};
