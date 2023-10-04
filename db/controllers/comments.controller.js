const { fetchCommentsByArticle, postNewComment } = require('../models/comments.model')
const { doesArticleExist } = require('../models/articles.model')

exports.getCommentsByArticle = (req, res, next) => {
    const articleId = +req.params.article_id;
    if (isNaN(articleId)){
        return res.status(400).send({ message: "ID must be a number" });
    }
    Promise.all([doesArticleExist(articleId), fetchCommentsByArticle(articleId)])
    .then(([articleExists, comments]) => {
        if (!articleExists) {
        res.status(404).send({ message: `Article not found for article ID: ${articleId}` });
    } else {
        res.status(200).send({ comments });
    }
    })
    .catch(next); 
};

exports.addNewComment = (req, res, next) => {
    const articleId = req.params.article_id;
    if (Object.keys(req.body).length < 2) {
        res.status(400).send({ err: 400, msg: 'comment must contain username and body' });
    } else {
        const { username, body } = req.body;
        postNewComment(articleId, username, body)
            .then((comment) => {
                res.status(201).send({ comment });
            })
            .catch(next);
    }
};
