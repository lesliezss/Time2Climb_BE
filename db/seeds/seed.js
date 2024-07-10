const format = require("pg-format");
const db = require("../connection");

const seed = ({ usersData, T2CsessionData, climbsData }) => {
  return db
    .query(`DROP TABLE IF EXISTS climb CASCADE;`)
    .then(() => {
      return db.query(`DROP SEQUENCE IF EXISTS level_id_seq CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP SEQUENCE IF EXISTS grade_system_id_seq CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP SEQUENCE IF EXISTS grade_id_seq CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP SEQUENCE IF EXISTS climb_type_id_seq CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP SEQUENCE IF EXISTS climb_outcome_id_seq CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP SEQUENCE IF EXISTS wall_id_seq CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP SEQUENCE IF EXISTS t2c_user_id_seq CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP SEQUENCE IF EXISTS t2c_session_id_seq CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP SEQUENCE IF EXISTS climb_id_seq CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS t2c_session CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS wall CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS t2c_user CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS climb_type CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS climb_outcome CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS grade CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS grade_system CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS level CASCADE;`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE level (
          id SERIAL PRIMARY KEY,
          label VARCHAR(50)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE grade_system (
          id SERIAL PRIMARY KEY,
          label VARCHAR(50)
        );
      `);
      
    })
    .then(() => {
      return db.query(`
        CREATE TABLE grade (
          id SERIAL PRIMARY KEY,
          label VARCHAR(10),
          grade_system_id INT,
          FOREIGN KEY (grade_system_id) REFERENCES grade_system(id) ON DELETE CASCADE
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE climb_type (
          id SERIAL PRIMARY KEY,
          label VARCHAR(50)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE climb_outcome (
          id SERIAL PRIMARY KEY,
          label VARCHAR(50)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE wall (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100),
          postcode VARCHAR(20),
          lat NUMERIC(10, 6),
          long NUMERIC(10, 6),
          county VARCHAR(50)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE t2c_user (
          id SERIAL PRIMARY KEY,
          first_name VARCHAR(50) NOT NULL,
          last_name VARCHAR(50) NOT NULL,
          age INT,
          bio VARCHAR(150),
          img_url VARCHAR(100),
          firebase_id VARCHAR(50) NOT NULL,
          level_id INT,
          FOREIGN KEY (level_id) REFERENCES level(id) ON DELETE CASCADE
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE t2c_session (
          id SERIAL PRIMARY KEY,
          user_id INT NOT NULL,
          wall_id INT NOT NULL,
          date DATE NOT NULL,
          duration_minutes INT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES t2c_user(id) ON DELETE CASCADE,
          FOREIGN KEY (wall_id) REFERENCES wall(id) ON DELETE CASCADE
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE climb (
          id SERIAL PRIMARY KEY,
          session_id INT NOT NULL,
          grade_id INT NOT NULL,
          type_id INT NOT NULL,
          climb_outcome_id INT NOT NULL,
          FOREIGN KEY (session_id) REFERENCES t2c_session(id) ON DELETE CASCADE,
          FOREIGN KEY (grade_id) REFERENCES grade(id) ON DELETE CASCADE,
          FOREIGN KEY (type_id) REFERENCES climb_type(id) ON DELETE CASCADE,
          FOREIGN KEY (climb_outcome_id) REFERENCES climb_outcome(id) ON DELETE CASCADE
        );
      `);
    })

    // Seed static data
    .then(() => {
      return db.query(`
        INSERT INTO level (label) VALUES
        ('Novice'),
        ('Beginner'),
        ('Intermediate'),
        ('Elite'),
        ('Super-elite');
      `);
    })
    .then(() => {
      return db.query(`
        INSERT INTO grade_system (label) VALUES
        ('Sport'),
        ('V'),
        ('Font');
      `);
    })
    .then(() => {
      return db.query(`
        INSERT INTO grade (label, grade_system_id) VALUES
        ('3', 1),
        ('3+', 1),
        ('4', 1),
        ('4+', 1),
        ('5', 1),
        ('5+', 1),
        ('6A', 1),
        ('6A+', 1),
        ('6B', 1),
        ('6B+', 1),
        ('6C', 1),
        ('6C+', 1),
        ('7a', 1),
        ('7a+', 1),
        ('7b', 1),
        ('7b+', 1),
        ('7c', 1),
        ('7c+', 1),
        ('8a', 1),
        ('8a+', 1),
        ('8b', 1),
        ('8b+', 1),
        ('VB-', 2),
        ('VB', 2),
        ('VB+', 2),
        ('V0-', 2),
        ('V0', 2),
        ('V0+', 2),
        ('V1', 2),
        ('V2', 2),
        ('V3', 2),
        ('V4', 2),
        ('V5', 2),
        ('V6', 2),
        ('V7', 2),
        ('V8', 2),
        ('V9', 2),
        ('V10', 2),
        ('V11', 2),
        ('V12', 2),
        ('V13', 2),
        ('3', 3),
        ('3+', 3),
        ('4', 3),
        ('4+', 3),
        ('5', 3),
        ('5+', 3),
        ('6a', 3),
        ('6a+', 3),
        ('6b', 3),
        ('6b+', 3),
        ('6c', 3),
        ('6c+', 3),
        ('7a', 3),
        ('7a+', 3),
        ('7b', 3),
        ('7b+', 3),
        ('7c', 3),
        ('7c+', 3),
        ('8a', 3),
        ('8a+', 3);
      `);
    })
    .then(() => {
      return db.query(`
        INSERT INTO climb_type (label) VALUES
        ('Boulder (v-grade)'),
        ('Boulder (font)'),
        ('Top rope'),
        ('Lead'),
        ('Auto belay');
      `);
    })
    .then(() => {
      return db.query(`
        INSERT INTO climb_outcome (label) VALUES
        ('Onsight (first attempt - no beta)'),
        ('Flash (first attempt - with beta)'),
        ('Redpoint (multiple attempts)'),
        ('Repeat ascent'),
        ('Still working on it');
      `);
    })
    .then(() => {
      return db.query(`
        INSERT INTO wall (name, postcode, lat, long, county) VALUES
        ('Bradford University Sports Centre', 'BD7 1DP', 53.791584, -1.763774, 'West Yorkshire'),
        ('The Climbing Hub', 'BD7 2BR', 53.78419, -1.78447, 'West Yorkshire'),
        ('The Climbing Unit', 'DE21 6YZ', 52.924779, -1.451111, 'Derbyshire'),
        ('University of Derby Climbing Wall', 'DE22 1GB', 52.938473, -1.496678, 'Derbyshire'),
        ('Alter-rock Climbing Centre', 'DE23 8LU', 52.908449, -1.469815, 'Derbyshire'),
        ('Wirksworth Leisure Centre', 'DE4 4JG', 53.077623, -1.571366, 'Derbyshire'),
        ('FREEKLIME', 'HD1 6RX', 53.646771, -1.772642, 'West Yorkshire'),
        ('ROKT Climbing Gym', 'HD6 1EY', 53.700229, -1.780761, 'West Yorkshire'),
        ('Leeds City Bloc', 'LS10 1NT', 53.785324, -1.533854, 'West Yorkshire'),
        ('BIG Depot Leeds', 'LS12 6BY', 53.784062, -1.576409, 'West Yorkshire'),
        ('Leeds University Department of Physical Education', 'LS2 9JT', 53.807958, -1.553329, 'West Yorkshire'),
        ('Depot Climbing Pudsey', 'LS28 6AA', 53.803329, -1.666498, 'West Yorkshire'),
        ('The Climbing Lab', 'LS4 2AZ', 53.803682, -1.579389, 'West Yorkshire'),
        ('Beckett Park Sports Centre (was Carnegie College)', 'LS6 3QS', 53.826337, -1.59075, 'West Yorkshire'),
        ('Last Sun Dance', 'LS9 0TN', 53.789286, -1.499795, 'West Yorkshire'),
        ('BlocHaus Climbing', 'M11 2FB', 53.474798, -2.183451, 'Greater Manchester'),
        ('Parthian Climbing Manchester', 'M12 5ND', 53.469307, -2.204818, 'Greater Manchester'),
        ('Rock Over Climbing - Manchesters Bouldering Centre', 'M3 1LN', 53.490989, -2.246671, 'Greater Manchester'),
        ('Vertical Chill Indoor Ice Wall, Manchester', 'M3 2QS', 53.481082, -2.248304, 'Greater Manchester'),
        ('Ellis Brigham Shop', 'M3 4NF', 53.476099, -2.254121, 'Greater Manchester'),
        ('Broughton Recreation Centre', 'M7 1ZT', 53.497716, -2.262767, 'Greater Manchester'),
        ('The Depot Climbing Centre, Nottingham', 'NG1 1EU', 52.956346, -1.142996, 'Nottinghamshire'),
        ('The Bouldering Asylum', 'NG17 5LD', 53.123194, -1.233751, 'Nottinghamshire'),
        ('The Mill', 'NG17 4PA', 53.129282, -1.228576, 'Nottinghamshire'),
        ('Westfield Folkhouse', 'NG18 1TL', 53.148291, -1.202161, 'Nottinghamshire'),
        ('Nottingham High School', 'NG7 4ED', 52.962487, -1.15982, 'Nottinghamshire'),
        ('Nottingham Climbing Centre', 'NG7 6AT', 52.970282, -1.170241, 'Nottinghamshire'),
        ('University of Nottingham Climbing Wall', 'NG7 2RD', 52.940521, -1.191193, 'Nottinghamshire'),
        ('New Dimension', 'OL11 2HJ', 53.59965, -2.149768, 'Greater Manchester'),
        ('Hollingworth Lake WAC', 'OL15 9JQ', 53.658455, -2.092265, 'Greater Manchester'),
        ('The Matrix', 'S10 2TY', 53.382144, -1.496608, 'South Yorkshire'),
        ('The Foundry Climbing Centre', 'S3 8EN', 53.390414, -1.471701, 'South Yorkshire'),
        ('The Climbing Hangar Sheffield', 'S4 7WG', 53.39085, -1.4504, 'South Yorkshire'),
        ('The Adventure Hub', 'S33 0AL', 53.341322, -1.701711, 'Derbyshire'),
        ('Healthy Living centre', 'S43 3XR', 53.265722, -1.352874, 'Derbyshire'),
        ('The Climbing Works', 'S8 0UJ', 53.352327, -1.483694, 'South Yorkshire'),
        ('Virgin Active', 'S8 0XQ', 53.35936, -1.478335, 'South Yorkshire'),
        ('The Depot Climbing Centre, Sheffield', 'S9 3LQ', 53.384864, -1.439415, 'South Yorkshire'),
        ('Substation Climbing, Yoga & Café', 'SK10 2BN', 53.269177, -2.118289, 'Cheshire'),
        ('Macclesfield Leisure Centre', 'SK10 4AF', 53.270747, -2.1598, 'Cheshire'),
        ('The Chapel, Macclesfield', 'SK11 7JB', 53.252107, -2.118826, 'Cheshire'),
        ('White Hall Outdoor Centre', 'SK17 6SX', 53.28423, -1.95301, 'Derbyshire'),
        ('Glossop Leisure Centre', 'SK13 8PN', 53.443433, -1.946576, 'Derbyshire'),
        ('Longdendale Recreation Centre', 'SK14 6PJ', 53.4551, -2.01666, 'Greater Manchester'),
        ('Fairfield Community Centre', 'SK17 6SX', 53.28423, -1.953013, 'Derbyshire'),
        ('Awesome Walls Climbing Centre, Stockport', 'SK6 2BP', 53.413769, -2.133811, 'Greater Manchester'),
        ('The Ridge Climbing Centre', 'SK6 7HX', 53.385335, -2.064474, 'Greater Manchester'),
        ('Upper Limits', 'ST13 6EU', 53.107212, -2.009863, 'Staffordshire'),
        ('Silcoates School', 'WF2 0PD', 53.694621, -1.530601, 'West Yorkshire');
      `);      
    })

    // Seed test data
    .then(() => {
      const formattedUsersData = usersData.map(({ first_name, last_name, age, level_id, firebase_id }) => [first_name, last_name, age, level_id, firebase_id]);
      const insertUsersQuery = format(`
        INSERT INTO t2c_user (first_name, last_name, age, level_id, firebase_id) VALUES %L RETURNING *;
      `, formattedUsersData);
      return db.query(insertUsersQuery);
    })
    .then(() => {
      const formattedT2CsessionData = T2CsessionData.map(({ user_id, wall_id, date, duration_minutes }) => [user_id, wall_id, date, duration_minutes]);
      const insertT2CsessionQuery = format(`
        INSERT INTO t2c_session (user_id, wall_id, date, duration_minutes) VALUES %L RETURNING *;
      `, formattedT2CsessionData);
      return db.query(insertT2CsessionQuery);
    })
    .then(() => {
      const formattedClimbsData = climbsData.map(({ session_id, grade_id, type_id, climb_outcome_id }) => [session_id, grade_id, type_id, climb_outcome_id]);
      const insertClimbsQuery = format(`
        INSERT INTO climb (session_id, grade_id, type_id, climb_outcome_id) VALUES %L RETURNING *;
      `, formattedClimbsData);
      return db.query(insertClimbsQuery);
    })
    .catch((err) => {
      console.error(err, '<<--seeding error');
    });
};
module.exports = seed;