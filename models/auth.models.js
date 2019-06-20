const config = require('../config/config');
const Sequelize = require('sqlize');
const Auth = config.sequelize.define('auth', {
        name: Sequelize.TEXT,       // TEXT - текстовый тип // http://docs.sequelizejs.com/manual/data-types.html
        email: Sequelize.TEXT,       
        password: Sequelize.TEXT,
        putdate: Sequelize.DATE,
        lastvisit: Sequelize.DATE,
        blockublock: Sequelize.TEXT
    },
    {
        tableName: 'users'
    });

    module.exports = Auth;