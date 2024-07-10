-- \c time_2_climb

-- -- \echo '\n *** DEV DB *** \n'

-- -- \echo '\n Dev climbs \n'
-- -- SELECT * FROM climb;

-- \echo '\n Dev Walls \n'
-- SELECT * FROM wall;

----------------------------------

\c time_2_climb_test

-- \echo '\n *** TEST DB *** \n'

-- -- \echo '\n Test Level \n'
-- -- SELECT * FROM level;

-- \echo '\n Test Wall \n'
-- SELECT * FROM wall;

-- -- \echo '\n Test climb \n'
-- -- SELECT * FROM climb where session_id = 1;

-- -- \echo '\n Session \n'
-- -- SELECT * FROM t2c-session;

-- -- \echo '\n grade \n'
-- -- SELECT * FROM grade;

-- -- \echo '\n grade-system \n'
-- -- SELECT * FROM grade-system;

-- -- \echo '\n climb-type \n'
-- -- SELECT * FROM climb-type;

-- -- \echo '\n climb-outcome \n'
-- -- SELECT * FROM climb-outcome;

-- -- \echo '\n level \n'
-- -- SELECT * FROM level;

-- SELECT * FROM wall;

-- SELECT * FROM t2c_session;

-- SELECT * FROM wall AS w
-- JOIN t2c_session AS s
-- ON s.wall_id = w.id
-- WHERE s.user_id = 1;

-- SELECT * FROM wall AS w
-- WHERE w.id NOT IN (
--   SELECT wall_id FROM t2c_session WHERE user_id = 1
-- );

-- SELECT * FROM wall
--         WHERE id IN (
--             SELECT wall_id FROM t2c_session WHERE user_id = 1
--         );

-- SELECT w.*, COUNT(ts.id) AS session_count
-- FROM wall AS w
-- JOIN t2c_session AS ts
-- ON w.id = ts.wall_id
-- WHERE user_id = 1
-- GROUP BY w.id;

-- select * from climb;

-- select * 
-- from climb
-- where session_id in (SELECT id
--   FROM t2c_session
--   WHERE user_id = 1);

-- SELECT COUNT(id)
-- FROM climb
-- where session_id in (SELECT id
--   FROM t2c_session
--   WHERE user_id = 1);

-- SELECT ts.*, w.name AS wall_name 
-- FROM t2c_session AS ts
-- LEFT JOIN wall AS w
-- ON ts.wall_id = w.id
-- WHERE ts.user_id = 1;

-- \echo '\n user session data 1 \n'
-- WITH session_data AS (
--     SELECT ts.*, w.name AS wall_name 
--     FROM t2c_session AS ts
--     LEFT JOIN wall AS w
--     ON ts.wall_id = w.id
--     WHERE ts.user_id = 1
-- )
-- SELECT c.*, sd.*
-- FROM climb c
-- JOIN session_data sd ON c.session_id = sd.id;

-- \echo '\n user session data 2 \n'
-- SELECT 
--     ts.id AS session_id,
--     ts.user_id,
--     ts.wall_id AS wall_id,
--     ts.date,
--     ts.duration_minutes,
--     w.name AS wall_name,
--     (SELECT COUNT(c.id) 
--      FROM climb c 
--      WHERE c.session_id = ts.id) AS climb_count
-- FROM t2c_session AS ts
-- LEFT JOIN wall AS w
-- ON ts.wall_id = w.id
-- WHERE ts.user_id = 1;

-- SELECT 
--     ts.*,
--     w.name AS wall_name
-- FROM t2c_session AS ts
-- LEFT JOIN wall AS w
-- ON ts.wall_id = w.id
-- WHERE ts.user_id = 1;

SELECT 
  ts.*,
  w.name AS wall_name,
  (SELECT COUNT(c.id) 
  FROM climb c 
  WHERE c.session_id = ts.id) AS climb_count
FROM t2c_session AS ts
LEFT JOIN wall AS w
ON ts.wall_id = w.id
WHERE ts.user_id = 1
AND ts.wall_id = 3;