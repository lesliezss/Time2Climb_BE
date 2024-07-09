-- \c time_2_climb

-- \echo '\n *** DEV DB *** \n'

-- \echo '\n Dev climbs \n'
-- SELECT * FROM climb;

-- \echo '\n Dev Walls \n'
-- SELECT * FROM wall;

----------------------------------

\c time_2_climb_test

\echo '\n *** TEST DB *** \n'

-- \echo '\n Test Level \n'
-- SELECT * FROM level;

-- \echo '\n Test Wall \n'
-- SELECT * FROM wall;

-- \echo '\n Test climb \n'
-- SELECT * FROM climb where session_id = 1;

-- \echo '\n Session \n'
-- SELECT * FROM t2c-session;

-- \echo '\n grade \n'
-- SELECT * FROM grade;

-- \echo '\n grade-system \n'
-- SELECT * FROM grade-system;

-- \echo '\n climb-type \n'
-- SELECT * FROM climb-type;

-- \echo '\n climb-outcome \n'
-- SELECT * FROM climb-outcome;

-- \echo '\n level \n'
-- SELECT * FROM level;

SELECT * FROM wall;

SELECT * FROM t2c_session;

SELECT * FROM wall AS w
JOIN t2c_session AS s
ON s.wall_id = w.id
WHERE s.user_id = 1;

SELECT * FROM wall AS w
WHERE w.id NOT IN (
  SELECT wall_id FROM t2c_session WHERE user_id = 1
);




