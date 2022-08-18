const { Sequelize } = require('sequelize')
const { config } = require('../config')
const setupModels = require('./init.db')

const USER = encodeURIComponent(config.DB_USER)
const PASSWORD  = encodeURIComponent(config.DB_PASSWORD)

const URI = `postgres://${USER}:${PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: (message) => console.log(`[Sequelize] : ${message}`)
})

setupModels(sequelize)

sequelize.sync({
  alter:true,
  logging: (message) => console.log(`[sync]: ${message}`)
})

module.exports = sequelize