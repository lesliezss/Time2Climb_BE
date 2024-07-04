\c time_2_climb

-- add sql commends here



SELECT * FROM T2Csession;
SELECT * FROM climbs;
SELECT * FROM levels;
SELECT * FROM climb_type;
SELECT * FROM climb_outcomes;
SELECT * FROM grades;
SELECT * FROM grade_system;


SELECT 
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
ON climbs.climb_outcome_id =climb_outcomes.climb_outcome_id;

SELECT 
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
WHERE user_id = 1