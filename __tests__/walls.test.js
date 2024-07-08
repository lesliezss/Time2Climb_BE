const app = require('../app');
const request = require('supertest');
const db = require('../db/connection');
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));
afterAll(() => db.end());

// describe('Get wall by ID', () => {
//     it('Returns correct wall', () => {
//         return request(app)
//             .get('/api/walls/3')
//             .expect(200)
//             .then(({body}) => {
//                 expect(body.wall).toEqual({
//                     climbing_wall_id: 3,
//                     climbing_wall_name: 'The Climbing Works',
//                     climbing_wall_postcode: 'S8 0UJ',
//                     climbing_wall_lat: 53.352327,
//                     climbing_wall_long: -1.483694,
//                     climbing_wall_county: 'South Yorkshire'
//                 });
//             });
//     });
//     it('Returns 404 not found for a non existent but valid wall ID', () => {
//         return request(app)
//             .get('/api/walls/99999')
//             .expect(404)
//             .then(({body}) => {
//                 expect(body.msg).toEqual('Not found');
//             });
//     });
//     it('Returns 400 bad request for an invalid wall ID', () => {
//         return request(app)
//             .get('/api/walls/choccie')
//             .expect(400)
//             .then(({body}) => {
//                 expect(body.msg).toEqual('Bad request');
//             });
//     });
// });

describe.only('Get walls', () => {
    it.only('Returns correct number of walls in the correct format', () => {
        return request(app)
            .get('/api/walls')
            .expect(200)
            .then(({body}) => {
                expect(body.walls).toHaveLength(10);
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
    // it('Returns walls in date descending order when no sort_by and no order passed', () => {
    //     return request(app)
    //         .get('/api/walls')
    //         .expect(200)
    //         .then(({body}) => {
    //             expect(body.walls).toBeSortedBy('created_at', {descending: true});
    //         });
    // });
});

// describe('Get walls by user', () => {
//     it('Returns all walls when empty topic is passed', () => {
//         const topic = {topic: ''};
//         return request(app)
//             .get('/api/walls')
//             .send(topic)
//             .expect(200)
//             .then(({body}) => {
//                 expect(body.walls).toHaveLength(5);
//             });
//     });
//     it('Returns the correct number of walls when topic is passed', () => {
//         return request(app)
//             .get('/api/walls?topic=mitch')
//             .expect(200)
//             .then(({body}) => {
//                 expect(body.walls).toHaveLength(4);
//             });
//     });
//     it('Returns 404 not found for an invalid/non-existent topic', () => {
//         return request(app)
//             .get('/api/walls?topic=999')
//             .expect(404)
//             .then(({body}) => {
//                 expect(body.msg).toEqual('Not found');
//             });
//     });
// });
