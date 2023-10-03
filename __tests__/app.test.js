const app = require("../db/app.js")
const request = require("supertest")
const db = require("../db/connection.js")
const seed = require("../db/seeds/seed.js")
const data = require("../db/data/test-data")
const endPoints = require("../endpoints.json")

beforeEach(() => {
    return seed(data);
})

afterAll(() => {
    return db.end();
})

describe('GET /api/topics', () => {
    test('1. Returns 200 status code', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
    })
    test('2. Returns array of objects with correct properties', () => {
        return request(app)
        .get('/api/topics')
        .then(({body}) => {
            expect(body.topics).toHaveLength(3);
            body.topics.forEach((topic) => {
                expect(typeof(topic.slug)).toBe('string')
                expect(typeof(topic.description)).toBe('string')
            })
        })
    })
    test('3. Should return a 404 error if the endpoint is mis-spelled', () => {
        return request(app)
        .get('/api/topucs')
        .expect(404)
    })
})

describe('GET /api/', () => {
	test('1. Returns expected information from endpoints.json', () => {
		return request(app)
		.get('/api')
		.expect(200)
        .then(({body})=> {
            expect(body.api).toMatchObject(endPoints)
        })
    })
})

describe('GET /api/articles/:article_id', () => {
    test('1. Returns correct article object', () => {
        return request(app)
        .get('/api/articles/3')
        .expect(200)
        .then(({body})=> {
            expect(body.article.author).toBe("icellusedkars")
            expect(body.article.title).toBe("Eight pug gifs that remind me of mitch")
            expect(body.article.article_id).toBe(3)
            expect(body.article.body).toBe("some gifs")
            expect(body.article.topic).toBe("mitch")
            const receivedTimestamp = Date.parse(body.article.created_at);
            expect(receivedTimestamp).toBe(1604394720000);
            expect(body.article.votes).toBe(0)
            expect(body.article.article_img_url).toBe("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700")
        })
    })
    test('2. Returns 404 when given an invalid id which is correctly formatted as a number', () => {
        return request(app)
        .get('/api/articles/459')
        .expect(404)
        .then((res)=> {
            expect(res.status).toBe(404)
        })
    })
    test('3. Returns 400 when given an invalid id, incorrectly formatted as a string ', () => {
        return request(app)
        .get('/api/articles/one')
        .expect(400)
        .then((res)=> {
            expect(res.status).toBe(400)
        })
    })
})

describe.only('GET /api/articles/', () => {
    test('1. Responds with an array of article objects with the correct properties', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body}) => {
            expect(body.articles).toHaveLength(13);
            body.articles.forEach((article) => {
                expect(typeof(article.author)).toBe('string')
                expect(typeof(article.title)).toBe('string')
                expect(typeof(article.article_id)).toBe('number')
                expect(typeof(article.topic)).toBe('string')
                const receivedTimestamp = Date.parse(article.created_at);
                expect(typeof(receivedTimestamp)).toBe('number');
                expect(typeof(article.votes)).toBe('number')
                expect(typeof(article.article_img_url)).toBe('string')
                expect(typeof(article.comment_count)).toBe('string')
            })
        })
    })
    test('2. Should be sorted by date in descending order', () => {
        return request(app)
        .get('/api/articles')
        .then(({body}) => {
            expect(body.articles[0].title).toBe('Eight pug gifs that remind me of mitch')
        })
    });
    test('3. There should not be a body property present on any of the article objects', () => {
        return request(app)
        .get('/api/articles')
        .then(({body}) => {
            body.articles.forEach((article) => {
                expect(article).not.toHaveProperty('body');
        })
    })
})
    test('4. Should return a 404 error if the endpoint is mis-spelled', () => {
    return request(app)
    .get('/api/arcticles')
    .expect(404)
})
});