const db = require("../db/connection");

function selectClimbsBySessionId(session_id) {
  return db
    .query(
      `SELECT 
climb.climb_id, 
climb.session_id, 
climb.grade_id, 
grade.grade_label, 
grade_system.grade_system_id, 
grade_system.grade_system_label, 
climb.climb_type_id, 
climb_type.climb_type_label, 
climb.climb_outcome_id,
climb_outcome.climb_outcome_label
FROM climb
LEFT JOIN grade
ON grade.grade_id = climb.grade_id
LEFT JOIN grade_system
ON grade.grade_system = grade_system.grade_system_id
LEFT JOIN climb_type
ON climb.climb_type_id=climb_type.climb_type_id 
LEFT JOIN climb_outcome
ON climb.climb_outcome_id =climb_outcome.climb_outcome_id WHERE session_id =$1`,
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
T2C_Session.user_id, 
climb.climb_id, 
climb.session_id, 
climb.grade_id, 
grade.grade_label, 
grade_system.grade_system_id, 
grade_system.grade_system_label, 
climb.climb_type_id, 
climb_type.climb_type_label, 
climb.climb_outcome_id,
climb_outcome.climb_outcome_label
FROM climb
LEFT JOIN T2C_Session
ON T2C_Ssession.session_id = climb.session_id
LEFT JOIN grade
ON grade.grade_id = climb.grade_id
LEFT JOIN grade_system
ON grade.grade_system = grade_system.grade_system_id
LEFT JOIN climb_type
ON climb.climb_type_id=climb_type.climb_type_id 
LEFT JOIN climb_outcome
ON climb.climb_outcome_id =climb_outcome.climb_outcome_id
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
      `INSERT INTO climb (session_id, grade_id, climb_type_id, climb_outcome_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [session_id, grade_id, climb_type_id, climb_outcome_id]
    )
    .then((result) => {
      return result.rows[0];
    });
}

function patchClimbsModel(climb_id, updates) {
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  if (fields.length === 0) {
    return Promise.reject({
      status: 400,
      msg: "No fields provided to update.",
    });
  }

  const setClause = fields
    .map((field, index) => `${field} = $${index + 1}`)
    .join(", ");

  values.push(climb_id);

  const query = `
    UPDATE climb
    SET ${setClause}
    WHERE climb_id = $${fields.length + 1}
    RETURNING *;
  `;

  return db.query(query, values).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `No climb found with climb_id: ${climb_id}`,
      });
    }
    return result.rows[0];
  });
}

function deleteClimbByIdModel(climb_id) {
  return db
    .query(`DELETE FROM climb WHERE climb_id = $1`, [climb_id])
    .then((result) => {
      if (result.rowCount === 0) {
        return Promise.reject({
          status: 404,
          msg: `No climb found with climb_id: ${climb_id}`,
        });
      }
    });
}

module.exports = {
  selectClimbsBySessionId,
  selectClimbsByUserId,
  postNewClimbModel,
  patchClimbsModel,
  deleteClimbByIdModel,
};
