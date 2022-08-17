exports.successResponse = function (req, res, body, status) {
    res.status(status || 200).send({ data: body })
}

exports.errorResponse = function (req, res, error, status) {
    if (error.isBoom) {
        const { output } = error
        res.status(output.statusCode || 502).send(output.payload)
    }
    else {
        res.status(status || 501).send({ error: error })
    }
}