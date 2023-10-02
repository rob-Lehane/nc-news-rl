const { fetchTopics } = require("../models/topics.model.js")

exports.getTopics = (req, res, next) => {
    return fetchTopics().then((topics) => {
        res.status(200).send({topics});
    })
}