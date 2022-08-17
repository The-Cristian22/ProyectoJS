const { errorResponse } = require("../utils/responses")
const boom = require('@hapi/boom')

const method_not_allow = (req, res, next) => {
    console.log('Valindando metodo')
    if (req.method === 'GET') {
        next()
    }
    else {
        next(new Error('Method not allow'))
    }
}

const validate_data = (req, res, next) => {
    console.log("validando datos")
    const data = req.body

    if (!isNaN(data.name)) {
        res.status(500).json(
            {
                error: "El dato no es valido"
            }
        )
    }
    else {
        next()
    }
}

function validate_data_Joi(schema, property) {
    return (req, res, next) => {
        // property: body, params, query
        const data = req[property]
        const { error } = schema.validate(data)

        if (error) {
            //next(boom.badRequest('Error al validar el request'))
            errorResponse(req, res, boom.conflict(error))
        }
        else {
            next()
        }
    }
}


module.exports = {
    method_not_allow,
    validate_data,
    validate_data_Joi
}