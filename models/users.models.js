const db = require("../db/connection");

exports.fetchUsers = () => {
  return db.query(`Select * From t2c_user`).then(({ rows }) => {
    return rows;
  });
};

exports.fetchUserByID = (userID) => {
  return db
    .query(`Select * From t2c_user where id = $1`, [userID])
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "User not found" });

      return rows[0];
    });
};

exports.submitUser = (userDetails) => {
  if (Object.keys(userDetails).length !== 5)
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Missing required fields",
    });

  return db
    .query(
      `INSERT INTO t2c_user (first_name, last_name, age, level_id, firebase_id) 
        VALUES ($1, $2, $3, $4, $5)
        Returning *

         `,
      [
        userDetails.first_name,
        userDetails.last_name,
        userDetails.age,
        userDetails.level_id,
        userDetails.firebase_id
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    })
    .catch((err) => {
      return Promise.reject({ status: 400, msg: "Bad Request: Bad Request" });
    });
};

exports.updateUser = (updates, user_id) => {
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

  values.push(user_id);

  const query = `
  UPDATE t2c_user
  SET ${setClause}
  WHERE id = $${fields.length + 1}
  RETURNING *;
`;

  return db
    .query(query, values)
    .then(({ rows }) => {
      return rows[0];
    })
    .catch((err) => {
      return Promise.reject({
        status: 400,
        msg: `Bad Request: PSQL Error (${err.code})`,
      });
    });
};

exports.removeUser = (user_id) => {
  if (isNaN(user_id))
    return Promise.reject({ status: 400, msg: "Bad Request: Invalid user_id" });

  const query = `
        DELETE FROM t2c_user
        WHERE id = $1
        RETURNING *;
    `;

  return db
    .query(query, [user_id])
    .then(({ rows }) => {
      return rows[0];
    })
    .catch((err) => {});
};
