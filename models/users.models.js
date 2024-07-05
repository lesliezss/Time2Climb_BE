const db = require("../db/connection");

exports.fetchUsers = () => {
  return db.query(`Select * From T2C_User`).then(({ rows }) => {

    
    return rows;
  });
};

exports.submitUser = (userDetails) => {
  if (Object.keys(userDetails).length !== 4)
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Missing required fields",
    });

  return db
    .query(
      `INSERT INTO T2C_User (first_name, last_name, age, level_id) 
        VALUES ($1, $2, $3, $4)
        Returning *

         `,
      [
        userDetails.first_name,
        userDetails.last_name,
        userDetails.age,
        userDetails.level_id,
      ]
    )
    .then(({ rows }) => {
      
      return rows[0];
    })
    .catch((err) => {
      return Promise.reject({ status: 400, msg: "Bad Request: Invalid input" });
    });
};

exports.updateUser = (userDetails, user_id) => {
  //if (Object.keys(userDetails).length !== 4) return Promise.reject({status:400, msg: "Bad Request: Missing required fields" })

  const keysToCheck = ["first_name", "last_name", "age", "level_id"];

if (!keysToCheck.every(key => Object.keys(userDetails).includes(key))) return Promise.reject({status:400, msg: "Bad Request: Missing required fields" })
   
    const query = `
    UPDATE T2C_User
    SET
        first_name = $2,
        last_name = $3,
        age = $4,
        level_id = $5
    WHERE id = $1
    RETURNING *;
`;
  const values = [
    user_id,
    userDetails.first_name,
    userDetails.last_name,
    userDetails.age,
    userDetails.level_id,
  ];

  return db
    .query(query, values)
    .then(({ rows }) => {
      return rows[0];
    })
    .catch((err) => {
      return Promise.reject({ status: 400, msg: "Bad Request: Invalid input" });
    });
};

exports.removeUser = (user_id) => {
  if (isNaN(user_id))
    return Promise.reject({ status: 400, msg: "Bad Request: Invalid user_id" });

    const query = `
        DELETE FROM T2C_User
        WHERE id = $1
        RETURNING *;
    `;

  return db
    .query(query, [user_id])
    .then(({ rows }) => {
      return rows[0];
    })
    .catch((err) => {
       
        
    });
};
