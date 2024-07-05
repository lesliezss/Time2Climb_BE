const format = require("pg-format");
const db = require("../connection");

const seed = ({ usersData, T2CsessionData, climbsData }) => {
  const query = `
    DROP TABLE IF EXISTS climbs, T2Csession, users, walls, grades, climb_type, levels, climb_outcomes, grade_system CASCADE;
  `;

  return db
    .query(query)
    .then(() => {
      return db.query(`
        CREATE TABLE IF NOT EXISTS levels (
          level_id INT PRIMARY KEY,
          level_label VARCHAR(50)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE IF NOT EXISTS grade_system (
          grade_system_id SERIAL PRIMARY KEY,
          grade_system_label VARCHAR(50)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE IF NOT EXISTS grades (
          grade_id SERIAL PRIMARY KEY,
          grade_label VARCHAR(10),
          grade_system INT,
          FOREIGN KEY (grade_system) REFERENCES grade_system(grade_system_id)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE IF NOT EXISTS climb_type (
          climb_type_id INT PRIMARY KEY,
          climb_type_label VARCHAR(50)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE IF NOT EXISTS climb_outcomes (
          climb_outcome_id SERIAL PRIMARY KEY,
          climb_outcome_label VARCHAR(50)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE IF NOT EXISTS walls (
          climbing_wall_id SERIAL PRIMARY KEY,
          climbing_wall_name VARCHAR(100),
          climbing_wall_postcode VARCHAR(20),
          climbing_wall_lat NUMERIC(10, 6),
          climbing_wall_long NUMERIC(10, 6),
          climbing_wall_county VARCHAR(50)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE IF NOT EXISTS users (
          user_id SERIAL PRIMARY KEY,
          first_name VARCHAR(50) NOT NULL,
          last_name VARCHAR(50) NOT NULL,
          age INT,
          level_id INT,
          FOREIGN KEY (level_id) REFERENCES levels(level_id)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE IF NOT EXISTS T2Csession (
          session_id SERIAL PRIMARY KEY,
          user_id INT NOT NULL,
          climbing_wall_id INT NOT NULL,
          date DATE NOT NULL,
          duration_minutes INT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
          FOREIGN KEY (climbing_wall_id) REFERENCES walls(climbing_wall_id)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE IF NOT EXISTS climbs (
          climb_id SERIAL PRIMARY KEY,
          session_id INT NOT NULL,
          grade_id INT NOT NULL,
          climb_type_id INT NOT NULL,
          climb_outcome_id INT NOT NULL,
          FOREIGN KEY (session_id) REFERENCES T2Csession(session_id) ON DELETE CASCADE,
          FOREIGN KEY (grade_id) REFERENCES grades(grade_id),
          FOREIGN KEY (climb_type_id) REFERENCES climb_type(climb_type_id),
          FOREIGN KEY (climb_outcome_id) REFERENCES climb_outcomes(climb_outcome_id)
        );
      `);
    })
    .then(() => {
      return db.query(`
        INSERT INTO levels (level_id, level_label) VALUES
        (1, 'Novice'),
        (2, 'Beginner'),
        (3, 'Intermediate'),
        (4, 'Elite'),
        (5, 'Super-elite');
      `);
    })
    .then(() => {
      return db.query(`
        INSERT INTO grade_system (grade_system_id, grade_system_label) VALUES
        (1, 'Sport'),
        (2, 'V'),
        (3, 'Font');
      `);
    })
    .then(() => {
      return db.query(`
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
      `);
    })
    .then(() => {
      return db.query(`
        INSERT INTO climb_type (climb_type_id, climb_type_label) VALUES
        (1, 'Boulder (v-grade)'),
        (2, 'Boulder (font)'),
        (3, 'Top rope'),
        (4, 'Lead'),
        (5, 'Auto belay');
      `);
    })
    .then(() => {
      return db.query(`
        INSERT INTO climb_outcomes (climb_outcome_id, climb_outcome_label) VALUES
        (1, 'Onsight (first attempt - no beta)'),
        (2, 'Flash (first attempt - with beta)'),
        (3, 'Redpoint (multiple attempts)'),
        (4, 'Repeat ascent'),
        (5, 'Still working on it');
      `);
    })
    .then(() => {
      return db.query(`
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
        ('White Hall Centre', 'SK13 8QB', 53.353198, -1.91401, 'Derbyshire');
      `);
    })
    .then(() => {
      const formattedUsersData = usersData.map(({ first_name, last_name, age, level_id }) => [first_name, last_name, age, level_id]);
      const insertUsersQuery = format(`
        INSERT INTO users (first_name, last_name, age, level_id) VALUES %L RETURNING *;
      `, formattedUsersData);

      return db.query(insertUsersQuery);
    })
    .then(() => {
      const formattedT2CsessionData = T2CsessionData.map(({ user_id, climbing_wall_id, date, duration_minutes }) => [user_id, climbing_wall_id, date, duration_minutes]);
      const insertT2CsessionQuery = format(`
        INSERT INTO T2Csession (user_id, climbing_wall_id, date, duration_minutes) VALUES %L RETURNING *;
      `, formattedT2CsessionData);

      return db.query(insertT2CsessionQuery);
    })
    .then(() => {
      const formattedClimbsData = climbsData.map(({ session_id, grade_id, climb_type_id, climb_outcome_id }) => [session_id, grade_id, climb_type_id, climb_outcome_id]);
      const insertClimbsQuery = format(`
        INSERT INTO climbs (session_id, grade_id, climb_type_id, climb_outcome_id) VALUES %L RETURNING *;
      `, formattedClimbsData);

      return db.query(insertClimbsQuery);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = seed;