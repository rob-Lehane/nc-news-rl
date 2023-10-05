const { fetchArticleById, fetchArticles } = require('../models/articles.model.js')

exports.getArticles = (req, res, next) => {
    const { topic } = req.query
    fetchArticles(topic).then((articles) => {
        res.status(200).send({articles})
    })
    .catch(next);
}

exports.getArticleById = (req, res, next) => {
    const articleId = +req.params.article_id;
    fetchArticleById(articleId).then((article) => {
        res.status(200).send({article});
    })
    .catch(next);
}

