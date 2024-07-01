Drop if exists Time2Climb
CREATE DATABASE Time2Climb

\c time2climb

Drop Table if exists levels
CREATE TABLE IF NOT EXISTS levels (
    level_id INT PRIMARY KEY,
    level_label VARCHAR(50)
);


INSERT INTO levels (level_id, level_label) VALUES
(1, 'Novice'),
(2, 'Beginner'),
(3, 'Intermediate'),
(4, 'Elite'),
(5, 'Super-elite');

Drop Table if exists 
CREATE TABLE IF NOT EXISTS climb_type (
    climb_type_id INT PRIMARY KEY,
    climb_type_label VARCHAR(50)
);

INSERT INTO climb_type (climb_type_id, climb_type_label) VALUES
(1, 'boulder (v-grade)'),
(2, 'boulder (font)'),
(3, 'top_rope'),
(4, 'lead'),
(5, 'auto-belay');

CREATE TABLE IF NOT EXISTS climb_outcomes (
    climb_outcome_id INT PRIMARY KEY,
    climb_outcome_label VARCHAR(50)
);

-- Step 2: Insert Data into the Table
INSERT INTO climb_outcomes (climb_outcome_id, climb_outcome_label) VALUES
(1, 'Onsight (first attempt - no beta)'),
(2, 'Flash (first attempt - with beta)'),
(3, 'Redpoint (multiple attempts)'),
(4, 'Repeat ascent'),
(5, 'Still working on it');

CREATE TABLE IF NOT EXISTS grades (
    grade_id INT PRIMARY KEY,
    grade_label VARCHAR(10),
    grade_system INT
);

DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM grades WHERE grade_id = 1) THEN
      INSERT INTO grades (grade_id, grade_label, grade_system) VALUES
      (1, '3', 1),
      (2, '3+', 1),
      (3, '4', 1),
      (4, '4+', 1),
      (5, '5', 1),
      (6, '5+', 1),
      (7, '6A', 1),
      (8, '6A+', 1),
      (9, '6B', 1),
      (10, '6B+', 1),
      (11, '6C', 1),
      (12, '6C+', 1),
      (13, '7a', 1),
      (14, '7a+', 1),
      (15, '7b', 1),
      (16, '7b+', 1),
      (17, '7c', 1),
      (18, '7c+', 1),
      (19, '8a', 1),
      (20, '8a+', 1),
      (21, '8b', 1),
      (22, '8b+', 1),
      (23, 'VB-', 2),
      (24, 'VB', 2),
      (25, 'VB+', 2),
      (26, 'V0-', 2),
      (27, 'V0', 2),
      (28, 'V0+', 2),
      (29, 'V1', 2),
      (30, 'V2', 2),
      (31, 'V3', 2),
      (32, 'V4', 2),
      (33, 'V5', 2),
      (34, 'V6', 2),
      (35, 'V7', 2),
      (36, 'V8', 2),
      (37, 'V9', 2),
      (38, 'V10', 2),
      (39, 'V11', 2),
      (40, 'V12', 2),
      (41, 'V13', 2),
      (42, '3', 3),
      (43, '3+', 3),
      (44, '4', 3),
      (45, '4+', 3),
      (46, '5', 3),
      (47, '5+', 3),
      (48, '6a', 3),
      (49, '6a+', 3),
      (50, '6b', 3),
      (51, '6b+', 3),
      (52, '6c', 3),
      (53, '6c+', 3),
      (54, '7a', 3),
      (55, '7a+', 3),
      (56, '7b', 3),
      (57, '7b+', 3),
      (58, '7c', 3),
      (59, '7c+', 3),
      (60, '8a', 3),
      (61, '8a+', 3);
   END IF;
END $$;

CREATE TABLE IF NOT EXISTS grade_system (
    grade_system_id INT PRIMARY KEY,
    grade_system_label VARCHAR(50)
);

INSERT INTO grade_system (grade_system_id, grade_system_label) VALUES
      (1, 'Sport'),
      (2, 'V'),
      (3, 'Font');


CREATE TABLE IF NOT EXISTS walls (
    climbing_wall_id SERIAL PRIMARY KEY,
    climbing_wall_name VARCHAR(100),
    climbing_wall_postcode VARCHAR(20),
    climbing_wall_lat NUMERIC(10, 6),
    climbing_wall_long NUMERIC(10, 6),
    climbing_wall_county VARCHAR(50)
);

INSERT INTO walls (climbing_wall_name, climbing_wall_postcode, climbing_wall_lat, climbing_wall_long, climbing_wall_county) VALUES

      ('Virgin Active', 'S8 0XQ', 53.35936, -1.478335, 'South Yorkshire'),
      ('The Matrix', 'S10 2TY', 53.382144, -1.496608, 'South Yorkshire'),
      ('The Climbing Works', 'S8 0UJ', 53.352327, -1.483694, 'South Yorkshire'),
      ('The Foundry Climbing Centre', 'S3 8EN', 53.390414, -1.471701, 'South Yorkshire'),
      ('The Climbing Hangar Sheffield', 'S3 8EN', 53.390414, -1.471701, 'South Yorkshire'),
      ('The Depot Climbing Centre, Sheffield', 'S9 3LQ', 53.384864, -1.439415, 'South Yorkshire'),
      ('The Adventure Hub', 'S33 0AL', 53.341322, -1.701711, 'Derbyshire'),
      ('Healthy Living centre', 'S43 3XR', 53.265722, -1.352874, 'Derbyshire'),
      ('Fairfield Community Centre', 'SK17 6SX', 53.28423, -1.953013, 'Derbyshire'),
      ('White Hall Centre', 'SK13 8PN', 53.443433, -1.946576, 'Derbyshire'),
      ('Glossop Leisure Centre', 'SK13 8PN', 53.443433, -1.946576, 'Derbyshire'),
      ('Westfield Folkhouse', 'NG18 1TL', 53.148291, -1.202161, 'Nottinghamshire'),
      ('The Mill', 'NG17 4PA', 53.129282, -1.228576, 'Nottinghamshire'),
      ('Wirksworth Leisure Centre', 'DE4 4JG', 53.077623, -1.571366, 'Derbyshire'),
      ('The Bouldering Asylum', 'NG17 5LD', 53.123194, -1.233751, 'Nottinghamshire'),
      ('Longdendale Recreation Centre', 'SK14 6PJ', 53.4551, -2.01666, 'Greater Manchester'),
      ('FREEKLIME', 'HD1 6RX', 53.646771, -1.772642, 'West Yorkshire'),
      ('Silcoates School', 'WF2 0PD', 53.694621, -1.530601, 'West Yorkshire'),
      ('Rope Race Climbing Centre', 'SK6 7HX', 53.385335, -2.064474, 'Greater Manchester'),
      ('The Ridge Climbing Centre', 'SK6 7HX', 53.385335, -2.064474, 'Greater Manchester'),
      ('ROKT Climbing Gym', 'HD6 1EY', 53.700229, -1.780761, 'West Yorkshire'),
      ('Awesome Walls Climbing Centre, Stockport', 'SK6 2BP', 53.413769, -2.133811, 'Greater Manchester'),
      ('Substation Climbing, Yoga & Café', 'SK10 2BN', 53.269177, -2.118289, 'Cheshire'),
      ('The Chapel, Macclesfield', 'SK11 7JB', 53.252107, -2.118826, 'Cheshire'),
      ('Upper Limits', 'ST13 6EU', 53.107212, -2.009863, 'Staffordshire'),
      ('Macclesfield Leisure Centre', 'SK10 4AF', 53.270747, -2.1598, 'Cheshire'),
      ('BlocHaus Climbing', 'M11 2FB', 53.474798, -2.183451, 'Greater Manchester'),
      ('Leeds City Bloc', 'LS10 1NT', 53.785324, -1.533854, 'West Yorkshire'),
      ('BIG Depot Leeds', 'LS12 6BY', 53.784062, -1.576409, 'West Yorkshire'),
      ('Last Sun Dance', 'LS9 0TN', 53.789286, -1.499795, 'West Yorkshire'),
      ('University of Derby Climbing Wall', 'DE22 1GB', 52.938473, -1.496678, 'Derbyshire'),
      ('Parthian Climbing Manchester', 'M12 5ND', 53.469307, -2.204818, 'Greater Manchester'),
      ('The Climbing Lab', 'LS4 2AZ', 53.803682, -1.579389, 'West Yorkshire'),
      ('The Climbing Unit', 'DE21 6YZ', 52.924779, -1.451111, 'Derbyshire'),
      ('Leeds University Department of Physical Education', 'LS2 9JT', 53.807958, -1.553329, 'West Yorkshire'),
      ('Nottingham Climbing Centre', 'NG7 6AT', 52.970282, -1.170241, 'Nottinghamshire'),
      ('Depot Climbing Pudsey', 'LS28 6AA', 53.803329, -1.666498, 'West Yorkshire'),
      ('New Dimension', 'OL11 2HJ', 53.59965, -2.149768, 'Greater Manchester'),
      ('The Climbing Hub', 'BD7 2BR', 53.78419, -1.78447, 'West Yorkshire'),
      ('Bradford University Sports Centre', 'BD7 1DP', 53.791584, -1.763774, 'West Yorkshire'),
      ('Hollingworth Lake WAC', 'OL15 9JQ', 53.658455, -2.092265, 'Greater Manchester'),
      ('Nottingham High School', 'NG7 4ED', 52.962487, -1.15982, 'Nottinghamshire'),
      ('Ellis Brigham Shop', 'M3 4NF', 53.476099, -2.254121, 'Greater Manchester'),
      ('Alter-rock Climbing Centre', 'DE23 8LU', 52.908449, -1.469815, 'Derbyshire'),
      ('Vertical Chill Indoor Ice Wall, Manchester', 'M3 2QS', 53.481082, -2.248304, 'Greater Manchester'),
      ('Rock Over Climbing - Manchesters Bouldering Centre', 'M3 1LN', 53.490989, -2.246671, 'Greater Manchester'),
      ('The Depot Climbing Centre, Nottingham', 'NG1 1EU', 52.956346, -1.142996, 'Nottinghamshire'),
      ('University of Nottingham Climbing Wall', 'NG7 2RD', 52.940521, -1.191193, 'Nottinghamshire'),
      ('Beckett Park Sports Centre (was Carnegie College)', 'LS6 3QS', 53.826337, -1.59075, 'West Yorkshire'),
      ('Broughton Recreation Centre', 'M7 1ZT', 53.497716, -2.262767, 'Greater Manchester');


   CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age INT,
    level_id INT,
    -- Add foreign key constraint if needed
    -- FOREIGN KEY (level_id) REFERENCES levels(level_id)
    -- Uncomment and modify the line above if you have a "levels" table with corresponding level_id
);   

 INSERT INTO users (user_id, first_name, last_name, age, level_id) VALUES
      (1, 'Chris', 'Damm', 35, 3),
      (2, 'Jolly', 'Tall', 43, 4),
      (3, 'Shauna', 'Coxsey', 31, 5);


CREATE TABLE IF NOT EXISTS T2Csession (
    session_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    climbing_wall_id INT NOT NULL,
    date DATE NOT NULL,
    duration_minutes INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (climbing_wall_id) REFERENCES walls(climbing_wall_id)
);


INSERT INTO T2Csession (user_id, climbing_wall_id, date, duration_minutes) VALUES
      (1, 3, '2023-06-12', 60),
      (3, 3, '2022-02-11', 70),
      (2, 5, '2021-01-09', 150),
      (1, 4, '2022-05-05', 50),
      (2, 6, '2023-04-07', 200);


CREATE TABLE IF NOT EXISTS climbs (
    climb_id SERIAL PRIMARY KEY,
    session_id INT NOT NULL,
    grade_id INT NOT NULL,
    climb_type_id INT NOT NULL,
    climb_outcome_id INT NOT NULL,
    FOREIGN KEY (session_id) REFERENCES sessions(session_id),
    FOREIGN KEY (grade_id) REFERENCES grades(grade_id),
    FOREIGN KEY (climb_type_id) REFERENCES climb_type(climb_type_id),
    FOREIGN KEY (climb_outcome_id) REFERENCES climb_outcomes(climb_outcome_id)
);

 INSERT INTO climbs (climb_id, session_id, grade_id, climb_type_id, climb_outcome_id) VALUES
      (1, 1, 51, 2, 1),
      (2, 1, 34, 1, 2),
      (3, 4, 15, 4, 3),
      (4, 4, 12, 5, 2),
      (5, 2, 59, 2, 3),
      (6, 2, 40, 1, 5),
      (7, 2, 22, 4, 1),
      (8, 3, 22, 4, 2),
      (9, 3, 37, 1, 3),
      (10, 3, 15, 4, 5),
      (11, 5, 8, 3, 2),
      (12, 5, 18, 3, 1),
      (13, 5, 16, 5, 4);