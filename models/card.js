'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    static associate(models) {
      this.hasMany(models.UserCard, {
        sourceKey: 'cardId',
        foreignKey: 'cardId',
      });
      this.hasMany(models.Comment, {
        sourceKey: 'cardId',
        foreignKey: 'cardId',
      });
      this.belongsTo(models.Column, {
        targetKey: 'columnId',
        foreignKey: 'columnId',
        onDelete: 'CASCADE',
      });
    }
  }
  Card.init(
    {
      cardId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      columnId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      order: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.STRING,
      },
      expiredDate: {
        type: DataTypes.DATE,
      },
      color: {
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
      modelName: 'Card',
    }
  );
  return Card;
};
