const {
  selectAllUserSessions,
  selectUserSession,
  insertSession,
  updateSession,
  removeSession,
  getUserSessionsByWallQuery
} = require("../models/sessions.models");

exports.getAllUserSessions = (req, res, next) => {
  const { user_id } = req.params;
  selectAllUserSessions(user_id)
    .then((userSessions) => {
      res.status(200).send({ userSessions });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUserSessionsByWall = (req, res, next) => {
  const { user_id, wall_id } = req.params;
  selectAllUserSessions(user_id, wall_id)
    .then((userSessions) => {
      res.status(200).send({ userSessions });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUserSession = (req, res, next) => {
  const { session_id } = req.params;
  selectUserSession(session_id)
    .then((userSession) => {
      res.status(200).send({ userSession });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postSessions = (req, res, next) => {
  const { user_id, wall_id, date, duration_minutes } = req.body;
  return insertSession(user_id, wall_id, date, duration_minutes, next)
    .then((newSession) => {
      if (newSession) {
        res.status(201).send({ newSession });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchSessions = (req, res, next) => {
  const { body } = req;
  const { sessions_id } = req.params;

  updateSession(body, sessions_id)
    .then((newSessionInfo) => {
      if (newSessionInfo) {
        res.status(200).send(newSessionInfo);
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteSession = (req, res, next) => {
  const { sessions_id } = req.params;
  removeSession(sessions_id)
    .then((result) => {
      if (result) {
        res.status(204).send();
      }
    })
    .catch((err) => {
      next(err);
    });
};
