const UsersService = require('../services/users')
const usersService = new UsersService()
const { successResponse, errorResponse } = require('../utils/responses');
const express = require('express')
const router = express.Router()

 

router.post('/save', async (req, res) => {
    try {
        const user = req.body
        const userCreated = await usersService.postNewUser(user)
        successResponse(req, res, userCreated)
    } catch (error) {
        errorResponse(req, res, error)
    }
})

router.get('/all', async (req, res) => {
    try {
        const user = await usersService.getUsers()
        successResponse(req, res, user)
    } catch (error) {
        errorResponse(req, res, error)
    }
})

router.get('/email', async (req, res) =>{
    try {
        const email = req.body.email
        const user = await usersService.getUserByEmail(email)
        successResponse(req, res, user)
    } catch (error) {
        errorResponse(req, res, error)
    }
})

router.delete('/delete/:id', async(req, res)=>{
    const id = req.params.id

    try {
        const deletedUser = await usersService.deleteUser(id)
        successResponse(req, res, deletedUser)
    } catch (error) {
        errorResponse(req, res, error)
    }
})

module.exports = router