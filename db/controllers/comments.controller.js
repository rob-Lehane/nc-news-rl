const { fetchCommentsByArticle, postNewComment, removeComment, doesCommentExist, updateCommentVotes } = require('../models/comments.model')

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


exports.deleteComment = (req, res, next) => {
                const commentId = req.params.comment_id;
                Promise.all([doesCommentExist(commentId), removeComment(commentId)])
                .then(([commentExists]) => {
                    if (!commentExists) {
                        res.status(404).send({ msg: `comment not found for comment ID: ${commentId}` });
                    } else {
                        res.status(204).send();
                    }
                })
                .catch(next); 
            };


exports.updateCommentVotes = (req, res, next) => {
                const commentId = req.params.comment_id;
                const { inc_votes } = req.body;
                updateCommentVotes(commentId, inc_votes)
                    .then((comment) => {
                        console.log("made it to then block")
                        if (!comment) {
                            return Promise.reject({ status: 404, msg: "comment not found" });
                        }
                        res.status(200).send({comment});
                    })
                    .catch(next);
            };