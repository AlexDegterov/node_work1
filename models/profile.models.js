const config = require('../config/config');
const Sequelize = require('sqlize');
const Profile = config.sequelize.define('profile', {
        user_id: Sequelize.INTEGER,       // TEXT - текстовый тип // http://docs.sequelizejs.com/manual/data-types.html
        name: Sequelize.TEXT,       
        surname: Sequelize.TEXT,
        town: Sequelize.DATE
    },
    {
        tableName: 'profiles'
    });

    module.exports = Profile;