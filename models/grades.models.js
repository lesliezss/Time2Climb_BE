const db = require("../db/connection");


exports.fetchAllGrades = () => {

    return db.query(`Select * From grade`).then(({ rows }) => {

    
        return rows;
      });

}


exports.fetchGrade = (grade_id) => {

    if(isNaN(grade_id)) return Promise.reject({status: 400, msg: "Bad Request"})

    return db
    .query(`Select * From grade where id = $1 `, [grade_id])
    .then(({rows}) => {
        if(!rows[0]) return Promise.reject({status:404, msg:"Not Found"})
        return rows
    })

}