const db = require('../connection');
const { fetchArticleById } = require('./articles.model');

exports.fetchCommentsByArticle = (article_id) => {
    return fetchArticleById(article_id)
        .then((article) => {
            if (!article) {
                Promise.reject({ status: 404, msg: `Article not found for article ID: ${articleId}` });
            }
            return db.query(`SELECT
                * 
                FROM
                comments
                WHERE 
                article_id = $1
                ORDER BY 
                comments.created_at DESC`, [article_id])
                .then(({ rows }) => {
                    return rows;
                });
        });
};

exports.postNewComment = (article_id, author, body) => {
    if (body.length === 0){
        return Promise.reject({ status: 400, msg: 'bad request!'})
    }
    else {
        return db.query(`INSERT INTO
    comments (article_id, author, body)
    VALUES ($1, $2, $3)
    RETURNING *`, [article_id, author, body])
    .then(({rows}) => {
        return rows[0];
    })
}}

exports.removeComment = (comment_id) => {
    return db.query(`DELETE FROM
                    comments 
                    WHERE 
                    comment_id = $1`,
                    [comment_id])
                    }

exports.doesCommentExist = (comment_id) => {
    return db.query(`SELECT 
    * 
    FROM 
    comments
    WHERE
    comment_id = $1`, [comment_id])
    .then(({rows}) => {
        if (rows.length === 0)
        {return false}
        else return true;
    })
}

exports.updateCommentVotes = (commentId, inc_votes) => {
    return db.query(
        `UPDATE comments
         SET votes = votes + $1
         WHERE comment_id = $2`,
        [inc_votes, commentId]
    )
}
