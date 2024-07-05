const { selectAllUserSessions, selectUserSession, insertSession } = require("../models/sessions.models")


exports.getAllUserSessions = (req, res, next) => {
    const { user_id } = req.params
    selectAllUserSessions(user_id).then((userSessions) => {
        res.status(200).send({ userSessions })
    })
}

exports.getUserSession = (req, res, next) => {
    const { session_id } = req.params
    selectUserSession(session_id).then((userSession) => {
        res.status(200).send({ userSession })
    })
    .catch((err)=> {
        next(err)
    })
};

exports.postSessions = (req, res, next) => {
    const { user_id, climbing_wall_id, date, duration_minutes } = req.body;
    console.log(climbing_wall_id, date)
    return insertSession(
        user_id,
        climbing_wall_id,
        date,
        duration_minutes
    )
    .then((newSession) => {
        res.status(201).send({ newSession });
    })
    .catch((err) => {
        next(err);
    });
};

