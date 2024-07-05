const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data"); // connected to index.js

beforeEach(() => seed(testData));

afterAll(() => db.end());

// USERS
describe("Users", () => {
  describe("Get All Users", () => {
    test("should get all users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          const { users } = body;
          expect(users).toHaveLength(3);
          users.forEach((user) => {
            expect(user).toMatchObject({
              user_id: expect.any(Number),
              first_name: expect.any(String),
              last_name: expect.any(String),
              age: expect.any(Number),
              level_id: expect.any(Number),
            });
          });
        });
    });


// this commented out test is for if we ever wanted to make an endpoint for geting an individual user
    
//     describe.only("Error Handling(Get User)", () => {
//       test("should respond with 404 for non-existent user", () => {
//         const nonExistentUserId = 9999;
//         return request(app)
//           .get(`/api/users/${nonExistentUserId}`)
//           .expect(404)
//           .then(({ body }) => {
//             expect(body.msg).toBe("User not found");
//           });
//       });

//       test("should respond with 400 for invalid input (user_id is not a number)", () => {
//         const invalidUserId = "invalid_id";
//         return request(app)
//           .get(`/api/users/${invalidUserId}`)
//           .expect(400)
//           .then(({ body }) => {
//             expect(body.msg).toBe("Bad Request: Invalid user_id");
//           });
//       });
//     });
  });

  describe("Post User", () => {
    test("should create a new user", () => {
      const newUser = {
        first_name: "John",
        last_name: "Doe",
        age: 28,
        level_id: 2,
      };

      return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .then(({ body }) => {
          const user = body;
          expect(user).toMatchObject({
            user_id: expect.any(Number),
            first_name: "John",
            last_name: "Doe",
            age: 28,
            level_id: 2,
          });
        });
    });

    describe("Error Handling(Post Users)", () => {
      test("should respond with 400 for missing fields", () => {
        const newUser = {
          first_name: "Jane",
          last_name: "Doe",
        };

        return request(app)
          .post("/api/users")
          .send(newUser)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad Request: Missing required fields");
          });
      });

      test("should respond with 400 for incorrect data type for age", () => {
        const newUser = {
          first_name: "Jane",
          last_name: "Doe",
          age: "twenty-eight",
          level_id: 2,
        };

        return request(app)
          .post("/api/users")
          .send(newUser)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad Request: Invalid input");
          });
      });

      test("should respond with 400 for incorrect data type for level_id", () => {
        const newUser = {
          first_name: "Jane",
          last_name: "Doe",
          age: 28,
          level_id: "two",
        };

        return request(app)
          .post("/api/users")
          .send(newUser)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad Request: Invalid input");
          });
      });
    });
  });

  describe("Patch User", () => {
    test("should change user details", () => {
      const updatedUser = {
        first_name: "Chris",
        last_name: "Updated",
        age: 36,
        level_id: 3,
      };

      return request(app)
        .patch("/api/users/1")
        .send(updatedUser)
        .expect(200)
        .then(({ body }) => {
          const user = body;
          expect(user).toMatchObject({
            user_id: 1,
            first_name: "Chris",
            last_name: "Updated",
            age: 36,
            level_id: 3,
          });
        });
    });

    describe("Error Handling(Patch User)", () => {
      test("should respond with 400 for missing fields", () => {
        const updatedUser = {
          first_name: "Chris",
        };

        return request(app)
          .patch("/api/users/1")
          .send(updatedUser)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad Request: Missing required fields");
          });
      });

      test("should respond with 400 for incorrect data type for age", () => {
        const updatedUser = {
          first_name: "Chris",
          last_name: "Updated",
          age: "thirty-six",
          level_id: 3,
        };

        return request(app)
          .patch("/api/users/1")
          .send(updatedUser)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad Request: Invalid input");
          });
      });

      test("should respond with 400 for incorrect data type for level_id", () => {
        const updatedUser = {
          first_name: "Chris",
          last_name: "Updated",
          age: 36,
          level_id: "three",
        };

        return request(app)
          .patch("/api/users/1")
          .send(updatedUser)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad Request: Invalid input");
          });
      });
    });
  });

  describe("Delete User", () => {
    test("should delete user by user_id", () => {
      const user_id = 1;
      return request(app)
        .delete(`/api/users/${user_id}`)
        .expect(204)
        .then(() => {
          return request(app)
            .get(`/api/users/${user_id}`)
            .expect(404)
            .then((response) => {
              expect(response.msg).toBe(undefined);
            });
        });
    });

    describe("Error Handling(Delete User)", () => {
      test("should respond with 400 if user_id is not a number", () => {
        const invalidUserId = "abc";
        return request(app)
          .delete(`/api/users/${invalidUserId}`)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad Request: Invalid user_id");
          });
      });

      test("should respond with 404 if user_id does not exist", () => {
        const nonExistingUserId = 90;
        return request(app)
          .delete(`/api/users/${nonExistingUserId}`)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("User not found");
          });
      });
    });
  });
});

// SESSIONS

//CLIMBS

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
            climb_id: expect.any(Number),
            session_id: expect.any(Number),
            grade_id: expect.any(Number),
            grade_label: expect.any(String),
            grade_system_id: expect.any(Number),
            grade_system_label: expect.any(String),
            climb_type_id: expect.any(Number),
            climb_type_label: expect.any(String),
            climb_outcome_id: expect.any(Number),
            climb_outcome_label: expect.any(String),
          });
        });
      });
  });
  test("status:400, responds with an error message when passed a bad session ID", () => {
    return request(app)
      .get("/api/climbs/notAnId")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid Input");
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
            climb_id: expect.any(Number),
            session_id: expect.any(Number),
            grade_id: expect.any(Number),
            grade_label: expect.any(String),
            grade_system_id: expect.any(Number),
            grade_system_label: expect.any(String),
            climb_type_id: expect.any(Number),
            climb_type_label: expect.any(String),
            climb_outcome_id: expect.any(Number),
            climb_outcome_label: expect.any(String),
          });
        });
      });
  });
  test("status 400, responds with an error message when passed a bad user ID", () => {
    return request(app)
      .get("/api/climbs/users/notAnId")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid Input");
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
      climb_type_id: 4,
      climb_outcome_id: 3,
    };
    return request(app)
      .post("/api/climbs")
      .send(newClimb)
      .expect(201)
      .then(({ body }) => {
        const { newClimb } = body;
        expect(newClimb).toMatchObject({
          climb_id: expect.any(Number),
          session_id: 5,
          grade_id: 15,
          climb_type_id: 4,
          climb_outcome_id: 3,
        });
      });
  });
  test("status 400: responds with an error message when fileds are not filled", () => {
    const newClimb = {
      session_id: 5,
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
      climb_type_id: "four",
      climb_outcome_id: 3,
    };
    return request(app)
      .post("/api/climbs")
      .send(newClimb)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid Input");
      });
  });
});

// describe("PATCH /api/climbs/:climb_id", () => {
//   test("200 PATCH: updates an existing climb nd response with the updated climb", () => {
//     const patchClimb = { grade_id: 2, climb_outcome_id: 1 };
//     return request(app)
//       .patch("/api/climbs/2")
//       .send(patchClimb)
//       .expect(200)
//       .then(({ body }) => {
//         const { updatedClimb } = body;
//         expect(updatedClimb).toMatchObject({
//           climb_id: 2,
//           session_id: 1,
//           grade_id: 2,
//           climb_type_id: 1,
//           climb_outcome_id: 1,
//         });
//       });
//   });
// });
