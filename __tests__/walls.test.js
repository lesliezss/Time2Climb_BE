const app = require('../app');
const request = require('supertest');
const db = require('../db/connection');
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach( () => seed(testData));
afterAll(async () => await db.end());

describe('Get wall by ID', () => {
    it('Returns correct wall', () => {
        return request(app)
            .get('/api/walls/36')
            .expect(200)
            .then(({body}) => {
                expect(body.wall).toEqual([{
                    id: 36,
                    name: 'The Climbing Works',
                    postcode: 'S8 0UJ',
                    lat: "53.352327",
                    long: "-1.483694",
                    county: 'South Yorkshire'
                }]);
            });
    });
    it('Returns 404 not found for a non existent but valid wall ID', () => {
        return request(app)
            .get('/api/walls/99999')
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toEqual('ID Not Found');
            });
    });
    it('Returns 400 bad request for an invalid wall ID', () => {
        return request(app)
            .get('/api/walls/choccie')
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toEqual('Bad Request');
            });
    });
});

describe('Get walls', () => {
    it('Returns correct number of walls in the correct format', () => {
        return request(app)
            .get('/api/walls')
            .expect(200)
            .then(({body}) => {
                expect(body.walls).toHaveLength(49);
                body.walls.forEach((wall) => {
                    expect(wall).toMatchObject({
                        id: expect.any(Number),
                        name: expect.any(String),
                        postcode: expect.any(String),
                        lat: expect.any(String),
                        long: expect.any(String),
                        county: expect.any(String)
                    })
                });
            });
    });
});

describe('Get walls with user session filter', () => {
    it('Returns correct wall data for the specified user', () => {
        const expected = [
            {
              id: 36,
              name: 'The Climbing Works',
              postcode: 'S8 0UJ',
              lat: '53.352327',
              long: '-1.483694',
              county: 'South Yorkshire',
              session_count: '1'
            },
            {
              id: 32,
              name: 'The Foundry Climbing Centre',
              postcode: 'S3 8EN',
              lat: '53.390414',
              long: '-1.471701',
              county: 'South Yorkshire',
              session_count: '1'
            }
          ];
        return request(app)
            .get('/api/walls/user/1')
            .expect(200)
            .then(({body}) => {
                expect(body.walls.filteredWalls).toHaveLength(47);
                expect(body.walls.userSessionWalls).toHaveLength(2);
            });
    });
});
