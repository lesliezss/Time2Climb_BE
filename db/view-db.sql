-- \c time_2_climb

-- add sql commends here

-- SELECT * FROM T2C_Session;

-- \echo '\n *** DEV DB *** \n'
-- \echo '\n Dev climbs \n'
-- SELECT * FROM climbs;
-- \echo '\n Dev Walls \n'
-- SELECT * FROM walls;
-- ----------------------------------
\c time_2_climb_test
\echo '\n *** TEST DB *** \n'
\echo '\n Test Levels \n'
SELECT * FROM level;
\echo '\n Test climbs \n'
SELECT * FROM climbs;
\echo '\n Test Walls \n'
SELECT * FROM wall;