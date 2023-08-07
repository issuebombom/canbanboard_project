'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCard extends Model {
    static associate(models) {
      // define association here
    }
  }
  UserCard.init(
    {
      userCardId: {
        allowNull: false,
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
