-- Active: 1721004590667@@35.236.84.144@3306
-- Ignite Database DML
-- CS476 Capstone Project - AI Coder
-- Alexander Dembo, Amy Mummert, Frank Hodges
-- Updated July 22nd, 2024

-- 
-- Database: 'capstone_2024_ignite_db'
--

-- Account Profile Screen
SELECT UserInfo.UserID AS ID, UserLogins.Username AS Username, Name, Email, WorkoutStreak, WorkoutsCompleted FROM UserInfo 
    INNER JOIN UserLogins ON UserInfo.UserID = UserLogins.userID

-- Complete Survey
INSERT INTO SurveyInfo (UserID, GenderID, FitnessGoalID, BodyTypeID, FitnessLevelID, ActivityLevelID) 
    VALUES (UserID, GenderID, FitnessGoalID, BodyTypeID, FitnessLevelID, ActivityLevelID)

-- Survey Results Screen
SELECT SurveyInfo.SurveyID AS ID, FitnessGoals.FitnessGoalName, FitnessLevels.FitnessLevelName, BodyTypes.BodyTypeName FROM SurveyInfo 
    INNER JOIN FitnessGoals ON SurveyInfo.FitnessGoalID = FitnessGoals.FitnessGoalID 
    INNER JOIN FitnessLevels ON SurveyInfo.FitnessLevelID = FitnessLevels.FitnessLevelID 
    INNER JOIN BodyTypes ON SurveyInfo.BodyTypeID = BodyTypes.BodyTypeID

-- Workout Screen
SELECT Workouts.WorkoutName AS Name, Exercises.ExerciseName, WorkoutsToExercises.Sets, WorkoutsToExercises.Reps, WorkoutsToExercises.Weight FROM Workouts 
    INNER JOIN WorkoutsToExercises ON Workouts.WorkoutID = WorkoutsToExercises.WorkoutID
    INNER JOIN Exercises ON WorkoutsToExercises.ExerciseID = Exercises.ExerciseID
    INNER JOIN UsersToWorkouts ON UsersToWorkouts.WorkoutID = Workouts.WorkoutID
    WHERE UsersToWorkouts.WorkoutID = WorkoutID

-- Home/Dashboard Screen
SELECT Workouts.WorkoutName AS Name, Workouts.WorkoutID AS ID FROM Workouts 
    INNER JOIN UsersToWorkouts ON UsersToWorkouts.WorkoutID = Workouts.WorkoutID
    WHERE UsersToWorkouts.WorkoutID = UserID

-- Create Profile
INSERT INTO UserInfo (Name, Email, Age, AvatarID)
    VALUES (Name, Email, Age, AvatarID)
SELECT UserID FROM UserInfo WHERE Name = Name
INSERT INTO UserLogins (Username, Password, UserID)
    VALUES (Username, Password, UserID)
