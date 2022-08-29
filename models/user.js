const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

<<<<<<< HEAD
 User.init(
     {
         id: {
             type: DataTypes.INTEGER,
             allowNull: false,
             primaryKey: true,
             autoIncrement: true,
         },
         username: {
             type: DataTypes.STRING,
             allowNull: false,
         },
         password: {
            type: DataTypes.STRING,
          allowNull: false,
          validate: {
               len: [8],
           },
          },
         surroundingSuburbs: {
             type: DataTypes.STRING,
             allowNull: false,
         },
         fuelType: {
             type: DataTypes.STRING,
             allowNull: false,

         },
     },
     {
         hooks: {
             beforeCreate: async (newUserData) => {
                 newUserData.password = await bcrypt.hash(newUserData.password, 10);
                 return newUserData;
             },
             beforeUpdate: async (updatedUserData) => {
                 updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                 return updatedUserData;
             },
         },
         sequelize,
         timestamps: false,
         freezeTableName: true,
         underscored: true,
         modelName: 'user',
     }
 );
=======
User.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
           len: [8],
       },
    },
    suburb: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surrounding_suburbs: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fuel_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);
>>>>>>> d41f6d6911b07094a54d1d68f2d6322f38663aef

module.exports = User;