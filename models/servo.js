const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Servo extends Model {}

Servo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
        unique: false,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false, 
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'servo',
  }
);

module.exports = Servo;