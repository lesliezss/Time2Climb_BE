const {
  selectClimbsBySessionId,
  selectClimbsByUserId,
  postNewClimbModel,
  patchClimbsModel,
} = require("../models/climbs.models");

exports.getClimbsBySessionId = (req, res, next) => {
  const { session_id } = req.params;
  return selectClimbsBySessionId(session_id)
    .then((climbs) => {
      res.status(200).send({ climbs });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getClimbsByUserId = (req, res, next) => {
  const { user_id } = req.params;
  return selectClimbsByUserId(user_id)
    .then((climbs) => {
      res.status(200).send({ climbs });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postNewClimbController = (req, res, next) => {
  const { session_id, grade_id, climb_type_id, climb_outcome_id } = req.body;
  return postNewClimbModel(
    session_id,
    grade_id,
    climb_type_id,
    climb_outcome_id
  )
    .then((newClimb) => {
      res.status(201).send({ newClimb });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchClimbsController = (req, res, next) => {
  const { climb_id } = req.params;
  const updates = req.body;
  if (Object.keys(updates).length === 0) {
    return Promise.rejected({
      status: 400,
      msg: "No fields provided to update.",
    });
  }
};
