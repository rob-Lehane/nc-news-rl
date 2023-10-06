const { fetchTopics } = require("../models/topics.model.js")

exports.getTopics = (req, res, next) => {
    return fetchTopics().then((topics) => {
        res.status(200).send({topics});
    })
}

// exports.doesTopicExist = (topic) => {
//     return db.query(`SELECT 
//     * 
//     FROM 
//     topics
//     WHERE
//     topic = $1`, [topic])
//     .then(({rows}) => {
//         if (rows.length === 0)
//         {return false}
//         else return true;
//     })
// }