CREATE DATABASE todolist;
use todolist;

select * from tasks;
CREATE TABLE tasks (
	taskId INT PRIMARY KEY AUTO_INCREMENT,
    task VARCHAR(60),
    taskDate date,
    taskStatus ENUM("complete", "incomplete", "recorded")
    );
    
ALTER TABLE tasks
ADD COLUMN isEditing BOOL;
    
INSERT INTO tasks (task, taskDate, taskStatus, isEditing, wrapperId, taskForDate)
    VALUES ("test task", NOW(), "incomplete", false, 1, "2024-06-22");
  --  `, [task, id, forDate])
    
    
UPDATE tasks
SET taskForDate = "2024-04-19" WHERE taskId = 4;

ALTER TABLE tasks 
ADD COLUMN taskForDate DATE;

ALTER TABLE tasks
ADD COLUMN wrapperId INT,
ADD CONSTRAINT fk_constraint
FOREIGN KEY (wrapperId) REFERENCES wrappers (wrapperId);
    
INSERT INTO tasks (task, taskDate, taskStatus)
VALUES ("set up meeting with Alex for js labs", NOW(), "incomplete"),
	   ("practice code forces problems", NOW(), "incomplete");

UPDATE tasks
SET task = "meet with ICPC group at 5 4/18" WHERE taskId = 4;

# select clause for getTodos function
SELECT task, taskStatus FROM tasks
WHERE taskStatus = "incomplete" OR "complete";

select * from wrappers;
CREATE TABLE wrappers (
	wrapperId INT PRIMARY KEY AUTO_INCREMENT,
    wrapperName VARCHAR(25),
    wrapperType ENUM("Classes", "Extracurriculars", "Personal")
);

INSERT INTO wrappers (wrapperName, wrapperType, wrapperStatus)
VALUES
("Test List", "Personal", "active");

UPDATE wrappers
SET wrapperStatus = "active" WHERE wrapperId > 0;

ALTER TABLE wrappers
MODIFY COLUMN wrapperType ENUM("Classes", "Extracurriculars", "Personal", "Daily", "Weekly", "Long Term");

ALTER TABLE wrappers
ADD COLUMN wrapperStatus ENUM("active", "inactive");

UPDATE wrappers
SET wrapperStatus = "active" WHERE wrapperId >= 1;

INSERT INTO wrappers (wrapperName, wrapperType)
VALUES ("School Main", "Classes"),
	   ("ACM/ICPC", "Extracurriculars"),
       ("Future Plans", "Long Term");
       
DELETE FROM wrappers WHERE wrapperId > 3;

select * from users;
CREATE TABLE Users (
	Username VARCHAR(30),
    Pass VARCHAR(30),
    Keyword VARCHAR(10)
    );