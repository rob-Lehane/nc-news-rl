const { fetchCommentsByArticle, postNewComment } = require('../models/comments.model')
const { doesArticleExist } = require('../models/articles.model')

exports.getCommentsByArticle = (req, res, next) => {
    const articleId = +req.params.article_id;
    fetchCommentsByArticle(articleId)
    .then((comments) => {
        res.status(200).send({ comments });
    })
    .catch(next)
};

exports.addNewComment = (req, res, next) => {
    const { article_id } = req.params;
        const { username, body } = req.body;
        postNewComment(article_id, username, body)
            .then((comment) => {
                res.status(201).send({ comment });
            })
            .catch(next)
            };
