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
              id: expect.any(Number),
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
            id: expect.any(Number),
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
            id: 1,
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

<<<<<<<< HEAD:__tests__/user.test.js
========
//Grades

>>>>>>>> 3a51b9b6279504ecd1a562135ecf757ef8442d04:__tests__/users.test.js
