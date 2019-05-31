const config = require('../config/config');
const Sequelize = require('sqlize');
const Maintext = config.sequelize.define('maintext', {
        name: Sequelize.TEXT,       // TEXT - текстовый тип // http://docs.sequelizejs.com/manual/data-types.html
        body: Sequelize.TEXT,       
        url: Sequelize.TEXT,
        putdate: Sequelize.TEXT,
        status: Sequelize.INTEGER,
        lang: Sequelize.TEXT
    },
    {
        tableName: 'maintexts'
    });

    module.exports = Maintext;