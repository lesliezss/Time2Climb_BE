const format = require("pg-format");
const db = require("../connection");
const users = require("../data/development-data/users");
const seed = ({ usersData, T2CsessionData, climbsData }) => {
  const query = `
    DROP TABLE IF EXISTS climb, T2C_Session, T2C_User, wall, grade, climb_type, level, climb_outcome, grade_system CASCADE;
  `;
  return db
    .query(query)
    .then(() => {
      return db.query(`
        CREATE TABLE IF NOT EXISTS level (
          id SERIAL PRIMARY KEY,
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
          grade_system_id INT,
          FOREIGN KEY (grade_system_id) REFERENCES grade_system(id)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE IF NOT EXISTS climb_type (
          id SERIAL PRIMARY KEY,
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
    // Seed test data
    .then(() => {
      // console.log(usersData, '--usersData')
      const formattedUsersData = usersData.map(({ first_name, last_name, age, level_id }) => [first_name, last_name, age, level_id]);
      // console.log(formattedUsersData, '--formattedUsersData')
      const insertUsersQuery = format(`
        INSERT INTO T2C_User (first_name, last_name, age, level_id) VALUES %L RETURNING *;
      `, formattedUsersData);
      return db.query(insertUsersQuery);
    })
    .then(() => {
      const formattedT2CsessionData = T2CsessionData.map(({ user_id, wall_id, date, duration_minutes }) => [user_id, wall_id, date, duration_minutes]);
      const insertT2CsessionQuery = format(`
        INSERT INTO T2C_Session (user_id, wall_id, date, duration_minutes) VALUES %L RETURNING *;
      `, formattedT2CsessionData);
      return db.query(insertT2CsessionQuery);
    })
    .then(() => {
      const formattedClimbsData = climbsData.map(({ session_id, grade_id, type_id, outcome_id }) => [session_id, grade_id, type_id, outcome_id]);
      const insertClimbsQuery = format(`
        INSERT INTO climb (session_id, grade_id, type_id, outcome_id) VALUES %L RETURNING *;
      `, formattedClimbsData);
      return db.query(insertClimbsQuery);
    })
    .catch((err) => {
      console.error(err);
    });
};
module.exports = seed;