const app = require('../app')
const request = require('supertest')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')//connected to index.js

//jest 

beforeEach(()=>
    seed(testData)
)

afterAll(()=>
    db.end()
)

describe("test",()=>{
    test("test",()=>{
        expect(1).toBe(1)
    })
})