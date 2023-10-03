const { fetchArticleById } = require('../models/articles.model.js')

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