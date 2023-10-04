exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.message });
    }
    if (err.code === '22P02' || err.code === '23503') {
        res.status(400).send({ msg: 'bad request!'})
    }
    else {
    next(err)
    }
}

exports.handle404Error = (err, req, res, next) => {
    res.status(404).send({ msg: "url not found" });
  };

exports.handle500Errors = (err, req, res, next) => {
    console.log("500 error in console", err)
    res.status(500).send({ msg: 'internal server error' })
}