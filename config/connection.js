const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.fuel_db) {
    sequelize = new Sequelize(process.env.fuel_db);
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3001
    });
}

module.export = sequelize;