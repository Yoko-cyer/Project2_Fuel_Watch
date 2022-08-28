const Sequelize = require('sequelize');

let sequelize;

sequelize = new Sequelize(process.env.JAWSDB_URL, {
    dialect: 'mysql'
});

module.exports = sequelize;