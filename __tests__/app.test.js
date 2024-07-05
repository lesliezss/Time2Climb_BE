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
                date: "2023-06-11T23:00:00.000Z",
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
            expect(body.msg).toBe("Bad Request - not found")
        })
    })
})


    describe.only("POST /api/sessions", () => {
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
                expect(body.msg).toBe("Bad Request - not found")
            })
        })
    })








// describe("PATCH api/sessions/:sessions_id", () => {
//     test("status 200: responds with a session object property", () => {
//         return request(app)
//         .patch("/api/sessions/3")
//         .send({ duration_minutes: 140 })
//         .expect(200)
//         .then(({ body }) => {
//                 expect(body.comment).toMatchObject({
//                     user_id: 2,
//                     climbing_wall_id: 5,
//                     date: "2021-01-09",
//                     duration_minutes: 140,
//             })
//         })
//     })
// })

// TO DO: ADD ERROR MESSAGES HERE

// describe("DELETE api/sessions/:sessions_id", () => {
//     test("DELETE api/sessions/:sessions_id", () => {
//       return request(app)
//       .delete("/api/sessions/4").expect(204);
//     });
//   });





//CLIMBS
