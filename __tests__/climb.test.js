const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe("GET api/climbs/:session_id", () => {
  test("200 GET: response with an array of climbs at a particular session", () => {
    return request(app)
      .get("/api/climbs/1")
      .expect(200)
      .then(({ body }) => {
        const { climbs } = body;
        expect(climbs.length).toBe(2);
        climbs.forEach((climb) => {
          expect(climb).toMatchObject({
            id: expect.any(Number),
            session_id: expect.any(Number),
            grade_id: expect.any(Number),
            grade_label: expect.any(String),
            grade_system_id: expect.any(Number),
            grade_system_label: expect.any(String),
            type_id: expect.any(Number),
            type_label: expect.any(String),
            climb_outcome_id: expect.any(Number),
            outcome_label: expect.any(String),
          });
        });
      });
  });
  test("status:400, responds with an error message when passed a bad session ID", () => {
    return request(app)
      .get("/api/climbs/notAnId")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("status 404, responds with an error message when passed a session_id that's not in the database", () => {
    return request(app)
      .get("/api/climbs/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No climbs found for session_id: 999");
      });
  });
});

describe("GET /api/climbs/users/:user_id", () => {
  test("200 GET: response with an array of climbs of a particular user", () => {
    return request(app)
      .get("/api/climbs/users/1")
      .expect(200)
      .then(({ body }) => {
        const { climbs } = body;
        expect(climbs.length).toBe(4);
        climbs.forEach((climb) => {
          expect(climb).toMatchObject({
            user_id: expect.any(Number),
            id: expect.any(Number),
            session_id: expect.any(Number),
            grade_id: expect.any(Number),
            grade_label: expect.any(String),
            grade_system_id: expect.any(Number),
            grade_system_label: expect.any(String),
            type_id: expect.any(Number),
            type_label: expect.any(String),
            climb_outcome_id: expect.any(Number),
            outcome_label: expect.any(String),
          });
        });
      });
  });
  test("status 400, responds with an error message when passed a bad user ID", () => {
    return request(app)
      .get("/api/climbs/users/notAnId")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("status 404, responds with an error message when passed a session_id that's not in the database", () => {
    return request(app)
      .get("/api/climbs/users/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No climbs found for user_id: 999");
      });
  });
});

describe("POST /api/climbs", () => {
  test("201 POST: add a climb for a user, response with the posted climb", () => {
    const newClimb = {
      session_id: 5,
      grade_id: 15,
      type_id: 4,
      climb_outcome_id: 3,
    };
    return request(app)
      .post("/api/climbs")
      .send(newClimb)
      .expect(201)
      .then(({ body }) => {
        const { newClimb } = body;
        expect(newClimb).toMatchObject({
          id: expect.any(Number),
          session_id: 5,
          grade_id: 15,
          type_id: 4,
          climb_outcome_id: 3,
        });
      });
  });
  test("status 400: responds with an error message when fileds are not filled", () => {
    const newClimb = {
      id: 5,
      grade_id: 15,
      climb_outcome_id: 3,
    };
    return request(app)
      .post("/api/climbs")
      .send(newClimb)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("All fields are required");
      });
  });
  test("status 400: responds with an error message when input is invalid", () => {
    const newClimb = {
      session_id: 5,
      grade_id: 15,
      type_id: "four",
      climb_outcome_id: 3,
    };
    return request(app)
      .post("/api/climbs")
      .send(newClimb)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

describe("PATCH /api/climbs/:climb_id", () => {
  test("200 PATCH: updates an existing climb and response with the updated climb", () => {
    const patchClimb = { grade_id: 2, climb_outcome_id: 1 };
    return request(app)
      .patch("/api/climbs/2")
      .send(patchClimb)
      .expect(200)
      .then(({ body }) => {
        const { updatedClimb } = body;
        expect(updatedClimb).toMatchObject({
          id: 2,
          session_id: 1,
          grade_id: 2,
          type_id: 1,
          climb_outcome_id: 1,
        });
      });
  });
  test("status 400: responds with an error message when no updated fields", () => {
    const patchClimb = {};
    return request(app)
      .patch("/api/climbs/3")
      .send(patchClimb)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("No fields provided to update.");
      });
  });
  test("status 400: responds with an error message when passed an invalid climb id", () => {
    const patchClimb = { grade_id: 2, climb_outcome_id: 1 };
    return request(app)
      .patch("/api/climbs/notAnId")
      .send(patchClimb)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("status 404: responds with an error message when passed a climb id that does not in the database", () => {
    const patchClimb = { grade_id: 2, climb_outcome_id: 1 };
    return request(app)
      .patch("/api/climbs/999")
      .send(patchClimb)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No climb found with id: 999");
      });
  });
});

describe("DELETE /api/climbs/:climb_id", () => {
  test("204 DELETE: delete an existing climb by climb_id", () => {
    return request(app).delete("/api/climbs/3").expect(204);
  });
  test("status 400: responds with an error when given an invalid id", () => {
    return request(app)
      .delete("/api/climbs/notAnId")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("status 404: responds with an error when given a climb_id that's not in the database", () => {
    return request(app)
      .delete("/api/climbs/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No climb found with id: 999");
      });
  });
});
