const boom = require('@hapi/boom')
const { models } = require('../db/sequelize')
const { Op } = require ("sequelize")

class VehicleService {

    constructor(){}

    async getAllVehicles()
    {
        const vehicles = await models.Vehicles.findAll()
        console.log(vehicles)
        
        if(!vehicles)
        {
            throw boom.notFound('Vehiculos no encontrados')
        }
        if(vehicles.length === 0)
        {
            throw boom.notFound('No hay Vehiculos')
        }
        return vehicles
    }

    async getFilterVehicles(plate, owner, phone, date)
    {
        if(!phone){
            phone = 3000000000 
        }
        const vehicles = await models.Vehicles.findAll({
            where: {
                plate: {
                    [Op.substring]: plate
                },
                owner: {
                    [Op.substring]: owner
                },
                [Op.or]: [{phone: phone}, {phone:{[Op.gt]: phone}}],
                
                date: {
                    [Op.substring]: date
                }
            },

        })
        console.log(vehicles)
        
        if(!vehicles)
        {
            throw boom.notFound('Vehiculos no encontrados')
        }
        if(vehicles.length === 0)
        {
            throw boom.notFound('No hay Vehiculos')
        }
        return vehicles
    }

    async postNewVehicle(vehicle){
        try{
            const vehicleCreated = await models.Vehicles.create(vehicle)
            return vehicleCreated
        } catch(e){
            throw boom.internal(e.message)
        }
    }

    async deleteVehicle(plate) {
            const vehicleToDelete = await models.Vehicles.findOne({
                where:{
                    plate: plate
                }
            })
            if(!vehicleToDelete){throw boom.conflict("No se pudo borrar el vehiculo")}
            await vehicleToDelete.destroy()
            return { plate }
    }
}

module.exports = VehicleService