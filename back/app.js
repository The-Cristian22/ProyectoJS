const { errorHandler, clientErrorHandler, logErrors, invalidPath} = require('./src/middlewares/errorHandler')
const vehiclesRouter = require('./src/routes/vehicles')
const usersRouter = require('./src/routes/users')
const authRouter = require('./src/routes/auth')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const app = express()

app.use(express.json())
app.use(cors())

app.use(helmet())

app.use((req, res, next) =>{
    console.log('Entrando middleware principal')
    console.log(`${req.method} ${Date.now} ${req.url} ${req.path}`)
    next()
})
require('./src/utils/auth')


app.use('/vehicles', vehiclesRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)

app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)
app.use(invalidPath)

module.exports = app