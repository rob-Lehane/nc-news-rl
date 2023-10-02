const app = require("../db/app.js")
const request = require("supertest")
const db = require("../db/connection.js")
const seed = require("../db/seeds/seed.js")
const data = require("../db/data/test-data")

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

// gets all topics from /api/topics
// returns an array of topic objects with slug & description properties
// add error handling tests
// test 1: returns 200 status code and array of objects (3 objects)
// error testing: 404? 