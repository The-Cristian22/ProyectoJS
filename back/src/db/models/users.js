const { Model, DataTypes } = require('sequelize')

const USER_TABLE = 'users'

const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(50)
    },
    email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(100)
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING(200)
    },
    rol: {
        allowNull: false,
        type: DataTypes.STRING(10)
    }
}

class User extends Model {
    static associate() { }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'Users',
            timestamps: false
        }
    }
}

module.exports = { USER_TABLE, UserSchema, User }