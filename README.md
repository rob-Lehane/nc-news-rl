# Northcoders News API

To access this API, use https://nc-news-repo.onrender.com

# Description

This is a backend API which allows the hosting of news articles, with comments, users and separate topics.

## Getting Started

To clone this repo, run this command:

```
git clone https://github.com/rob-Lehane/nc-news-rl.git
```

To install the necessary dependencies, run the following command:

```
npm install
```

This will install the following dependencies:
- dotenv
- express
- pg
- supertest

and the following dev dependencies:
- jest
- jest-extended
- jest-sorted
- pg-format

To connect to the local databases, please create a .env.development file and a .env.test file.

The databases for these are nc_news and nc_news_test respectively - these should be assigned to PGDATABASE.

## Available endpoints:

```http
GET /api
GET /api/topics
GET /api/articles
GET /api/articles/:article_id
GET /api/articles/:article_id/comments
PATCH /api/articles/:article_id
POST /api/articles/:article_id/comments
DELETE /api/comments/comment_id

```

## Testing

To test the endpoints are working correctly, run the following command:

```
npm t app
```

In order to test the utility functions, run the following command:

```
npm t utils
```

Minimum requirements:
Node.js v18.16.0
Postgres v16
