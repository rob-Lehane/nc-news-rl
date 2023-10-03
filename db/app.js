const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controller")
const { getApi } = require("./controllers/api.controller")
const { getArticleById } = require("./controllers/articles.controller")
const { handleCustomErrors, handle500Errors } = require('./controllers/errors.controller')

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", getApi);

app.get("/api/articles/:article_id", getArticleById)


app.use(handleCustomErrors)
app.use(handle500Errors)

module.exports = app;