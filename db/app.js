const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controller")
const { getApi } = require("./controllers/api.controller")
const { getArticleById, getArticles } = require("./controllers/articles.controller")
const { handleCustomErrors, handle500Errors, handle404Error } = require('./controllers/errors.controller');
const { getCommentsByArticle, addNewComment } = require("./controllers/comments.controller");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", getApi);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById)

app.get("/api/articles/:article_id/comments", getCommentsByArticle)

app.post("/api/articles/:article_id/comments", addNewComment)

app.all('/*', (req, res, next) => {
    res.status(404).send({msg: 'app not found'})
})

app.use(handle404Error)
app.use(handleCustomErrors)
app.use(handle500Errors)

module.exports = app;