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

exports.fetchArticles = (topic) => {
    if(topic) {
        return doesTopicExist(topic).then(()=> {
            let topicQuery = `SELECT
            articles.article_id,
            articles.title,
            articles.author,
            articles.topic,
            articles.created_at,
            articles.votes,
            articles.article_img_url,
            COUNT(comments.comment_id) AS comment_count
            FROM
            articles
            LEFT JOIN
            comments
            ON
            articles.article_id = comments.article_id
            WHERE articles.topic = $1
            GROUP BY
            articles.article_id,
            articles.title,
            articles.author,
            articles.topic,
            articles.created_at,
            articles.votes,
            articles.article_img_url
            ORDER BY
            articles.created_at DESC;`
            return db.query(topicQuery, [topic])
    })
    }        
    let query = `SELECT
        articles.article_id,
        articles.title,
        articles.author,
        articles.topic,
        articles.created_at,
        articles.votes,
        articles.article_img_url,
        COUNT(comments.comment_id) AS comment_count
        FROM
        articles
        LEFT JOIN
        comments
        ON
        articles.article_id = comments.article_id
        GROUP BY
        articles.article_id,
        articles.title,
        articles.author,
        articles.topic,
        articles.created_at,
        articles.votes,
        articles.article_img_url
        ORDER BY
        articles.created_at DESC;`;
    
    return db.query(query)
        .then(({ rows }) => {
           
        return rows;
})
}

