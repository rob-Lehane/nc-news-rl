const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controller")
const { getApi } = require("./controllers/api.controller")

app.get("/api/topics", getTopics);

app.get("/api", getApi);

module.exports = app;