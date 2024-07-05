const format = require("pg-format");
const db = require("../connection");

const seed = ({ usersData, T2CsessionData, climbsData }) => {
  const query = `
    DROP TABLE IF EXISTS climb, T2C_Session, T2C_User, wall, grade, climb_type, level, climb_outcome, grade_system CASCADE;
  `;

  return db
    .query(query)
    .then(() => {
      return db.query(`
        CREATE TABLE IF NOT EXISTS level (
          id INT PRIMARY KEY,
          label VARCHAR(50)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE IF NOT EXISTS grade_system (
          id SERIAL PRIMARY KEY,
          label VARCHAR(50)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE IF NOT EXISTS grade (
          id SERIAL PRIMARY KEY,
          label VARCHAR(10),
          system INT,
          FOREIGN KEY (system) REFERENCES grade_system(id)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE IF NOT EXISTS climb_type (
          id INT PRIMARY KEY,
          label VARCHAR(50)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE IF NOT EXISTS climb_outcome (
          id SERIAL PRIMARY KEY,
          label VARCHAR(50)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE IF NOT EXISTS wall (
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
        CREATE TABLE IF NOT EXISTS T2C_User (
          id SERIAL PRIMARY KEY,
          first_name VARCHAR(50) NOT NULL,
          last_name VARCHAR(50) NOT NULL,
          age INT,
          level_id INT,
          FOREIGN KEY (level_id) REFERENCES level(id)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE IF NOT EXISTS T2C_Session (
          id SERIAL PRIMARY KEY,
          user_id INT NOT NULL,
          wall_id INT NOT NULL,
          date DATE NOT NULL,
          duration_minutes INT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES T2C_User(id) ON DELETE CASCADE,
          FOREIGN KEY (wall_id) REFERENCES wall(id)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE IF NOT EXISTS climb (
          id SERIAL PRIMARY KEY,
          session_id INT NOT NULL,
          grade_id INT NOT NULL,
          type_id INT NOT NULL,
          outcome_id INT NOT NULL,
          FOREIGN KEY (session_id) REFERENCES T2C_Session(id) ON DELETE CASCADE,
          FOREIGN KEY (grade_id) REFERENCES grade(id),
          FOREIGN KEY (type_id) REFERENCES climb_type(id),
          FOREIGN KEY (outcome_id) REFERENCES climb_outcome(id)
        );
      `);
    })
    .then(() => {
      return db.query(`
        INSERT INTO level (id, label) VALUES
        (1, 'Novice'),
        (2, 'Beginner'),
        (3, 'Intermediate'),
        (4, 'Elite'),
        (5, 'Super-elite');
      `);
    })
    .then(() => {
      return db.query(`
        INSERT INTO grade_system (id, label) VALUES
        (1, 'Sport'),
        (2, 'V'),
        (3, 'Font');
      `);
    })
    .then(() => {
      return db.query(`
        INSERT INTO grade (id, label, system) VALUES
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
        INSERT INTO climb_type (id, label) VALUES
        (1, 'Boulder (v-grade)'),
        (2, 'Boulder (font)'),
        (3, 'Top rope'),
        (4, 'Lead'),
        (5, 'Auto belay');
      `);
    })
    .then(() => {
      return db.query(`
        INSERT INTO climb_outcome (id, label) VALUES
        (1, 'Onsight (first attempt - no beta)'),
        (2, 'Flash (first attempt - with beta)'),
        (3, 'Redpoint (multiple attempts)'),
        (4, 'Repeat ascent'),
        (5, 'Still working on it');
      `);
    })
    .then(() => {
      return db.query(`
        INSERT INTO wall (name, postcode, lat, long, county) VALUES
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
      const formattedUsersData = usersData.map(
        ({ first_name, last_name, age, level_id }) => [
          first_name,
          last_name,
          age,
          level_id,
        ]
      );
      const insertUsersQuery = format(
        `
        INSERT INTO T2C_User (first_name, last_name, age, level_id) VALUES %L RETURNING *;
      `,
        formattedUsersData
      );

      return db.query(insertUsersQuery);
    })
    .then(() => {
      const formattedT2CsessionData = T2CsessionData.map(
        ({ user_id, climbing_wall_id, date, duration_minutes }) => [
          user_id,
          climbing_wall_id,
          date,
          duration_minutes,
        ]
      );
      const insertT2CsessionQuery = format(
        `
        INSERT INTO T2C_Session (user_id, wall_id, date, duration_minutes) VALUES %L RETURNING *;
      `,
        formattedT2CsessionData
      );

      return db.query(insertT2CsessionQuery);
    })
    .then(() => {
      const formattedClimbsData = climbsData.map(
        ({ session_id, grade_id, climb_type_id, climb_outcome_id }) => [
          session_id,
          grade_id,
          climb_type_id,
          climb_outcome_id,
        ]
      );
      const insertClimbsQuery = format(
        `
        INSERT INTO climb (session_id, grade_id, type_id, outcome_id) VALUES %L RETURNING *;
      `,
        formattedClimbsData
      );

      return db.query(insertClimbsQuery);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = seed;
