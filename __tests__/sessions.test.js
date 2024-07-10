const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
beforeEach(() => seed(testData));

afterAll(() => db.end());

// SESSIONS

describe.only("GET /api/sessions/users/:user_id", () => {
  test("status: 200 responds with an array of sessions of a particular user", () => {
    return request(app)
      .get("/api/sessions/users/1")
      .expect(200)
      .then(({ body }) => {
        const { userSessions } = body;
        expect(userSessions).toHaveLength(2);
        userSessions.forEach((session) => {
          expect(session).toMatchObject({
            user_id: expect.any(Number),
            wall_id: expect.any(Number),
            date: expect.any(String),
            duration_minutes: expect.any(Number),
          });
        });
      });
  });
  test("GET: 400 - returns an error message of 'Invalid Input' when passed an invalid user id", () => {
    return request(app)
      .get("/api/sessions/users/notAnId")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("GET: 404, responds with an error message of 'Not found' when passed a user id that does not exist", () => {
    return request(app)
      .get("/api/sessions/users/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No sessions found for user_id: 999");
      });
  });
});

describe.only("GET /api/sessions/users/:user_id/walls/:wall_id", () => {
  test("status: 200 responds with an array of sessions of a particular user and wall", () => {
    return request(app)
      .get("/api/sessions/users/1/walls/3")
      .expect(200)
      .then(({ body }) => {
        const { userWallSessions } = body;
        expect(userWallSessions).toHaveLength(1);
      });
  });
});

describe("GET /api/sessions/id", () => {
  test("status: 200 returns an array with one user session", () => {
    return request(app)
      .get("/api/sessions/1")
      .expect(200)
      .then(({ body }) => {
        const { userSession } = body;
        userSession.forEach((session) => {
          Object.keys(session).length=7,
          expect(session).toMatchObject({
            wall_name:expect.any(String),
            climb_count: expect.any(String),
            id: expect.any(Number),
            user_id: expect.any(Number),
            wall_id: expect.any(Number),
            date: expect.any(String),
            duration_minutes: expect.any(Number),
          });
        });
      });
  });
  test("GET: 400 - returns an error message of 'Invalid Input' when passed an invalid session id", () => {
    return request(app)
      .get("/api/sessions/notAnId")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("GET: 404, responds with an error message of 'Not found' when passed a session_id that does not exist", () => {
    return request(app)
      .get("/api/sessions/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No sessions found for session_id: 999");
      });
  });
});

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
        });
      });
  });
  test("status 400: responds with an error message when fileds are not filled", () => {
    const newSession = {
      user_id: 2,
      wall_id: 6,
      duration_minutes: 45,
    };
    return request(app)
      .post("/api/sessions")
      .send(newSession)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("All fields are required");
      });
  });
  test("status 400: responds with an error message when input is invalid", () => {
    const newSession = {
        user_id: 2,
        wall_id: 6,
        date: "2023-07-10",
        duration_minutes: "haha",
      };
    return request(app)
      .post("/api/sessions")
      .send(newSession)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

describe("PATCH api/sessions/:sessions_id", () => {
  test("status 200: responds with a session object property, details can be changed", () => {
    const updatedSession = {
      user_id: 1,
      wall_id: 3,
      date: "2023-06-11T23:00:00.000Z",
      duration_minutes: 60,
    };
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
        });
      });
  });
  test("status 400: responds with an error message when no updated fields", () => {
    const updatedSession = {};
    return request(app)
    .patch("/api/sessions/1")
    .send(updatedSession)
    .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("No fields provided to update.");
      });
  });
  test("status 400: responds with an error message when passed an invalid session id", () => {
    const updatedSession = {
        user_id: 1,
        wall_id: 3,
        date: "2023-06-11T23:00:00.000Z",
        duration_minutes: 60,
      };
    return request(app)
    .patch("/api/sessions/notAnId")
    .send(updatedSession)
    .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("status 404: responds with an error message when passed a session id that does not in the database", () => {
    const updatedSession = {
        user_id: 1,
        wall_id: 3,
        date: "2023-06-11T23:00:00.000Z",
        duration_minutes: 60,
      };
    return request(app)
    .patch("/api/sessions/999")
    .send(updatedSession)
    .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No climb found with session id: 999");
      });
  });
});


describe("DELETE api/sessions/:sessions_id", () => {
  test("DELETE api/sessions/:sessions_id", () => {
    return request(app).delete("/api/sessions/4").expect(204);
  });
  test("status 400: responds with an error when given an invalid id", () => {
    return request(app)
      .delete("/api/sessions/notAnId")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("status 404: responds with an error when given a climb_id that's not in the database", () => {
    return request(app)
      .delete("/api/sessions/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No climb found with id: 999");
      });
  });
});
