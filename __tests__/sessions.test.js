const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data"); // connected to index.js

beforeEach(() => seed(testData));

afterAll(() => db.end());

// SESSIONS

// GET api/sessions/users/:user_id (get all of user’s sessions)
// GET api/sessions/:session_id (get a particular user session)
// POST api/sessions/ (add a session)
// PATCH api/sessions/:sessions_id (edit a parituclar user session)
// DELETE api/sessions/:sessions_id (delete a particular user session)

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
                    climbing_wall_id: expect.any(Number),
                    date: expect.any(String),
                    duration_minutes: expect.any(Number),
                })
            })
        })
    })
})

describe("GET /api/sessions/session_id", () => {
    test("status: 200 returns an array with one user session", () => {
        return request(app)
        .get("/api/sessions/1")
        .expect(200)
        .then(( { body }) => {
            const { userSession } = body;
            userSession.forEach((session) => {
                expect(session).toMatchObject({
                session_id: expect.any(Number),
                user_id: expect.any(Number),
                climbing_wall_id: expect.any(Number),
                date: expect.any(String),
                duration_minutes: expect.any(Number),  
            })
            })
        })
    })
    test("status: 200 returns an array a specific array with one user session", () => {
        return request(app)
        .get("/api/sessions/1")
        .expect(200)
        .then(({ body }) => {
            const { userSession } = body;
            userSession.forEach((session) => {
            expect(session).toEqual({
                session_id: 1,
                user_id: 1,
                climbing_wall_id: 3,
                date: "2023-06-10T23:00:00.000Z",
                duration_minutes: 60,   
            })
            })
        })
    })
})

//TO DO: Error handling for GET to check 

describe("ERRORS - GET /api/sessions/:session_id", () => {
    test("GET: 400 - returns an error message of 'Bad Request' when passed an invalid session_id", () => {
        return request(app)
        .get("/api/sessions/invalidSessionId")
        .expect(400)
        .then(( { body }) => {
            expect(body.msg).toBe("Bad Request")
        })
    })
})


    describe("POST /api/sessions", () => {
        test("responds with a 201 status and a newly posted session", () => {
            const newSession = {
            user_id: 2,
            climbing_wall_id: 6,
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
                climbing_wall_id: expect.any(Number),
                date: expect.any(String),
                duration_minutes: expect.any(Number),
            })
        })
        })
        test("status 400: returns a message of 'Bad Request' when passed an invalid session", () => {
            const newSession = {
                climbing_wall_id: 6,
                date: "2023-07-10",
                duration_minutes: 45,
            };
            return request(app)
            .post("/api/sessions")
            .send(newSession)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Bad Request")
            })
        })
    })

    // describe("Error Handling(Post Users)", () => {
    //     test("should respond with 400 for missing fields", () => {
    //       const newUser = {
    //         first_name: "Jane",
    //         last_name: "Doe",
    //       };
  
    //       return request(app)
    //         .post("/api/users")
    //         .send(newUser)
    //         .expect(400)
    //         .then(({ body }) => {
    //           expect(body.msg).toBe("Bad Request: Missing required fields");
    //         });
    //     });
  
    //     test("should respond with 400 for incorrect data type for age", () => {
    //       const newUser = {
    //         first_name: "Jane",
    //         last_name: "Doe",
    //         age: "twenty-eight",
    //         level_id: 2,
    //       };
  
    //       return request(app)
    //         .post("/api/users")
    //         .send(newUser)
    //         .expect(400)
    //         .then(({ body }) => {
    //           expect(body.msg).toBe("Bad Request: Invalid input");
    //         });
    //     });
  
    //     test("should respond with 400 for incorrect data type for level_id", () => {
    //       const newUser = {
    //         first_name: "Jane",
    //         last_name: "Doe",
    //         age: 28,
    //         level_id: "two",
    //       };
  
    //       return request(app)
    //         .post("/api/users")
    //         .send(newUser)
    //         .expect(400)
    //         .then(({ body }) => {
    //           expect(body.msg).toBe("Bad Request: Invalid input");
    //         });
    //     });
    //   });
    // });



















describe("PATCH api/sessions/:sessions_id", () => {
    test("status 200: responds with a session object property, details can be changed", () => {
        const updatedSession = {
            user_id: 1,
            climbing_wall_id: 3,
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
                    session_id: 1,
                    user_id: 1,
                    climbing_wall_id: 3,
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
