const db = require('../connection')
const { doesTopicExist } = require('./topics.model')

exports.fetchArticleById = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
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

