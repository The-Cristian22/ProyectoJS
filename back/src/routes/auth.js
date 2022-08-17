const express = require('express')
const router = express.Router();
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { successResponse } = require('../utils/responses');
const { config } = require('../config');

router.post('/login',
    passport.authenticate('local', { session: false }),
    (req, res) => {
        const user = req.user
        const payload = {
            sub: user.id,
            role: user.rol
            //iat para colocar el tiempo de validez del token
        }

        const token = jwt.sign(payload, config.TOPSECRET)

        const response = {
            user, token
        }

        successResponse(req, res, response)
    }
)

module.exports = router