const { fetchCommentsByArticle } = require('../models/comments.model')

exports.getCommentsByArticle = (req, res, next) => {
    const articleId = +req.params.article_id;
    if (isNaN(articleId)){
        return res.status(400).send({ message: "ID must be a number" });
    }
    fetchCommentsByArticle(articleId).then((comments) => {
        if (comments.length === 0){
            return Promise.reject({ status: 404, message: "invalid article ID"})
        }
        res.status(200).send({comments})
    })
    .catch(next);
}