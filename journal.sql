CREATE DATABASE journal;
use journal;

select * from journalLogs;
CREATE TABLE journalLogs (
	journalId INT PRIMARY KEY AUTO_INCREMENT,
    journalContent VARCHAR(400),
    journalDate DATE
    );
    
ALTER TABLE journalLogs
MODIFY COLUMN journalDate DATETIME;    

UPDATE journalLogs
SET journalTitle = "First" WHERE journalId = 1;
    
INSERT INTO journalLogs (journalContent, journalDate)
VALUES ("First log for testing", NOW());