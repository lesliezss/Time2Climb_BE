const db = require('../db/connection')


exports.selectAllUserSessions = (user_id) => {
    return db.query(`SELECT * FROM T2C_Session WHERE user_id = $1;`, [user_id])
    .then(({ rows }) => {
        return rows;
    })
}

exports.selectUserSession = (session_id) => {
    console.log(session_id, "<<< MODELS")
    if (isNaN(session_id)) return Promise.reject({ status: 400, msg: "Invalid Input"})
    return db.query(`SELECT * FROM T2C_Session WHERE id = $1`, [session_id])
    .then(({ rows }) => {
        if (!rows.length) return Promise.reject({ status: 404, msg: "Not found"})
        return rows
    })
};

exports.insertSession = (user_id, wall_id, date, duration_minutes) => {
    if (!user_id || !wall_id || !date || !duration_minutes) {
        return Promise.reject({ status: 404, msg: "Not Found"});
    }
    return db.query(`INSERT INTO T2C_Session (user_id, wall_id, date, duration_minutes) VALUES ($1, $2, $3, $4) RETURNING *;`, [user_id, wall_id, date, duration_minutes])
    .then(({ rows }) => {
        return rows[0]
    })
}


exports.updateSession = (body, id) => {
    if (!body.user_id || !body.wall_id || !body.date || !body.duration_minutes) {
        return Promise.reject({ status: 404, msg: "Not Found"});
    }

    return db.query(
        `UPDATE T2C_Session 
        SET user_id = $2, wall_id = $3, date = $4, duration_minutes = $5 
        WHERE id = $1 
        RETURNING *;`, 
        [id, body.user_id, body.wall_id, body.date, body.duration_minutes]
    )
    .then(({ rows }) => {
        return rows[0];
    });
}



exports.removeSession = (id) => {
    return db.query(`DELETE FROM T2C_Session WHERE id = $1 RETURNING *;`, [id])
    .then(({ rows }) => {
        return rows[0]
    });
};