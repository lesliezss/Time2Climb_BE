const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data"); // connected to index.js

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe("Grades", () => {
  describe("Get All Grades", () => {
    test("should get all grades ", () => {
      return request(app)
        .get(`/api/grades`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(testData.allGradesArray);
        });
    });
  });

  describe("GET /api/grades/:grade_id", () => {
    test("should get grade by grade_id ", () => {
      return request(app)
        .get(`/api/grades/5`)
        .expect(200)
        .then(({ body }) => {
          expect(body.msg).toBe();
        });
    });
  });

  describe('Error Handling', () => {
    test('should respond with 400 for invalid grade_id', () => {
        return request(app)
            .get(`/api/grades/not-a-number`)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Bad Request');
            });
    });

    test('should respond with 404 for non-existent grade_id', () => {
        return request(app)
            .get(`/api/grades/999999`)
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Not Found');
            });
    });
});




});
