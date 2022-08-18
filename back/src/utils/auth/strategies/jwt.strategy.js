const { Strategy, ExtractJwt } = require('passport-jwt')
const { config } = require('../../../config')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.TOPSECRET
}

const JwtStrategy = new Strategy(options, (payload, done) => {
    console.log(payload)
    return done(null, payload)
})

module.exports = JwtStrategy