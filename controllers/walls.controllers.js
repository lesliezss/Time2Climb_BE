const { getWallByIdQuery, getWallsQuery } = require('../models/walls-models');

// exports.getWallById = (req, res, next) => {
//     console.log(req,'--req')
//     return getWallByIdQuery(req.params.id, next)
//         .then((result) => {
//             res.status(200).send({wall: result});
//         })
//         .catch((err) => {
//             next(err);
//         });;
// };

exports.getWalls = ((req, res, next) => {
    return getWallsQuery(next)
        .then((result) => {
            // if (topic && result.length === 0) {
            //     // topic does not exist
            //     return res.status(404).send({msg: 'Not found'});
            // }
            res.status(200).send({walls: result});
        })
        .catch((err) => {
            next(err);
        });
});

