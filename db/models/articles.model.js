const db = require('../connection')
const doesTopicExist = require('./topics.model')

exports.fetchArticleById = (article_id) => {
    if (isNaN(articleId)){
        return Promise.reject({ status:404, msg: "ID must be a number" });
    }
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({rows}) => {
        if(!rows.length) return Promise.reject({ status: 404, msg: `No article found for article ID: ${article_id}` })
        else return rows[0];
    })
}

exports.fetchArticles = (topic) => {
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
        articles.article_id = comments.article_id`;

    if (topic) {
        query += ` WHERE articles.topic = $1`;
    }

    query += ` GROUP BY
        articles.article_id,
        articles.title,
        articles.author,
        articles.topic,
        articles.created_at,
        articles.votes,
        articles.article_img_url
        ORDER BY
        articles.created_at DESC;`;

    const queryParams = [];
    if (topic) {
        queryParams.push(topic);
    }

    return db.query(query, queryParams)
        .then(({ rows }) => 
        { if(rows.length === 0){
            return Promise.reject({status:404, msg: "topic not found"})
        }
        else return rows;
})
}

exports.doesArticleExist = (article_id) => {
    return db.query(`SELECT 
    * 
    FROM 
    articles
    WHERE
    article_id = $1`, [article_id])
    .then(({rows}) => {
        if (rows.length === 0)
        {return false}
        else return true;
    })
}