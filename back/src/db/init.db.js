const { Vehicle, VehicleSchema} = require('./models/vehicles')
const { User, UserSchema} = require('./models/users')

function setupModels(sequelize) {
    Vehicle.init(VehicleSchema, Vehicle.config(sequelize))
    User.init(UserSchema, User.config(sequelize))
}

module.exports = setupModels