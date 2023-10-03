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