const db = require("../db/connection");

function selectClimbsBySessionId(session_id, next) {
  return db
    .query(`
      SELECT
        c.id, 
        c.session_id, 
        c.grade_id, 
        g.label AS "grade_label", 
        gs.id AS "grade_system_id", 
        gs.label AS "grade_system_label", 
        c.type_id, 
        ct.label AS "type_label", 
        c.climb_outcome_id,
        g.label AS "grade_label",
        gs.label AS "grade_system_label",
        ct.label AS "type_label",
        co.label AS "outcome_label"
      FROM climb AS c
      LEFT JOIN grade AS g
      ON g.id = c.grade_id
      LEFT JOIN grade_system AS gs
      ON g.grade_system_id = gs.id
      LEFT JOIN climb_type AS ct
      ON c.type_id = ct.id 
      LEFT JOIN climb_outcome AS co
      ON c.climb_outcome_id = co.id
      WHERE c.session_id = $1`,
      [session_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No climbs found for session_id: ${session_id}`,
        });
      } else {
        return rows;
      }
    })
    .catch((err) => {
      next(err);
    });
}

function selectClimbsByUserId(user_id, next) {
  return db
    .query(
      `SELECT 
        t2c_session.user_id, 
        climb.id, 
        climb.session_id, 
        climb.grade_id, 
        grade.label AS "grade_label", 
        grade_system.id AS "grade_system_id", 
        grade_system.label AS "grade_system_label", 
        climb.type_id, 
        climb_type.label AS "type_label", 
        climb.climb_outcome_id,
        climb_outcome.label AS "outcome_label"
      FROM climb 
      LEFT JOIN grade 
      ON grade.id = climb.grade_id
      LEFT JOIN grade_system
      ON grade.grade_system_id = grade_system.id
      LEFT JOIN climb_type
      ON climb.type_id=climb_type.id 
      LEFT JOIN climb_outcome
      ON climb.climb_outcome_id = climb_outcome.id
      LEFT JOIN t2c_session ON t2c_session.id = climb.session_id
      WHERE user_id = $1`,
      [user_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No climbs found for user_id: ${user_id}`,
        });
      } else {
        return rows;
      }
    })
    .catch((err) => {
      next(err);
    });
}

function postNewClimbModel(session_id, grade_id, type_id, climb_outcome_id, next) {
  if (!session_id || !grade_id || !type_id || !climb_outcome_id) {
    return Promise.reject({
      status: 400,
      msg: "All fields are required",
    });
  }
  return db
    .query(
      `INSERT INTO climb (session_id, grade_id, type_id, climb_outcome_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [session_id, grade_id, type_id, climb_outcome_id]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      next(err);
    });
}

function patchClimbsModel(climb_id, updates, next) {
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
    WHERE id = $${fields.length + 1}
    RETURNING *;
  `;

  return db.query(query, values).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `No climb found with id: ${climb_id}`,
      });
    }
    return result.rows[0];
  })
  .catch((err) => {
    next(err);
  });
}

function deleteClimbByIdModel(climb_id, next) {
  return db
    .query(`DELETE FROM climb WHERE id = $1`, [climb_id])
    .then((result) => {
      if (result.rowCount === 0) {
        return Promise.reject({
          status: 404,
          msg: `No climb found with id: ${climb_id}`,
        });
      }
      return result;
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  selectClimbsBySessionId,
  selectClimbsByUserId,
  postNewClimbModel,
  patchClimbsModel,
  deleteClimbByIdModel,
};
