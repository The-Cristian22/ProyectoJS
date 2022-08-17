const VehicleService = require('../services/vehicles')
const vehicleService = new VehicleService()
const { successResponse, errorResponse } = require('../utils/responses')
const express = require('express')
const router = express.Router();
const passport = require('passport');

router.get('/all', async (req, res) =>{
    try{
        const vehicles = await vehicleService.getAllVehicles()
        successResponse(req, res, vehicles)
    } catch (e) {
        errorResponse(req, res, e)
    }
});

router.get('/all/filter', async (req, res)=>{
    const plate = req.query.plate
    const owner = req.query.owner
    const phone = req.query.phone
    const date = req.query.date
    try{
        const vehicles = await vehicleService.getFilterVehicles(plate, owner, phone, date)
        successResponse(req, res, vehicles)
    } catch(e){
        errorResponse(req, res, e)
    }
})

router.post('/save', async(req, res) =>{
    const newVehicle = req.body
    console.log(newVehicle)
    try{
        const vehicles = await vehicleService.postNewVehicle(newVehicle)
        successResponse(req, res, vehicles)
    } catch (e){
        errorResponse(req, res, e)
    }
})

router.delete('/delete/:plate', async(req, res) =>{
    const plate = req.params.plate
    try{
        const deletedVehicle = await vehicleService.deleteVehicle(plate)
        successResponse(req, res, deletedVehicle)
    } catch (e) {
        errorResponse(req, res, e)
    }
}
)

module.exports = router