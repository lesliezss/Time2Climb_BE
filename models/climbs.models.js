const db = require("../db/connection");

function selectClimbsBySessionId(session_id) {
  return db
    .query(
      `SELECT 
climbs.climb_id, 
climbs.session_id, 
climbs.grade_id, 
grades.grade_label, 
grade_system.grade_system_id, 
grade_system.grade_system_label, 
climbs.climb_type_id, 
climb_type.climb_type_label, 
climbs.climb_outcome_id,
climb_outcomes.climb_outcome_label
FROM climbs
LEFT JOIN grades
ON grades.grade_id = climbs.grade_id
LEFT JOIN grade_system
ON grades.grade_system = grade_system.grade_system_id
LEFT JOIN climb_type
ON climbs.climb_type_id=climb_type.climb_type_id 
LEFT JOIN climb_outcomes
ON climbs.climb_outcome_id =climb_outcomes.climb_outcome_id WHERE session_id =$1`,
      [session_id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({
          status: 404,
          msg: `No climbs found for session_id: ${session_id}`,
        });
      } else {
        return rows;
      }
    });
}

function selectClimbsByUserId(user_id) {
  return db
    .query(
      `SELECT 
T2Csession.user_id, 
climbs.climb_id, 
climbs.session_id, 
climbs.grade_id, 
grades.grade_label, 
grade_system.grade_system_id, 
grade_system.grade_system_label, 
climbs.climb_type_id, 
climb_type.climb_type_label, 
climbs.climb_outcome_id,
climb_outcomes.climb_outcome_label
FROM climbs
LEFT JOIN T2Csession
ON T2Csession.session_id = climbs.session_id
LEFT JOIN grades
ON grades.grade_id = climbs.grade_id
LEFT JOIN grade_system
ON grades.grade_system = grade_system.grade_system_id
LEFT JOIN climb_type
ON climbs.climb_type_id=climb_type.climb_type_id 
LEFT JOIN climb_outcomes
ON climbs.climb_outcome_id =climb_outcomes.climb_outcome_id
        WHERE user_id = $1`,
      [user_id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({
          status: 404,
          msg: `No climbs found for user_id: ${user_id}`,
        });
      } else {
        return rows;
      }
    });
}

function postNewClimbModel(
  session_id,
  grade_id,
  climb_type_id,
  climb_outcome_id
) {
  if (!session_id || !grade_id || !climb_type_id || !climb_outcome_id) {
    return Promise.reject({
      status: 400,
      msg: "All fields are required",
    });
  }
  return db
    .query(
      `INSERT INTO climbs (session_id, grade_id, climb_type_id, climb_outcome_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [session_id, grade_id, climb_type_id, climb_outcome_id]
    )
    .then((result) => {
      return result.rows[0];
    });
}

module.exports = {
  selectClimbsBySessionId,
  selectClimbsByUserId,
  postNewClimbModel,
};
