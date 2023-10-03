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