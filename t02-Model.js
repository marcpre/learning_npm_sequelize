const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(`${__dirname}/src/config/config.js`)[env]
const db = {}

let sequelize
try {
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
    console.log('Connection has been established successfully.')
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config)
    console.log('Connection has been established successfully.')
  }
} catch (e) {
  console.error('Unable to connect to the database:', e)
}


const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
})

// force: true will drop the table if it already exists
User.sync({
  force: true
}).then(() =>
  // Table created
  User.create({
    firstName: 'John',
    lastName: 'Hancock',
  }),
)