const { fetchArticleById, fetchArticles, updateArticleVotes } = require('../models/articles.model.js')

exports.getArticles = (req, res, next) => {
    return fetchArticles().then((articles) => {
        res.status(200).send({articles})
    })
    .catch(next);
}

exports.getArticleById = (req, res, next) => {
    const articleId = +req.params.article_id;
    if (isNaN(articleId)){
        return res.status(400).send({ message: "ID must be a number" });
    }
    fetchArticleById(articleId).then((article) => {
        if (article.length === 0){
            return Promise.reject({ status: 404, message: "invalid article ID"})
        }
        res.status(200).send({article});
    })
    .catch(next);
}

exports.updateArticleVotes = (req, res, next) => {
    const articleId = req.params.article_id;
    const { inc_votes } = req.body;

    if (!Number.isInteger(inc_votes)) {
        return res.status(400).send({ msg: "number of votes must be a valid integer" });
    }

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
