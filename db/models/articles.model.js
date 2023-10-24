const db = require('../connection')
const { doesTopicExist } = require('./topics.model')

exports.fetchArticleById = (article_id) => {
    return db.query(`SELECT
    articles.*,
    COALESCE(comment_counts.comment_count, 0) AS comment_count
    FROM
    articles
    LEFT JOIN (
    SELECT
    article_id,
    COUNT(*) AS comment_count
    FROM
    comments
    GROUP BY
    article_id
    ) AS comment_counts
    ON
    articles.article_id = comment_counts.article_id
    WHERE
    articles.article_id = $1;`, [article_id])
    .then(({rows}) => {
        if(!rows.length) return Promise.reject({ status: 404, msg: `No article found for article ID: ${article_id}` })
        else return rows[0];
    })
    }

exports.fetchArticles=({topic='%',sort_by='created_at',order='desc'})=>{
        if (![
            'article_id',
            'title',
            'topic',
            'author',
            'created_at',
            'article_img_url'
            ].includes(sort_by) ||
            !['asc','desc'].includes(order)
        ) {
            return Promise.reject({ status: 400, msg: "invalid query" })
        }
        else
        return db.query(`
            SELECT articles.*,
            COALESCE(comment_counts.comment_count, 0) 
            AS comment_count
            FROM articles
            LEFT JOIN (
            SELECT article_id, COUNT(*) AS comment_count
            FROM comments
            GROUP BY article_id
        )   AS comment_counts
            ON articles.article_id = comment_counts.article_id
            WHERE topic LIKE COALESCE('${topic}', topic)
            ORDER BY ${sort_by} ${order};`)
            .then(({rows})=> {
            return rows.length ? rows : 
            Promise.reject({ status: 404, msg: "topic not found"})})
    }


exports.updateArticleVotes = (articleId, inc_votes) => {
    return db.query(
        `UPDATE articles
         SET votes = votes + $1
         WHERE article_id = $2`,
        [inc_votes, articleId]
    );
};