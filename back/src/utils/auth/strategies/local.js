const boom = require('@hapi/boom')
const { Strategy } = require('passport-local')
const bcrypt = require('bcrypt')

const UsersService = require('../../../services/users')
const usersService = new UsersService()

const LocalStrategy = new Strategy(async (email, password, done) => {
  try {
    const user = await usersService.getUserByEmail(email)
    if(!user)
    {
      done(boom.unauthorized(), false)
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch)
    {
      done(boom.unauthorized(), false)
    }

    done(null, user)
  } catch (error) {
    done(error, false)
  }
  
})

module.exports = LocalStrategy