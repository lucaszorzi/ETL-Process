const Sequelize = require('sequelize');
const database = require('../../database/db');

const numbers = database.define('numbers', {
    number: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

numbers.sync( { force: false });

module.exports = numbers;