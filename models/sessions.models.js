const db = require('../db/connection')


exports.selectAllUserSessions = (user_id) => {
    return db.query(`SELECT * FROM T2Csession WHERE user_id = $1;`, [user_id])
    .then(({ rows }) => {
        // console.log(user_id, "USER_ID in models")
        // console.log(rows, "ROWS in models")
        return rows;
    })
}

exports.selectUserSession = (session_id) => {
    return db.query(`SELECT * FROM T2Csession WHERE session_id = $1`, [session_id])
    .then(({ rows }) => {
        return rows
    })
};

exports.insertSession = (user_id, climbing_wall_id, date, duration_minutes) => {
    if (!user_id || !climbing_wall_id || !date || !duration_minutes) {
        return Promise.reject({ status: 404, msg: "Not Found"});
    }
    return db.query(`INSERT INTO T2Csession (user_id, climbing_wall_id, date, duration_minutes) VALUES ($1, $2, $3, $4) RETURNING *`, [user_id, climbing_wall_id, date, duration_minutes])
    .then(({ rows }) => {
        return rows[0]
    })
}