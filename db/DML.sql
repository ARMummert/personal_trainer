-- Ignite Database DML
-- CS476 Capstone Project - AI Coder
-- Alexander Dembo, Amy Mummert, Frank Hodges
-- Updated July 22nd, 2024

-- 
-- Database: 'capstone_2024_ignite_db'
--

-- Insert a new user into the UserInfo table to generate the UserID
INSERT INTO UserInfo (Name) VALUES (%s)

-- Insert user login data into the UserLogins table using the generated UserID
INSERT INTO UserLogins (UserID, Username, Password) VALUES (%s, %s, %s)

-- Check if the email exists in the database
SELECT * FROM UserLogins WHERE Username = %s

-- Reset password with token
UPDATE UserLogins SET Password = %s WHERE Email = %s

--Reset username fetch user
SELECT UserID FROM UserLogins WHERE Username = %s

--Reset username update username
UPDATE UserLogins SET Username = %s WHERE Username = %s

--Get user data
SELECT * FROM UserInfo WHERE UserID = %s