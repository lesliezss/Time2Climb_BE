const db = require('../db/connection');

exports.getWallByIdQuery = ((id, next) => {   
    return db.query(`
        SELECT id, name, postcode, lat, long, county
        FROM walls
        WHERE id = $1
        ORDER BY county, name;`, [id])

    .then((results) =>{
        console.log(results,' --result')
        // if (results.rowCount === 0) {
        //     return this.wallExists(id)
        //     .then((exists) => {
        //         if (exists) {
        //             // valid wall with no comments
        //             return [];
        //         }
        //         else {
        //             // invalid wall
        //             return Promise.reject({status: 404, msg: 'Not found'});
        //         }
        //     });
        // }

        // // format created_at date
        // let wall = results.rows[0];
        // const createdAt = moment(new Date(wall.created_at)).format('YYYY-MM-DD HH:mm:ss');
        // wall.created_at = createdAt
        return results;
    })
    .catch((err) => {
        next(err);
    });
});

// exports.wallExists = ((id, next) => {
//     return db.query(`SELECT wall_id
//         FROM walls a
//         WHERE wall_id = $1;`, [id])

//     .then(({rows}) =>{
//         if (rows.length > 0) {
//             return true;
//         }
//         else {
//             return false;
//         }
//     })
//     .catch((err) => {
//         next(err);
//     });
// });

exports.getWallsQuery = ((next) => {
    return db.query(`
        SELECT *
        FROM wall
        ORDER BY county, name`)
        .then(({rows}) =>{
            console.log(rows,'--rows')
            if (rows.length === 0) {
                return Promise.reject({status: 404, msg: 'Not found'});
            };
            return rows;
        })
        .catch((err) => {
            next(err);
        });
});


