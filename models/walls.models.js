const db = require('../db/connection');

exports.getWallByIdQuery = ((id, next) => {   
    return db.query(`
        SELECT *
        FROM wall
        WHERE id = $1;`, [id])
    .then(({rows}) =>{
        if (rows.length === 0) {
            return Promise.reject({status: 404, msg: 'ID Not Found'});
        };
        return rows;
    })
    .catch((err) => {
        next(err);
    });
});

exports.getWallsQuery = ((next) => {
    return db.query(`
        SELECT *
        FROM wall
        ORDER BY county, name ASC`)
        .then(({rows}) =>{
            if (rows.length === 0) {
                return Promise.reject({status: 404, msg: 'Not found'});
            };
            return rows;
        })
        .catch((err) => {
            next(err);
        });
});

exports.getWallsByUserQuery = ((user_id, next) => {
    // Returns walls excluding those where the user has sessions
    return db.query(`
        SELECT * FROM wall
        WHERE id NOT IN (
            SELECT wall_id FROM t2c_session WHERE user_id = $1
        );`, [user_id])
        .then(({rows}) =>{
            if (rows.length === 0) {
                return Promise.reject({status: 404, msg: 'Not found'});
            };
            return rows;
        })
        .catch((err) => {
            next(err);
        });
});


