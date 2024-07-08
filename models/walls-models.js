const db = require('../db/connection');

exports.getWallByIdQuery = ((id, next) => {   
    return db.query(`
        SELECT *
        FROM wall
        WHERE id = $1;`, [id])
    .then(({rows}) =>{
        if (rows.length === 0) {
            return Promise.reject({status: 404, msg: 'Not Found'});
        };
        return rows;
    })
    .catch((err) => {
        console.log(err, '--err')
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

exports.getWallsByUserQuery = ((next) => {
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


