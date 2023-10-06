const db = require("../connection.js")

exports.fetchTopics = () => {
    return db.query(`SELECT * FROM topics`)
    .then(({rows}) => {
        return rows;
    })
}

exports.doesTopicExist = (topic) => {
    return db.query(`SELECT
    *
    FROM 
    topics
    WHERE slug = $1`, [topic])
    .then(({rows}) => {
        if (rows.length === 0){
        return Promise.reject({ status: 404, msg: "not found" })}
    })
}