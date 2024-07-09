const { getWallByIdQuery, getWallsQuery, getFilteredWallsQuery, getUserSessionWallsQuery } = require('../models/walls.models');

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

    // Get walls excluding those where the user has sessions
    const walls = getFilteredWallsQuery(req.params.user_id, next)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            next(err);
        });

    // Get only walls where the user has sessions
    const userSessions = getUserSessionWallsQuery(req.params.user_id, next)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            next(err);
        });

    return Promise.all([walls, userSessions])
        .then((results) => {
            return res.status(200).send({ 
                walls: {
                    filteredWalls: results[0],
                    userSessionWalls: results[1]
            }});
        })
        .catch((err) => {
            next(err);
        });
});
