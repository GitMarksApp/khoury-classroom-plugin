DROP DATABASE IF EXISTS khouryclassroomdb;

CREATE DATABASE khouryclassroomdb;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  role VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  gh_username VARCHAR(255) NOT NULL,
  joined_on TIMESTAMP
);

CREATE TABLE classrooms (
  id SERIAL PRIMARY KEY,
  ghclassroom_id SERIAL NOT NULL,
  name VARCHAR(255) NOT NULL,
  prof_id INTEGER NOT NULL,
  FOREIGN KEY (prof_id) REFERENCES users(id)
);

CREATE TABLE student_classroom (
  student_id INTEGER NOT NULL,
  classroom_id INTEGER NOT NULL,
  PRIMARY KEY (student_id, classroom_id),
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (classroom_id) REFERENCES classrooms(id)
);

CREATE TABLE professor_ta (
  prof_id INTEGER NOT NULL,
  ta_id INTEGER,
  PRIMARY KEY (prof_id, ta_id),
  FOREIGN KEY (prof_id) REFERENCES users(id),
  FOREIGN KEY (ta_id) REFERENCES users(id)
);

CREATE TABLE rubrics (
  id SERIAL PRIMARY KEY,
  content VARCHAR(255) NOT NULL 
);

CREATE TABLE assignment_templates (
  id SERIAL PRIMARY KEY,
  rubric_id INTEGER,
  FOREIGN KEY (rubric_id) REFERENCES rubrics(id)
);

CREATE TABLE assignments (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  student_id INTEGER NOT NULL,
  ta_id INTEGER NOT NULL,
  template_id INTEGER NOT NULL,
  completed BOOLEAN DEFAULT FALSE NOT NULL,
  started BOOLEAN DEFAULT FALSE NOT NULL,
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (ta_id) REFERENCES users(id),
  FOREIGN KEY (template_id) REFERENCES assignment_templates(id)
);

CREATE TABLE due_dates (
  id SERIAL PRIMARY KEY,
  due TIMESTAMP DEFAULT NOW(),
  assignment_id INTEGER,
  FOREIGN KEY (assignment_id) REFERENCES assignments(id)
);

CREATE TABLE regrades (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL,
  ta_id INTEGER NOT NULL,
  due_date_id INTEGER NOT NULL,
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (ta_id) REFERENCES users(id),
  FOREIGN KEY (due_date_id) REFERENCES due_dates(id)
);



-- adding initial users
INSERT INTO users (role, name, gh_username, joined_on) VALUES ('student', 'Alex Angione', 'alexangione419', NOW()); 
INSERT INTO users (role, name, gh_username, joined_on) VALUES ('professor', 'Dr. Fontenot', 'MarkFontenot', NOW());  


INSERT INTO rubrics (content) VALUES ('rubric item');




