require('dotenv').config()

const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_HOST, process.env.DB_DIALECT)

module.exports = sequelize
