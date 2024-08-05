-- phpMyAdmin SQL Dump
-- version 5.2.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 05, 2024 at 02:49 PM
-- Server version: 10.6.17-MariaDB-log
-- PHP Version: 8.2.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;

--
-- Database: `capstone_2024_ignite_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `Activities`
--

CREATE TABLE `Activities` (
  `ActivityID` int(11) NOT NULL,
  `ActivityName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Activities`
--

INSERT INTO `Activities` (`ActivityID`, `ActivityName`) VALUES
(1, 'Running'),
(2, 'Walking'),
(3, 'Swimming'),
(4, 'Weight Lifting'),
(5, 'Team Sports'),
(6, 'Yoga/Pilates'),
(7, 'Other');

-- --------------------------------------------------------

--
-- Table structure for table `ActivityLevels`
--

CREATE TABLE `ActivityLevels` (
  `ActivityLevelID` int(11) NOT NULL,
  `ActivityLevelName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `ActivityLevels`
--

INSERT INTO `ActivityLevels` (`ActivityLevelID`, `ActivityLevelName`) VALUES
(1, '0-2 days'),
(2, '3-5 days'),
(3, '6-7 days');

-- --------------------------------------------------------

--
-- Table structure for table `BodyTypes`
--

CREATE TABLE `BodyTypes` (
  `BodyTypeID` int(11) NOT NULL,
  `BodyTypeName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `BodyTypes`
--

INSERT INTO `BodyTypes` (`BodyTypeID`, `BodyTypeName`) VALUES
(1, 'I don\'t know'),
(2, 'Endomorph (rounded build)'),
(3, 'Ectomorph (slim build)'),
(4, 'Mesomorph (muscular build)');

-- --------------------------------------------------------

--
-- Table structure for table `Challenges`
--

CREATE TABLE `Challenges` (
  `ChallengeID` int(11) NOT NULL,
  `ChallengeName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Challenges`
--

INSERT INTO `Challenges` (`ChallengeID`, `ChallengeName`) VALUES
(1, 'Lack of motivation'),
(2, 'Time constraints'),
(3, 'Access to equipment/facilties'),
(4, 'Difficulty with certain exercises'),
(5, 'Pain or Injury'),
(6, 'Nutrition'),
(7, 'Other');

-- --------------------------------------------------------

--
-- Table structure for table `FitnessGoals`
--

CREATE TABLE `FitnessGoals` (
  `FitnessGoalID` int(11) NOT NULL,
  `FitnessGoalName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `FitnessGoals`
--

INSERT INTO `FitnessGoals` (`FitnessGoalID`, `FitnessGoalName`) VALUES
(1, 'Lose weight'),
(2, 'Build muscle'),
(3, 'Improve strength'),
(4, 'Increase endurance'),
(5, 'Enhance flexibility'),
(6, 'Improve overall health'),
(7, 'Other');

-- --------------------------------------------------------

--
-- Table structure for table `FitnessLevels`
--

CREATE TABLE `FitnessLevels` (
  `FitnessLevelID` int(11) NOT NULL,
  `FitnessLevelName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `FitnessLevels`
--

INSERT INTO `FitnessLevels` (`FitnessLevelID`, `FitnessLevelName`) VALUES
(1, 'Beginner'),
(2, 'Intermediate'),
(3, 'Advanced');

-- --------------------------------------------------------

--
-- Table structure for table `Genders`
--

CREATE TABLE `Genders` (
  `GenderID` int(11) NOT NULL,
  `GenderName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Genders`
--

INSERT INTO `Genders` (`GenderID`, `GenderName`) VALUES
(1, 'Female'),
(2, 'Male'),
(3, 'Non-Binary'),
(4, 'Prefer not to say');

-- --------------------------------------------------------

--
-- Table structure for table `SurveyInfo`
--

CREATE TABLE `SurveyInfo` (
  `SurveyID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `GenderID` int(11) NOT NULL,
  `FitnessGoalID` int(11) NOT NULL,
  `BodyTypeID` int(11) NOT NULL,
  `FitnessLevelID` int(11) NOT NULL,
  `ActivityLevelID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SurveyToActivities`
--

CREATE TABLE `SurveyToActivities` (
  `SurveyID` int(11) NOT NULL,
  `ActivityID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SurveyToChallenges`
--

CREATE TABLE `SurveyToChallenges` (
  `SurveyID` int(11) NOT NULL,
  `ChallengeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UserInfo`
--

CREATE TABLE `UserInfo` (
  `UserInfoID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `WorkoutsCompleted` int(11) NOT NULL DEFAULT 0,
  `AvatarID` varchar(100) NOT NULL DEFAULT '../igniteFrontend/assets/images/avatardarkpink.png',
  `SurveyID` int(11) DEFAULT NULL,
  `DateCreated` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UserLogins`
--

CREATE TABLE `UserLogins` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(45) NOT NULL,
  `Password` varchar(256) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Workouts`
--

CREATE TABLE `Workouts` (
  `WorkoutID` int(11) NOT NULL,
  `WorkoutName` varchar(45) NOT NULL,
  `BodyTypeID` int(11) NOT NULL,
  `FitnessGoalID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Workouts`
--

INSERT INTO `Workouts` (`WorkoutID`, `WorkoutName`, `BodyTypeID`, `FitnessGoalID`) VALUES
(1, 'High-Intensity Interval Training', 3, 1),
(2, 'Circuit Training', 3, 1),
(3, 'Running', 3, 1),
(4, 'Cycling', 3, 1),
(5, 'Resistance Training', 3, 1),
(6, 'Compound Movements', 3, 2),
(7, 'Deadlifts', 3, 3),
(8, 'Bench Press', 3, 3),
(9, 'Squats', 3, 3),
(10, 'Powerlifting', 3, 3),
(11, 'Long-Distance Running', 3, 4),
(12, 'Swimming', 3, 4),
(13, 'Cycling', 3, 4),
(14, 'Rowing', 3, 4),
(15, 'Yoga', 3, 5),
(16, 'Pilates', 3, 5),
(17, 'Dynamic Stretching', 3, 5),
(18, 'Mobility Work', 3, 5),
(19, 'Circuit Training', 4, 1),
(20, 'High-Intensity Interval Training', 4, 1),
(21, 'Steady-State Cardio', 4, 1),
(22, 'Hypertrophy Training', 4, 2),
(23, 'Bodybuilding', 4, 2),
(24, 'Olympic Lifts', 4, 3),
(25, 'Powerlifting', 4, 3),
(26, 'Yoga', 4, 5),
(27, 'Dynamic Stretching', 4, 5),
(28, 'Active Recovery Workouts', 4, 5),
(29, 'Cycling', 4, 4),
(30, 'Rowing', 4, 4),
(31, 'Running', 4, 4),
(32, 'Circuit Training', 2, 1),
(33, 'High-Intensity Cardio', 2, 1),
(34, 'High-Intensity Interval Training', 2, 1),
(35, 'Powerlifting', 2, 3),
(36, 'Functional Movements', 2, 3),
(37, 'High-Intensity Cardio', 2, 4),
(38, 'Interval Training', 2, 4),
(39, 'Swimming', 2, 4),
(40, 'Yoga', 2, 5),
(41, 'Pilates', 2, 5),
(42, 'Static Stretching', 2, 5),
(43, 'Focus on Joint Mobility', 2, 5),
(44, 'Flexibility Work', 2, 6);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Activities`
--
ALTER TABLE `Activities`
  ADD PRIMARY KEY (`ActivityID`);

--
-- Indexes for table `ActivityLevels`
--
ALTER TABLE `ActivityLevels`
  ADD PRIMARY KEY (`ActivityLevelID`);

--
-- Indexes for table `BodyTypes`
--
ALTER TABLE `BodyTypes`
  ADD PRIMARY KEY (`BodyTypeID`);

--
-- Indexes for table `Challenges`
--
ALTER TABLE `Challenges`
  ADD PRIMARY KEY (`ChallengeID`);

--
-- Indexes for table `FitnessGoals`
--
ALTER TABLE `FitnessGoals`
  ADD PRIMARY KEY (`FitnessGoalID`);

--
-- Indexes for table `FitnessLevels`
--
ALTER TABLE `FitnessLevels`
  ADD PRIMARY KEY (`FitnessLevelID`);

--
-- Indexes for table `Genders`
--
ALTER TABLE `Genders`
  ADD PRIMARY KEY (`GenderID`);

--
-- Indexes for table `SurveyInfo`
--
ALTER TABLE `SurveyInfo`
  ADD PRIMARY KEY (`SurveyID`),
  ADD KEY `SurveyInfo_ibfk_1` (`UserID`),
  ADD KEY `SurveyInfo_ibfk_2` (`GenderID`),
  ADD KEY `SurveyInfo_ibfk_3` (`FitnessGoalID`),
  ADD KEY `SurveyInfo_ibfk_4` (`BodyTypeID`),
  ADD KEY `SurveyInfo_ibfk_5` (`FitnessLevelID`),
  ADD KEY `SurveyInfo_ibfk_6` (`ActivityLevelID`);

--
-- Indexes for table `SurveyToActivities`
--
ALTER TABLE `SurveyToActivities`
  ADD KEY `UserToActivities_ibfk_1` (`SurveyID`),
  ADD KEY `UserToActivities_ibfk_2` (`ActivityID`);

--
-- Indexes for table `SurveyToChallenges`
--
ALTER TABLE `SurveyToChallenges`
  ADD KEY `UserToChallenges_ibfk_1` (`SurveyID`),
  ADD KEY `UserToChallenges_ibfk_2` (`ChallengeID`);

--
-- Indexes for table `UserInfo`
--
ALTER TABLE `UserInfo`
  ADD PRIMARY KEY (`UserInfoID`),
  ADD KEY `UserInfo_ibfk_1` (`AvatarID`),
  ADD KEY `UserInfo_ibfk_2` (`SurveyID`),
  ADD KEY `UserInfo_ibfk_3` (`UserID`);

--
-- Indexes for table `UserLogins`
--
ALTER TABLE `UserLogins`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Username` (`Username`);

--
-- Indexes for table `Workouts`
--
ALTER TABLE `Workouts`
  ADD PRIMARY KEY (`WorkoutID`),
  ADD KEY `Workouts_ibfk_1` (`BodyTypeID`),
  ADD KEY `Workouts_ibfk_2` (`FitnessGoalID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Activities`
--
ALTER TABLE `Activities`
  MODIFY `ActivityID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `ActivityLevels`
--
ALTER TABLE `ActivityLevels`
  MODIFY `ActivityLevelID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `BodyTypes`
--
ALTER TABLE `BodyTypes`
  MODIFY `BodyTypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Challenges`
--
ALTER TABLE `Challenges`
  MODIFY `ChallengeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `FitnessGoals`
--
ALTER TABLE `FitnessGoals`
  MODIFY `FitnessGoalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `FitnessLevels`
--
ALTER TABLE `FitnessLevels`
  MODIFY `FitnessLevelID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Genders`
--
ALTER TABLE `Genders`
  MODIFY `GenderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `SurveyInfo`
--
ALTER TABLE `SurveyInfo`
  MODIFY `SurveyID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `UserInfo`
--
ALTER TABLE `UserInfo`
  MODIFY `UserInfoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `UserLogins`
--
ALTER TABLE `UserLogins`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `Workouts`
--
ALTER TABLE `Workouts`
  MODIFY `WorkoutID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `SurveyInfo`
--
ALTER TABLE `SurveyInfo`
  ADD CONSTRAINT `SurveyInfo_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `UserInfo` (`UserInfoID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `SurveyInfo_ibfk_2` FOREIGN KEY (`GenderID`) REFERENCES `Genders` (`GenderID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `SurveyInfo_ibfk_3` FOREIGN KEY (`FitnessGoalID`) REFERENCES `FitnessGoals` (`FitnessGoalID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `SurveyInfo_ibfk_4` FOREIGN KEY (`BodyTypeID`) REFERENCES `BodyTypes` (`BodyTypeID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `SurveyInfo_ibfk_5` FOREIGN KEY (`FitnessLevelID`) REFERENCES `FitnessLevels` (`FitnessLevelID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `SurveyInfo_ibfk_6` FOREIGN KEY (`ActivityLevelID`) REFERENCES `ActivityLevels` (`ActivityLevelID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `SurveyToActivities`
--
ALTER TABLE `SurveyToActivities`
  ADD CONSTRAINT `SurveyToActivities_ibfk_1` FOREIGN KEY (`SurveyID`) REFERENCES `SurveyInfo` (`SurveyID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `SurveyToActivities_ibfk_2` FOREIGN KEY (`ActivityID`) REFERENCES `Activities` (`ActivityID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `SurveyToChallenges`
--
ALTER TABLE `SurveyToChallenges`
  ADD CONSTRAINT `SurveyToChallenges_ibfk_1` FOREIGN KEY (`SurveyID`) REFERENCES `SurveyInfo` (`SurveyID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `SurveyToChallenges_ibfk_2` FOREIGN KEY (`ChallengeID`) REFERENCES `Challenges` (`ChallengeID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `UserInfo`
--
ALTER TABLE `UserInfo`
  ADD CONSTRAINT `UserInfo_ibfk_2` FOREIGN KEY (`SurveyID`) REFERENCES `SurveyInfo` (`SurveyID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `UserInfo_ibfk_3` FOREIGN KEY (`UserID`) REFERENCES `UserLogins` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Workouts`
--
ALTER TABLE `Workouts`
  ADD CONSTRAINT `Workouts_ibfk_1` FOREIGN KEY (`BodyTypeID`) REFERENCES `BodyTypes` (`BodyTypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `Workouts_ibfk_2` FOREIGN KEY (`FitnessGoalID`) REFERENCES `FitnessGoals` (`FitnessGoalID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;
