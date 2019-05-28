const Sequelize = require('sequelize');

const sequelize = new Sequelize('kurse', 'root', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});

exports.sequelize = sequelize;
