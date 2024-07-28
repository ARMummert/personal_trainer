-- Ignite Database DML
-- CS476 Capstone Project - AI Coder
-- Alexander Dembo, Amy Mummert, Frank Hodges
-- Updated July 22nd, 2024

-- 
-- Database: 'capstone_2024_ignite_db'
--

-- Account Signup Generate UserID
INSERT INTO UserLogins (Name, Username, Password) VALUES (%s, %s, %s)

-- Account Signup Generate UserInfo
INSERT INTO UserInfo (UserID, DateCreated) VALUES (%s, UNIX_TIMESTAMP())

--Reset password check if email exists
SELECT * FROM UserLogins WHERE Email = %

-- Reset password with token
UPDATE UserLogins SET Password = %s WHERE Email = %s

--Reset username fetch user
SELECT UserID FROM UserLogins WHERE Username = %s

--Reset username update username
UPDATE UserLogins SET Username = %s WHERE UserID = %s

--Get user data
SELECT * FROM UserInfo WHERE UserID = %s