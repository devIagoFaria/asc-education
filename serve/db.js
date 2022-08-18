const Sequelize = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DB_POSTGRES,
    process.env.USER_POSTGRES,
    process.env.PASSWORD_POSTGRES, {
        dialect: 'postgres',
        host: process.env.HOST_POSTGRES,
        port: process.env.PORT_POSTGRES
    }
)

module.exports = sequelize;