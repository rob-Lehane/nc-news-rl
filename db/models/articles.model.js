const db = require('../connection')

exports.fetchArticleById = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({rows}) => {
        if(!rows.length) return Promise.reject({ status: 404, msg: `No article found for article ID: ${article_id}` })
        else return rows[0];
    })
}