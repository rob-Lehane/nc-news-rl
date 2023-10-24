const { fetchArticleById, fetchArticles, updateArticleVotes } = require('../models/articles.model.js')

exports.getArticles = (req, res, next) => {
    fetchArticles(req.query)
        .then((articles) => {
            res.status(200).send({ articles });
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

exports.updateArticleVotes = (req, res, next) => {
    const articleId = req.params.article_id;
    const { inc_votes } = req.body;
    updateArticleVotes(articleId, inc_votes)
        .then(() => fetchArticleById(articleId))
        .then((article) => {
            if (!article) {
                return Promise.reject({ status: 404, msg: "article not found" });
            }
            res.status(200).send({article});
        })
        .catch(next);
};