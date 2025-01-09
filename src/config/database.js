// * CONNECTION TO DB
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('desafio-latam', 'denni', '12345', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;
