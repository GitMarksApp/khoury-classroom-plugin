-- Insert into classrooms
INSERT INTO classrooms (id, name, org_id, org_name, created_at)
VALUES
(1, 'Kennys Coding Classroom', 182810684, 'NUSpecialProjects', NOW()),
(2, 'Advanced Running Analytics', 182810684, 'NUSpecialProjects', NOW()),
(3, 'Chocolate Lovers Unite', 182810684, 'NUSpecialProjects', NOW()),
(4, 'Data Structures and Algorithms', 182810684, 'NUSpecialProjects', NOW()),
(5, 'Mobile App Development', 182810684, 'NUSpecialProjects', NOW()),
(6, 'AI and Machine Learning', 182810684, 'NUSpecialProjects', NOW()),
(7, 'Web Development Bootcamp', 98771, 'WebCoders', NOW()),
(8, 'Cloud Computing', 98772, 'CloudExperts', NOW()),
(9, 'Cybersecurity Fundamentals', 98773, 'SecureNet', NOW()),
(10, 'Software Engineering Principles', 98774, 'SoftEngOrg', NOW()),
(11, 'Khoury Coding Bootcamp', 182810684, 'NUSpecialProjects', NOW());
SELECT setval('classrooms_id_seq', (SELECT MAX(id) FROM classrooms));

-- Create users (Kenny and others)
INSERT INTO users (id, first_name, last_name, github_username, github_user_id)
VALUES
(1, 'Kenny', 'Chen', 'kennybc', 54950614),
(2, 'Grace', 'Hopper', 'gracehopper', 789012),
(3, 'Alan', 'Turing', 'alanturing', 345678),
(4, 'Ada', 'Lovelace', 'adalovelace', 901234),
(5, 'Linus', 'Torvalds', 'linustorvalds', 567890),
(6, 'Margaret', 'Hamilton', 'mhamilton', 234567),
(7, 'Tim', 'Berners-Lee', 'timbl', 890123),
(8, 'Barbara', 'Liskov', 'bliskov', 678901),
(9, 'Dennis', 'Ritchie', 'dritchie', 112233),
(10, 'Ken', 'Thompson', 'kthompson', 445566),
(11, 'Alex', 'Angione', 'alexangione419', 111721125),
(12, 'Nick', 'Tietje2', 'NickTietje', 183017928),
(13, 'Seby', 'Tremblay', 'sebytremblay', 91509344),
(14, 'Cam', 'Plume', 'CamPlume1', 116120547),
(15, 'Nick', 'Tietje', 'ntietje1', 124538220);

SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));

-- Insert into classroom_membership
INSERT INTO classroom_membership (user_id, classroom_id, classroom_role, created_at, status)
VALUES
(1, 1, 'PROFESSOR', NOW(), 'ACTIVE'),
(2, 1, 'PROFESSOR', NOW(), 'ACTIVE'),
(3, 1, 'STUDENT', NOW(), 'ACTIVE'),
(4, 2, 'STUDENT', NOW(), 'ACTIVE'),
(5, 2, 'TA', NOW(), 'ACTIVE'),
(6, 3, 'STUDENT', NOW(), 'ACTIVE'),
(7, 3, 'PROFESSOR', NOW(), 'ACTIVE'),
(8, 4, 'STUDENT', NOW(), 'ACTIVE'),
(9, 4, 'PROFESSOR', NOW(), 'ACTIVE'),
(10, 5, 'TA', NOW(), 'ACTIVE'),
(1, 6, 'STUDENT', NOW(), 'ACTIVE'),
(3, 7, 'STUDENT', NOW(), 'ACTIVE'),
(6, 8, 'STUDENT', NOW(), 'ACTIVE'),
(8, 9, 'STUDENT', NOW(), 'ACTIVE'),
(5, 10, 'TA', NOW(), 'ACTIVE'),
(11, 11, 'STUDENT', NOW(), 'ACTIVE'),
(12, 11, 'STUDENT', NOW(), 'ACTIVE'),
(11, 1, 'TA', NOW(), 'ACTIVE'),
(12, 1, 'TA', NOW(), 'ACTIVE'),
(13, 1, 'TA', NOW(), 'ACTIVE'),
(14, 1, 'TA', NOW(), 'ACTIVE'),
(15, 1, 'TA', NOW(), 'ACTIVE');


-- Insert into assignment_templates
INSERT INTO assignment_templates (template_repo_owner, template_repo_id, created_at, template_repo_name)
VALUES
('kennysmith', 1000, NOW(), 'Template 1'),
('gracehopper', 1001, NOW(), 'Template 2'),
('linustorvalds', 1002, NOW(), 'Tempalte 3'),
('alanturing', 1003, NOW(), 'Template 4'),
('adalovelace', 1004, NOW(), 'Template 5'),
('mhamilton', 1005, NOW(), 'Template 6'),
('timbl', 1006, NOW(), 'Template 7'),
('bliskov', 1007, NOW(), 'Template 8'),
('dritchie', 1008, NOW(), 'Template 9'),
('kthompson', 1009, NOW(), 'Template 10');

-- Insert into rubrics
INSERT INTO rubrics (id, name, org_id, classroom_id, reusable) VALUES 
(1, 'Introduction to Programming Rubric', 1, 1, true),
(2, 'Data Structures Project Rubric', 1, 1, false),
(3, 'Algorithms Midterm Rubric', 2, 1, false),
(4, 'Database Design Project Rubric', 2, 1, true),
(5, 'Machine Learning Final Rubric', 3, 2, false),
(6, 'Operating Systems Lab Rubric', 3, 2, true),
(7, 'Web Development Assignment Rubric', 4, 2, false),
(8, 'Network Security Exam Rubric', 4, 1, false),
(9, 'Software Engineering Project Rubric', 5, 2, true),
(10, 'Artificial Intelligence Assignment Rubric', 5, 2, true);
SELECT setval('rubrics_id_seq', (SELECT MAX(id) FROM rubrics));

-- Insert into rubric_items
INSERT INTO rubric_items (id, rubric_id, point_value, explanation, created_at)
VALUES
(1, 1, 10, 'Tracks running distances accurately', NOW()),
(2, 1, 10, 'Records chocolate consumption correctly', NOW()),
(3, 1, 10, 'Code is well-documented and clean', NOW()),
(4, 2, 15, 'Lexical analysis implemented', NOW()),
(5, 2, 15, 'Parsing and syntax tree generation', NOW()),
(6, 3, 20, 'Kernel module loads without errors', NOW()),
(7, 3, 20, 'Module performs expected operations', NOW()),
(8, 4, 25, 'Encryption algorithm efficiency', NOW()),
(9, 4, 25, 'Security level meets standards', NOW()),
(10, 5, 10, 'User interface is intuitive', NOW()),
(11, 5, 10, 'GPS tracking is accurate', NOW()),
(12, 6, 30, 'AI chatbot responds correctly', NOW()),
(13, 7, 15, 'Website layout is responsive', NOW()),
(14, 7, 15, 'Accessibility standards are met', NOW()),
(15, 8, 20, 'Cloud deployment is successful', NOW()),
(16, 9, 25, 'Identified security vulnerabilities', NOW()),
(17, 10, 20, 'Implemented design patterns correctly', NOW());
SELECT setval('rubric_items_id_seq', (SELECT MAX(id) FROM rubric_items));

-- Insert into assignment_outlines
INSERT INTO assignment_outlines (id, template_id, created_at, released_at, name, rubric_id, classroom_id, group_assignment)
VALUES
(1, 1001, NOW(), '2023-01-01 09:00:00', 'Running and Chocolate Tracker App', 1, 1, FALSE),
(2, 1002, NOW(), '2023-02-01 09:00:00', 'Compiler Design', NULL, 1, TRUE),
(3, 1003, NOW(), '2023-03-01 09:00:00', 'Linux Kernel Module', 3, 2, FALSE),
(4, 1004, NOW(), '2023-04-01 09:00:00', 'Encryption Algorithms', 3, 2, TRUE),
(5, 1005, NOW(), '2023-05-01 09:00:00', 'Mobile App for Runners', 4, 3, FALSE),
(6, 1006, NOW(), '2023-06-01 09:00:00', 'AI Chatbot', 5, 4, TRUE),
(7, 1007, NOW(), '2023-07-01 09:00:00', 'Website Development', NULL, 5, FALSE),
(8, 1008, NOW(), '2023-08-01 09:00:00', 'Cloud Deployment', 6, 6, TRUE),
(9, 1009, NOW(), '2023-09-01 09:00:00', 'Cybersecurity Analysis', 9, 7, FALSE),
(10, 1009, NOW(), '2023-10-01 09:00:00', 'Software Design Patterns', NULL, 8, TRUE);
SELECT setval('assignment_outlines_id_seq', (SELECT MAX(id) FROM assignment_outlines));

-- Insert into student_works
INSERT INTO student_works (id, assignment_outline_id, repo_name, unique_due_date, manual_feedback_score, auto_grader_score, grades_published_timestamp, work_state, created_at)
VALUES
(1, 1, 'khoury-classroom-plugin', '2023-02-01 23:59:59', 28, 20, '2023-02-05 10:00:00', 'GRADE_PUBLISHED', NOW()),
(2, 2, 'kennysmith/compiler-design', '2023-03-01 23:59:59', 25, 22, '2023-03-05 12:00:00', 'GRADE_PUBLISHED', NOW()),
(3, 3, 'alanturing/linux-module', '2023-04-01 23:59:59', 40, 35, '2023-04-05 14:00:00', 'GRADE_PUBLISHED', NOW()),
(4, 4, 'adalovelace/encryption-algorithms', '2023-05-01 23:59:59', 45, 40, '2023-05-05 16:00:00', 'GRADE_PUBLISHED', NOW()),
(5, 5, 'mhamilton/mobile-app', '2023-06-01 23:59:59', 18, 15, '2023-06-05 18:00:00', 'GRADE_PUBLISHED', NOW()),
(6, 6, 'kennysmith/ai-chatbot', '2023-07-01 23:59:59', 50, 45, '2023-07-05 20:00:00', 'GRADE_PUBLISHED', NOW()),
(7, 7, 'bliskov/website-dev', '2023-08-01 23:59:59', 28, 25, '2023-08-05 22:00:00', 'GRADE_PUBLISHED', NOW()),
(8, 8, 'linustorvalds/cloud-deployment', '2023-09-01 23:59:59', 40, 35, '2023-09-05 12:00:00', 'GRADE_PUBLISHED', NOW()),
(9, 9, 'mhamilton/cybersecurity-analysis', '2023-10-01 23:59:59', 48, 45, '2023-10-05 14:00:00', 'GRADE_PUBLISHED', NOW()),
(10, 10, 'kennysmith/software-design-patterns', '2023-11-01 23:59:59', 38, 35, '2023-11-05 16:00:00', 'GRADE_PUBLISHED', NOW()),
(11, 1, 'kenny-assignment-josevaca1231', '2023-04-01 23:59:59', 40, 35, '2023-04-05 14:00:00', 'GRADE_PUBLISHED', NOW()),
(12, 1, 'kenny-assignment-josevaca1231', '2023-04-01 23:59:59', 40, 35, '2023-04-05 14:00:00', 'GRADE_PUBLISHED', NOW());
SELECT setval('student_works_id_seq', (SELECT MAX(id) FROM student_works));

-- Insert into work_contributors+
INSERT INTO work_contributors (user_id, student_work_id, created_at)
VALUES
(1, 1, NOW()),
(2, 1, NOW()),
(3, 1, NOW()),
(1, 2, NOW()),
(2, 2, NOW()),
(3, 3, NOW()),
(4, 4, NOW()),
(6, 5, NOW()),
(1, 6, NOW()),
(8, 7, NOW()),
(5, 8, NOW()),
(6, 9, NOW()),
(1, 10, NOW()),
(3, 11, NOW()),
(4, 12, NOW());

-- Insert into feedback_comment
INSERT INTO feedback_comment (id, student_work_id, rubric_item_id, ta_user_id, created_at)
VALUES
(1, 1, 1, 1, NOW()),
(2, 1, 2, 1, NOW()),
(3, 1, 3, 1, NOW()),
(4, 2, 4, 1, NOW()),
(5, 2, 5, 1, NOW()),
(6, 3, 6, 1, NOW()),
(7, 3, 7, 1, NOW()),
(8, 4, 8, 1, NOW()),
(9, 4, 9, 1, NOW()),
(10, 5, 10, 1, NOW()),
(11, 5, 11, 1, NOW()),
(12, 6, 12, 1, NOW()),
(13, 7, 13, 1, NOW()),
(14, 7, 14, 1, NOW()),
(15, 8, 15, 1, NOW()),
(16, 9, 16, 1, NOW()),
(17, 10, 17, 1, NOW());
SELECT setval('feedback_comment_id_seq', (SELECT MAX(id) FROM feedback_comment));

-- Insert into regrade_requests
INSERT INTO regrade_requests (id, feedback_comment_id, regrade_state, student_comment, created_at)
VALUES
(1, 2, 'REGRADE_REQUESTED', 'I believe my app correctly records chocolate consumption. Could you please re-evaluate?', NOW()),
(2, 5, 'REGRADE_REQUESTED', 'Could you check the parsing module again? I made some updates.', NOW()),
(3, 9, 'REGRADE_REQUESTED', 'I think my encryption algorithm meets the efficiency standards.', NOW()),
(4, 11, 'REGRADE_REQUESTED', 'The GPS tracking should be accurate now.', NOW()),
(5, 13, 'REGRADE_REQUESTED', 'I improved the website responsiveness.', NOW()),
(6, 16, 'REGRADE_REQUESTED', 'Found additional vulnerabilities, please review.', NOW());
SELECT setval('regrade_requests_id_seq', (SELECT MAX(id) FROM regrade_requests));

