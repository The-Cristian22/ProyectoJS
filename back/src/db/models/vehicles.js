const { Model, DataTypes} = require('sequelize')

const VEHICLE_TABLE = 'vehicles'

const VehicleSchema = {
    plate: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(10)
    },
    
    owner: {
        allowNull: false,
        type: DataTypes.STRING(50)

    },
    mail:{
        allowNull: true,
        type: DataTypes.STRING(100)

    },
    phone:{
        allowNull: false,
        type: DataTypes.BIGINT

    },
    identification:{
        allowNull: false,
        type: DataTypes.STRING(20)

    },
    date:{
        allowNull: false,
        type: DataTypes.STRING(100)
    }
}

class Vehicle extends Model
{
    static associate(){}

    static config(sequelize)
    {
        return {
            sequelize, 
            tableName: VEHICLE_TABLE,
            modelName: 'Vehicles',
            timestamps: false
        }
    }
}

module.exports = { VEHICLE_TABLE, VehicleSchema, Vehicle }