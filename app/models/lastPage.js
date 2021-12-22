const Sequelize = require('sequelize');
const database = require('../../database/db');

const lastPage = database.define('lastpage', {
    lastpage: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false
    }
})

lastPage.sync( { force: false });

module.exports = lastPage;