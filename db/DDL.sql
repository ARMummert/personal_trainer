SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
CREATE DATABASE IF NOT EXISTS `capstone_2024_ignite_db` DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci;
USE `capstone_2024_ignite_db`;

CREATE TABLE `Activities` (
  `ActivityID` int(11) NOT NULL,
  `ActivityName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `Activities` (`ActivityID`, `ActivityName`) VALUES
(1, 'Running'),
(2, 'Walking'),
(3, 'Swimming'),
(4, 'Weight Lifting'),
(5, 'Team Sports'),
(6, 'Yoga/Pilates'),
(7, 'Other');

CREATE TABLE `ActivityLevels` (
  `ActivityLevelID` int(11) NOT NULL,
  `ActivityLevelName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `ActivityLevels` (`ActivityLevelID`, `ActivityLevelName`) VALUES
(1, '0 days'),
(2, '1-2 days'),
(3, '3-4 days'),
(4, '5-6 days'),
(5, '7 days');

CREATE TABLE `Avatars` (
  `AvatarID` int(11) NOT NULL,
  `AvatarName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

CREATE TABLE `BodyTypes` (
  `BodyTypeID` int(11) NOT NULL,
  `BodyTypeName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `BodyTypes` (`BodyTypeID`, `BodyTypeName`) VALUES
(1, 'I don\'t know'),
(2, 'Endomorph (rounded build)'),
(3, 'Ectomorph (slim build)'),
(4, 'Mesomorph (muscular build)');

CREATE TABLE `Challenges` (
  `ChallengeID` int(11) NOT NULL,
  `ChallengeName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `Challenges` (`ChallengeID`, `ChallengeName`) VALUES
(1, 'Lack of motivation'),
(2, 'Time constraints'),
(3, 'Access to equipment/facilties'),
(4, 'Difficulty with certain exercises'),
(5, 'Pain or Injury'),
(6, 'Nutrition'),
(7, 'Other');

CREATE TABLE `Exercise` (
  `ExerciseID` int(11) NOT NULL,
  `ExerciseName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

CREATE TABLE `FitnessGoals` (
  `FitnessGoalID` int(11) NOT NULL,
  `FitnessGoalName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `FitnessGoals` (`FitnessGoalID`, `FitnessGoalName`) VALUES
(1, 'Lose weight'),
(2, 'Build muscle'),
(3, 'Improve strength'),
(4, 'Increase endurance'),
(5, 'Enhance flexibility'),
(6, 'Improve overall health'),
(7, 'Other');

CREATE TABLE `FitnessLevels` (
  `FitnessLevelID` int(11) NOT NULL,
  `FitnessLevelName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `FitnessLevels` (`FitnessLevelID`, `FitnessLevelName`) VALUES
(1, 'Beginner'),
(2, 'Intermediate'),
(3, 'Advanced');

CREATE TABLE `Genders` (
  `GenderID` int(11) NOT NULL,
  `GenderName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `Genders` (`GenderID`, `GenderName`) VALUES
(1, 'Female'),
(2, 'Male'),
(3, 'Non-Binary'),
(4, 'Prefer not to say');

CREATE TABLE `SurveyInfo` (
  `SurveyID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `GenderID` int(11) NOT NULL,
  `FitnessGoalID` int(11) NOT NULL,
  `BodyTypeID` int(11) NOT NULL,
  `FitnessLevelID` int(11) NOT NULL,
  `ActivityLevelID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

CREATE TABLE `UserInfo` (
  `UserID` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `Age` int(11) NOT NULL,
  `WorkoutStreak` int(11) NOT NULL DEFAULT 0,
  `WorkoutsCompleted` int(11) NOT NULL DEFAULT 0,
  `AvatarID` int(11) NOT NULL DEFAULT 1,
  `SurveyID` int(11) NOT NULL DEFAULT 0,
  `DateCreated` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

CREATE TABLE `UserLogins` (
  `Username` varchar(45) NOT NULL,
  `Password` varchar(45) NOT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

CREATE TABLE `UsersToWorkouts` (
  `UserID` int(11) NOT NULL,
  `WorkoutID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

CREATE TABLE `UserToActivities` (
  `SurveyID` int(11) NOT NULL,
  `ActivityID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

CREATE TABLE `UserToChallenges` (
  `SurveyID` int(11) NOT NULL,
  `ChallengeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

CREATE TABLE `UserToExcercises` (
  `UserID` int(11) NOT NULL,
  `ExerciseID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

CREATE TABLE `Workouts` (
  `WorkoutID` int(11) NOT NULL,
  `WorkoutName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

CREATE TABLE `WorkoutsToExercises` (
  `WorkoutID` int(11) NOT NULL,
  `ExerciseID` int(11) NOT NULL,
  `Sets` int(11) NOT NULL,
  `Reps` int(11) NOT NULL,
  `Weight` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;


ALTER TABLE `Activities`
  ADD PRIMARY KEY (`ActivityID`);

ALTER TABLE `ActivityLevels`
  ADD PRIMARY KEY (`ActivityLevelID`);

ALTER TABLE `Avatars`
  ADD PRIMARY KEY (`AvatarID`);

ALTER TABLE `BodyTypes`
  ADD PRIMARY KEY (`BodyTypeID`);

ALTER TABLE `Challenges`
  ADD PRIMARY KEY (`ChallengeID`);

ALTER TABLE `Exercise`
  ADD PRIMARY KEY (`ExerciseID`);

ALTER TABLE `FitnessGoals`
  ADD PRIMARY KEY (`FitnessGoalID`);

ALTER TABLE `FitnessLevels`
  ADD PRIMARY KEY (`FitnessLevelID`);

ALTER TABLE `Genders`
  ADD PRIMARY KEY (`GenderID`);

ALTER TABLE `SurveyInfo`
  ADD PRIMARY KEY (`SurveyID`);

ALTER TABLE `UserInfo`
  ADD PRIMARY KEY (`UserID`);

ALTER TABLE `UserLogins`
  ADD PRIMARY KEY (`Username`);

ALTER TABLE `UserToActivities`
  ADD KEY `UserToActivities_ibfk_1` (`SurveyID`),
  ADD KEY `UserToActivities_ibfk_2` (`ActivityID`);

ALTER TABLE `Workouts`
  ADD PRIMARY KEY (`WorkoutID`);


ALTER TABLE `Activities`
  MODIFY `ActivityID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

ALTER TABLE `ActivityLevels`
  MODIFY `ActivityLevelID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `Avatars`
  MODIFY `AvatarID` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `BodyTypes`
  MODIFY `BodyTypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `Challenges`
  MODIFY `ChallengeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

ALTER TABLE `Exercise`
  MODIFY `ExerciseID` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `FitnessGoals`
  MODIFY `FitnessGoalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

ALTER TABLE `FitnessLevels`
  MODIFY `FitnessLevelID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `Genders`
  MODIFY `GenderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `SurveyInfo`
  MODIFY `SurveyID` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `UserInfo`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `Workouts`
  MODIFY `WorkoutID` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `SurveyInfo`
  ADD CONSTRAINT `SurveyInfo_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `UserInfo` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `SurveyInfo_ibfk_2` FOREIGN KEY (`GenderID`) REFERENCES `Genders` (`GenderID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `SurveyInfo_ibfk_3` FOREIGN KEY (`FitnessGoalID`) REFERENCES `FitnessGoals` (`FitnessGoalID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `SurveyInfo_ibfk_4` FOREIGN KEY (`BodyTypeID`) REFERENCES `BodyTypes` (`BodyTypeID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `SurveyInfo_ibfk_5` FOREIGN KEY (`FitnessLevelID`) REFERENCES `FitnessLevels` (`FitnessLevelID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `SurveyInfo_ibfk_6` FOREIGN KEY (`ActivityLevelID`) REFERENCES `ActivityLevels` (`ActivityLevelID`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `UserInfo`
  ADD CONSTRAINT `UserInfo_ibfk_1` FOREIGN KEY (`AvatarID`) REFERENCES `Avatars` (`AvatarID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `UserInfo_ibfk_2` FOREIGN KEY (`SurveyID`) REFERENCES `SurveyInfo` (`SurveyID`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `UserLogins`
  ADD CONSTRAINT `userID` FOREIGN KEY (`userID`) REFERENCES `UserInfo` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `UsersToWorkouts`
  ADD CONSTRAINT `UsersToWorkouts_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `UserInfo` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UsersToWorkouts_ibfk_2` FOREIGN KEY (`WorkoutID`) REFERENCES `Workouts` (`WorkoutID`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `UserToActivities`
  ADD CONSTRAINT `UserToActivities_ibfk_1` FOREIGN KEY (`SurveyID`) REFERENCES `SurveyInfo` (`SurveyID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UserToActivities_ibfk_2` FOREIGN KEY (`ActivityID`) REFERENCES `Activities` (`ActivityID`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `UserToChallenges`
  ADD CONSTRAINT `UserToChallenges_ibfk_1` FOREIGN KEY (`SurveyID`) REFERENCES `SurveyInfo` (`SurveyID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UserToChallenges_ibfk_2` FOREIGN KEY (`ChallengeID`) REFERENCES `Challenges` (`ChallengeID`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `UserToExcercises`
  ADD CONSTRAINT `UserToExcercises_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `UserInfo` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UserToExcercises_ibfk_2` FOREIGN KEY (`ExerciseID`) REFERENCES `Exercise` (`ExerciseID`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `WorkoutsToExercises`
  ADD CONSTRAINT `WorkoutsToExercises_ibfk_1` FOREIGN KEY (`WorkoutID`) REFERENCES `Workouts` (`WorkoutID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `WorkoutsToExercises_ibfk_2` FOREIGN KEY (`ExerciseID`) REFERENCES `Exercise` (`ExerciseID`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;
