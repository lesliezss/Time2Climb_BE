// const app = require('../app')
// const request = require('supertest')
// const db = require('../db/connection')
// const seed = require('../db/seeds/seed')
// const testData = require('../db/data/test-data')

// beforeEach(() => seed(testData));
// afterAll(() => db.end());

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

// describe('Get walls', () => {
//     it('Returns correct number of walls in the correct format', () => {
//         return request(app)
//             .get('/api/walls')
//             .expect(200)
//             .then(({body}) => {
//                 expect(body.walls).toHaveLength(5);
//                 body.walls.forEach((wall) => {
//                     expect(wall).toMatchObject({
//                         wall_id: expect.any(Number),
//                         title: expect.any(String),
//                         topic: expect.any(String),
//                         author: expect.any(String),
//                         created_at: expect.any(String),
//                         votes: expect.any(Number),
//                         wall_img_url: expect.any(String),
//                         comment_count: expect.any(Number)
//                     })
//                 });
//             });
//     });
//     it('Returns walls in date descending order when no sort_by and no order passed', () => {
//         return request(app)
//             .get('/api/walls')
//             .expect(200)
//             .then(({body}) => {
//                 expect(body.walls).toBeSortedBy('created_at', {descending: true});
//             });
//     });
//     it('Returns walls sorted by specified column in descending order when no order passed', () => {
//         return request(app)
//             .get('/api/walls?sort_by=author')
//             .expect(200)
//             .then(({body}) => {
//                 expect(body.walls).toBeSortedBy('author', {descending: true});
//             });
//     });
//     it('Returns walls sorted by specified column in the specified order', () => {
//         return request(app)
//             .get('/api/walls?sort_by=title&order=asc')
//             .expect(200)
//             .then(({body}) => {
//                 expect(body.walls).toBeSortedBy('title', {ascending: true});
//             });
//     });
//     it('Returns walls sorted by date in the specified order when no sort_by passed', () => {
//         return request(app)
//             .get('/api/walls?order=asc')
//             .expect(200)
//             .then(({body}) => {
//                 expect(body.walls).toBeSortedBy('created_at', {ascending: true});
//             });
//     });
// });

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
