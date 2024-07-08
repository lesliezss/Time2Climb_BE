const { fetchAllGrades, fetchGrade } = require("../models/grades.models")


exports.getAllGrades = (req, res) => {

    fetchAllGrades().then((grades) => {
        
        res.status(200).send(grades)

    })

    

}

exports.getGrade =(req, res, next) => {

    const {grade_id} = req.params
    
    fetchGrade(grade_id).then((grade)=> {
        res.status(200).send({grade})
    })
    .catch((err) => {
        next(err)
    })

}