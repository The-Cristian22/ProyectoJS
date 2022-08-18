require('dotenv').config()

const config = {
    env: process.env.NODE_ENV || 'dev',
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_DATABASE: process.env.DB_DATABASE,
    TOPSECRET: process.env.TOPSECRET
}

module.exports = { config }