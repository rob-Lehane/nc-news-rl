const db = require('../connection');

exports.fetchCommentsByArticle = (article_id) => {
    return doesArticleExist(article_id)
        .then((articleExists) => {
            if (!articleExists) {
                throw { status: 404, message: `Article not found for article ID: ${article_id}` };
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
                })
                .catch((err) => {
                    throw err; 
                });
        })
        .catch((err) => {
            throw err;
        });
};

exports.postNewComment = (article_id, author, body) => {
    if (body.length === 0) {
        throw { status: 400, message: 'Comment cannot be blank' };
    }
    return db.query(`INSERT INTO
        comments (article_id, author, body)
        VALUES ($1, $2, $3)
        RETURNING *`, [article_id, author, body])
        .then(({ rows }) => {
            return rows[0];
        })
        .catch((err) => {
            throw err;
        });
};
