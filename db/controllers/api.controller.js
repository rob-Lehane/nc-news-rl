const { fetchApi } = require('../models/api.model')

exports.getApi = (req, res, next) => {
    return fetchApi()
      .then((api) => {
        res.status(200).send({ api });
      })
      .catch(next);
  };