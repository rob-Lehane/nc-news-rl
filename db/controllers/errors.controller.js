exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.message });
    } else {
    next(err)
    }
}

exports.handle500Errors = (err, req, res, next) => {
    console.log("500 error in console", err)
    res.status(500).send({ msg: 'internal server error' })
}

exports.handlePSQLErrors = (err, req, res, next) => {
    const errorResponses = {
        '22P02': { status: 400, msg: 'invalid data type' },
    };

    const errorResponse = errorResponses[err.code] || next(err);
    res.status(errorResponse.status).send({ msg: errorResponse.msg });
};