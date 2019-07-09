const config = require('../config/config');
const Sequelize = require('sqlize');
const Profile = config.sequelize.define('profile', {
        user_id: {
            type: Sequelize.INTEGER,
            unique: {
                msg: 'Поле user_id должно содержать уникальное значение'
            },
            validate: {
                notEmpty: {
                    msg: 'Поле user_id не может быть пустым'
                }
            }
        },  
        name: Sequelize.TEXT,       
        surname: Sequelize.TEXT,
        town: Sequelize.DATE,
        picture: Sequelize.TEXT
    },
    {
        tableName: 'profiles'
    });

    module.exports = Profile;