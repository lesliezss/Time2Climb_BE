const { getWallByIdQuery, getWallsQuery, getWallsByUserQuery } = require('../models/walls.models');

exports.getWallById = (req, res, next) => {
    return getWallByIdQuery(req.params.id, next)
        .then((result) => {
            if(result) {
                res.status(200).send({wall: result});
            }
        })
        .catch((err) => {
            next(err);
        });;
};

exports.getWalls = ((req, res, next) => {
    return getWallsQuery(next)
        .then((result) => {
            res.status(200).send({walls: result});
        })
        .catch((err) => {
            next(err);
        });
});

exports.getWallsByUser = ((req, res, next) => {
    return getWallsQuery(next)
        .then((result) => {
            return res.status(200).send({walls: result});
        })
        .catch((err) => {
            next(err);
        });
});

