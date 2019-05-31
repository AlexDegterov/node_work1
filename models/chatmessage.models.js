const config = require('../config/config');
const Sequelize = require('sqlize');
const Chatmessage = config.sequelize.define('messages', {
        name: Sequelize.TEXT,       // TEXT - текстовый тип // http://docs.sequelizejs.com/manual/data-types.html
        room: Sequelize.TEXT,       
        message: Sequelize.TEXT,
        status: Sequelize.TEXT,
        putdate: Sequelize.TEXT
    },
    {
        tableName: 'messages'
    });

module.exports = Chatmessage;