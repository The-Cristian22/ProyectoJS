function logErrors(err, req, res, next) {
    console.error(`Error Stack ${err.stack}`)
    next(err)
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).json({ error: 'Algo estuvo mal en la peticion' })
    }
    else {
        next(err)
    }
}

function errorHandler(err, req, res, next) {
    console.error(`Error Handler ${err}`)
    res.status(500).json({
        error: 'Error general en la aplicacion'
    })
}

function invalidPath(req, res, next) {
    res.status(404)
    res.send('Ruta no valida')
}

module.exports = {
    logErrors, clientErrorHandler, errorHandler, invalidPath
}

