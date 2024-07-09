const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data"); // connected to index.js

beforeEach(() => seed(testData));

afterAll(() => db.end());

// SESSIONS

describe("GET /api/sessions/users/:user_id", () => {
    test("status: 200 responds with an array of all users sessions", () => {
        return request(app)
        .get("/api/sessions/users/1")
        .expect(200)
        .then(({body}) => {
            const { userSessions } = body
            expect(userSessions).toHaveLength(2);
            userSessions.forEach((session) => {
                expect(session).toMatchObject({
                    user_id: expect.any(Number),
                    wall_id: expect.any(Number),
                    date: expect.any(String),
                    duration_minutes: expect.any(Number),
                })
            })
        })
    })
})

describe("GET /api/sessions/id", () => {
    test("status: 200 returns an array with one user session", () => {
        return request(app)
        .get("/api/sessions/1")
        .expect(200)
        .then(( { body }) => {
            const { userSession } = body;
            userSession.forEach((session) => {
                expect(session).toMatchObject({
                id: expect.any(Number),
                user_id: expect.any(Number),
                wall_id: expect.any(Number),
                date: expect.any(String),
                duration_minutes: expect.any(Number),  
            })
            })
        })
    })
        })
    test("GET: 400 - returns an error message of 'Invalid Input' when passed an invalid session id", () => {
        return request(app)
        .get("/api/sessions/notAnId")
        .expect(400)
        .then(( { body }) => {
            expect(body.msg).toBe("Invalid Input");
        })
    })
    test("GET: 404, responds with an error message of 'Not found' when passed a session_id that does not exist", () => {
        return request(app)
        .get("/api/sessions/999")
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe("Not found")
        })
    })



    describe("POST /api/sessions", () => {
        test("POST: responds with a 201 status and a newly posted session", () => {
            const newSession = {
            user_id: 2,
            wall_id: 6,
            date: "2023-07-10",
            duration_minutes: 45,
        };
        return request(app)
        .post("/api/sessions")
        .send(newSession)
        .expect(201)
        .then(({ body }) => {
            const { newSession } = body;
            expect(newSession).toMatchObject({
                user_id: expect.any(Number),
                wall_id: expect.any(Number),
                date: expect.any(String),
                duration_minutes: expect.any(Number),
            })
        })
        })
        test("status 400: returns a message of 'Bad Request' when passed an invalid session", () => {
            const newSession = {
                id: 99999999,
                wall_id: 6,
                date: "2023-07-10",
                duration_minutes: 45,
            };
            return request(app)
            .post("/api/sessions")
            .send(newSession)
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Not Found")
            })
        })
    })

describe("PATCH api/sessions/:sessions_id", () => {
    test("status 200: responds with a session object property, details can be changed", () => {
        const updatedSession = {
            user_id: 1,
            wall_id: 3,
            date: "2023-06-11T23:00:00.000Z",
            duration_minutes: 60,
        }
        return request(app)
        .patch("/api/sessions/1")
        .send(updatedSession)
        .expect(200)
        .then(({ body }) => {
            const session = body;
                expect(session).toMatchObject({
                    id: 1,
                    user_id: 1,
                    wall_id: 3,
                    date: "2023-06-10T23:00:00.000Z",
                    duration_minutes: 60,
            })
        })
    })
})


// TO DO: ADD ERROR MESSAGES HERE

describe("DELETE api/sessions/:sessions_id", () => {
    test("DELETE api/sessions/:sessions_id", () => {
      return request(app)
      .delete("/api/sessions/4").expect(204);
    });
  });