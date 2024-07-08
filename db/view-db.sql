\c time_2_climb

\echo '\n *** DEV DB *** \n'

\echo '\n Dev climbs \n'
SELECT * FROM climb;

\echo '\n Dev Walls \n'
SELECT * FROM wall;

----------------------------------

\c time_2_climb_test

\echo '\n *** TEST DB *** \n'

\echo '\n Test Level \n'
SELECT * FROM level;

\echo '\n Test climb \n'
SELECT * FROM climb;

\echo '\n Test Wall \n'
SELECT * FROM wall;
