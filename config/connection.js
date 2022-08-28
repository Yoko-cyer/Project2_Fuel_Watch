const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

sequelize = new Sequelize(process.env.JAWSDB_URL, {
    dialect: 'mysql'
});

module.exports = sequelize;