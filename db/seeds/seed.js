const format = require("pg-format");
const db = require("../connection");
const seed = () => {
  const query = `
        DROP TABLE IF EXISTS climbs, sessions, users, walls, grades, climb_type, climb_outcomes, grade_system CASCADE;
    `;
  return db
    .query(query)
    .then(() => {
      return db.query(`
                CREATE TABLE IF NOT EXISTS levels (
                    level_id SERIAL PRIMARY KEY,
                    level_label VARCHAR(50)
                );
            `);
    })
    .then(() => {
      return db.query(`
                CREATE TABLE IF NOT EXISTS climb_type (
                    climb_type_id SERIAL PRIMARY KEY,
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
                CREATE TABLE IF NOT EXISTS grades (
                    grade_id SERIAL PRIMARY KEY,
                    grade_label VARCHAR(10),
                    grade_system INT
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
                    level_id INT
                    -- Add foreign key constraint if needed
                    -- FOREIGN KEY (level_id) REFERENCES levels(level_id)
                    -- Uncomment and modify the line above if you have a "levels" table with corresponding level_id
                );
            `);
    })
    .then(() => {
      return db.query(`
                CREATE TABLE IF NOT EXISTS sessions (
                    session_id SERIAL PRIMARY KEY,
                    user_id INT NOT NULL,
                    climbing_wall_id INT NOT NULL,
                    date DATE NOT NULL,
                    duration_minutes INT NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES users(user_id),
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
                    FOREIGN KEY (session_id) REFERENCES sessions(session_id),
                    FOREIGN KEY (grade_id) REFERENCES grades(grade_id),
                    FOREIGN KEY (climb_type_id) REFERENCES climb_type(climb_type_id),
                    FOREIGN KEY (climb_outcome_id) REFERENCES climb_outcomes(climb_outcome_id)
                );
            `);
    })
    .catch((err) => {
      console.error("Error creating tables", err);
      throw err;
    });
};
module.exports = seed;
