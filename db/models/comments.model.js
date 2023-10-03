const db = require('../connection')

exports.fetchCommentsByArticle = (article_id) => {
    return db.query(`SELECT
    * 
    FROM
    comments
    WHERE 
    article_id = $1
    ORDER BY 
    comments.created_at DESC`, [article_id])
    .then(({rows}) => {
        return rows;
    })
}

exports.postNewComment = (article_id, author, body) => {
    return db.query(`INSERT INTO
    comments (article_id, author, body)
    VALUES ($1, $2, $3)
    RETURNING *`, [article_id, author, body])
    .then(({rows}) => {
        return rows[0].body;
    })
}