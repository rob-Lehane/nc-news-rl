const cors = require('cors');
const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controller")
const { getApi } = require("./controllers/api.controller")
const { getArticleById, getArticles, updateArticleVotes } = require("./controllers/articles.controller")
const { handleCustomErrors, handle500Errors, handlePSQLErrors } = require('./controllers/errors.controller');
const { getUsers } = require("./controllers/users.controller");
const { getCommentsByArticle, addNewComment, deleteComment, updateCommentVotes } = require("./controllers/comments.controller");

app.use(cors());

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", getApi);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById)

app.patch("/api/articles/:article_id", updateArticleVotes)

app.get("/api/articles/:article_id/comments", getCommentsByArticle)

app.get("/api/users", getUsers)

app.post("/api/articles/:article_id/comments", addNewComment)

app.delete("/api/comments/:comment_id", deleteComment);

app.patch("/api/comments/:comment_id", updateCommentVotes);

app.all('/*', (req, res, next) => {
    res.status(404).send({msg: 'app not found'})
})

app.use(handlePSQLErrors)
app.use(handleCustomErrors)
app.use(handle500Errors)

module.exports = app;