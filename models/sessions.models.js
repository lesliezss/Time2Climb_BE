const db = require("../db/connection");

exports.selectAllUserSessions = (user_id) => {
  return db
    .query(`SELECT * FROM t2c_session WHERE user_id = $1;`, [user_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No sessions found for user_id: ${user_id}`,
        });
      }
      return rows;
    });
};

exports.selectUserSession = (session_id) => {
  return db
    .query(`SELECT * FROM T2C_Session WHERE id = $1`, [session_id])
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({
          status: 404,
          msg: `No sessions found for session_id: ${session_id}`,
        });
      return rows;
    });
};

exports.insertSession = (user_id, wall_id, date, duration_minutes, next) => {
  if (!user_id || !wall_id || !date || !duration_minutes) {
    return Promise.reject({ status: 404, msg: "All fields are required" });
  }
  return db
    .query(
      `INSERT INTO T2C_Session (user_id, wall_id, date, duration_minutes) VALUES ($1, $2, $3, $4) RETURNING *;`,
      [user_id, wall_id, date, duration_minutes]
    )
    .then(({ rows }) => {
      return rows[0];
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateSession = (body, sessions_id) => {
  const fields = Object.keys(body);
  const values = Object.values(body);

  if (fields.length === 0) {
    return Promise.reject({
      status: 400,
      msg: "No fields provided to update.",
    });
  }

  const setClause = fields
    .map((field, index) => `${field} = $${index + 1}`)
    .join(", ");

  values.push(sessions_id);

  const query = `
    UPDATE T2C_Session
    SET ${setClause}
    WHERE id = $${fields.length + 1}
    RETURNING *;
  `;

  return db.query(query, values).then((result) => {
    if (!result.rows.length) {
      return Promise.reject({
        status: 404,
        msg: `No climb found with session id: ${sessions_id}`,
      });
    }
    return result.rows[0];
  });
};

exports.removeSession = (sessions_id) => {
  return db
    .query(`DELETE FROM T2C_Session WHERE id = $1 RETURNING *;`, [sessions_id])
    .then((result) => {
        if (result.rowCount === 0) {
            return Promise.reject({
              status: 404,
              msg: `No climb found with id: ${sessions_id}`,
            });
          }
      return result;
    });
};
