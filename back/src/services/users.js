const boom = require('@hapi/boom')
const { models } = require('../db/sequelize')
const bcrypt = require('bcrypt')

class UsersService {
    constructor() { }

    async postNewUser(user) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 14)
            const userCreated = await models.Users.create({
                ...user,
                password: hashedPassword
            })
            return userCreated
        } catch (error) {
            throw boom.internal(error.message)
        }
    }

    async getUsers() {
        try {
            return await models.Users.findAll()
        }
        catch (error) {
            throw boom.internal(error.message)
        }
    }

    async getUserByEmail(email) {
        try {
            return await models.Users.findOne({
                where: {
                    email: email
                }
            })
        } catch (error) {
            throw boom.internal(error.message)
        }
    }

    async deleteUser(id){
        const deleteUser = await models.Users.findByPk(id)
        if(!deleteUser)
        {
            throw boom.conflict('Not resouerce deleted')
        }
        await deleteUser.destroy()
        return { id }

}
}

module.exports = UsersService