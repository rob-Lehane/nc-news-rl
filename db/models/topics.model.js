const topics = require("../data/test-data/topics");
const db = require("../connection.js")

exports.fetchTopics = () => {
    return db.query(`SELECT * FROM topics`)
    .then(({rows}) => {
        return rows;
    })
}