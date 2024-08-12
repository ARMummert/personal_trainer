-- phpMyAdmin SQL Dump
-- version 5.2.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 12, 2024 at 01:27 PM
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
(2, 'Endomorph'),
(3, 'Ectomorph'),
(4, 'Mesomorph');

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
-- Table structure for table `Exercises`
--

CREATE TABLE `Exercises` (
  `ExerciseID` int(11) NOT NULL,
  `ExerciseName` varchar(255) NOT NULL,
  `Sets` int(11) NOT NULL,
  `Reps` int(11) NOT NULL,
  `ExerciseDescription` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Exercises`
--

INSERT INTO `Exercises` (`ExerciseID`, `ExerciseName`, `Sets`, `Reps`, `ExerciseDescription`) VALUES
(1, 'Squats ', 2, 15, 'Place your hands on your hips and feet shoulder width apart. Bend at the knees and keep your back straight. Squat down to a seated position then stand up.  '),
(2, 'Jumping Jacks', 2, 10, 'Jump - Hands Together Feet Apart and Alternate'),
(3, 'Walking Lunges', 4, 10, 'Place your hands on your hips.  Walk one step forward keeping your opposite foot on the floor. Kneel towards the floor with the back leg without touching it.  Keep going until you are in a one leg squat and stand up.  '),
(4, 'Wall Pushups', 2, 10, 'A standard push-up but with your hands placed on a wall.'),
(5, '30 Second Knee Plank', 2, 0, 'Place your hands shoulder width apart on the floor as well as your knees.  Walk your hands forward until your back and thighs are straight. Do a standard pushup from there.'),
(6, 'Mountain Climbers', 2, 20, 'Get into a push up position and bring one knee to your chest.  Alternate legs doing 10 reps on one side and 10 on the other.'),
(7, '30 Second Plank', 2, 0, 'Get into a pushup position and place your elbows on the floor while keeping your back and legs straight. Hold this position for 30 seconds.'),
(8, 'Modified Burpees', 2, 15, 'Get into a pushup position and both legs to the chest at the same time placing your feet on the floor.  Stand up and jump towards the sealing.  '),
(9, 'Jumping Jack Burpees', 2, 25, 'Start by doing 10 jumping jacks then into a push up position and perform one pushup. Bring both knees to your chest at the same and jump up towards the ceiling and repeat.'),
(10, 'Weight Squats', 3, 20, 'Perform a normal squat with your preferred weight.  You can use dumbbells or any type of object that has some weight to it.  '),
(11, 'Single Leg Squats', 4, 8, 'Perform a squat with one leg at a time. Alternate legs each set.'),
(12, 'Decline Pushups', 2, 15, 'Place your legs on an elevated surface and perform a standard pushup.'),
(13, 'Chair Dips', 2, 15, 'Perform a regular dip with your hands on the seat of a chair.'),
(14, 'Incline Pushups', 2, 15, 'Perform a standard pushup with your hands placed on something sturdy, like your stairs, keeping your feet on the floor.  '),
(15, 'Bodyweight Rows', 2, 10, 'Find a sturdy bar or table and hold onto it. While maintaining a straight back and tightening your abs pull yourself towards the table and repeat.'),
(16, 'Dead Bug', 2, 10, 'Lie on your back with legs raised and arms extended. Slowly lower one arm and opposite leg towards the ground, then return to starting position. Perform reps on alternating sides.\r\n'),
(17, 'Split Squats', 2, 15, 'Use a chair or bench behind you for balance. Step forward with one leg and lower your body until your back knee nearly touches the ground. Push back up through your front heel. Perform reps on alternating legs.\r\n'),
(18, 'L-Sit Hold', 2, 0, 'Sit on the ground with your legs extended straight out in front of you and your back leaning back slightly. Lift your hips off the ground so your body forms an L-shape. Hold for 45 seconds.'),
(19, 'Jump Squats', 2, 15, 'Perform a deep squat and explode upwards into a jump. Land softly and immediately go into your next squat.\r\n'),
(20, 'Negative Pullups', 3, 10, 'Find a sturdy pull-up bar: Jump up to the top of a pull-up position, then slowly lower yourself down for a controlled descent.\r\n'),
(21, 'Hollow Body Hold with Leg Raises', 2, 20, ' Lie on your back with legs raised and arms extended overhead. Engage your core to keep your lower back pressed into the ground. Slowly lower one leg towards the ground while maintaining a slight arch in your back. Raise the leg back to starting position '),
(22, 'Burpees with Push-up Hold', 2, 10, 'Perform a full burpee, but pause for a second in the plank position with your chest close to the ground before continuing the jump squat.\r\n'),
(23, 'Plank with Shoulder Taps', 2, 0, 'Hold a high plank position. Tap one hand to your shoulder and then switch to the other hand, maintaining a stable core throughout. Hold for 30 seconds.\r\n'),
(24, 'Jump Squats with Pause', 2, 15, 'Perform a deep squat and explode upwards into a jump. Pause for a second at the top before landing softly and immediately going into your next squat.\r\n'),
(25, 'Single-leg Squats with Hold', 2, 15, 'Lower yourself down on one leg until your thigh is parallel to the ground. Pause for a second at the bottom before pushing back up through your heel to return to starting position. Perform reps on alternating legs.\r\n'),
(26, 'Decline Push-ups with Pause', 2, 15, 'Perform a decline push-up (feet elevated on a bench or chair). Pause for a second at the bottom with your chest close to the ground before pushing back up explosively.\r\n'),
(27, 'L-sit Hold with Leg Raises', 2, 12, 'Hold an L-sit position with your legs extended straight out in front of you and your back leaning back slightly. Slowly lower one leg towards the ground while maintaining a slight arch in your back and your core engaged. Raise the leg back to the L-sit po'),
(28, 'Pushups', 2, 10, 'Perform a standard pushup while keeping your back and legs straight.'),
(29, 'Circuit 1 - High Knees, Jumping Jacks, Bodyweight Squats', 4, 10, 'Perform 10 reps of high knees, jumping jacks, and bodyweight squats a total of 4 times. 1 minute reset between sets'),
(30, 'Circuit 2 - Mountain Climbers, Lunges, Plank', 4, 10, 'Perform 10 reps of mountain climbers, lunges, and plank for a total of 4 times.  1 minute rest between sets.'),
(31, 'Circuit 3 - Modified Burpees, Knee Pushups', 4, 10, 'Perform 10 modified burpees or knee pushups for a total of 4 times. 1 minute reset between sets.'),
(32, 'Circuit 4 - Jumping Jacks, High Knees w/ Butt Kicks, Squats w/ Jumps', 4, 15, 'Perform 15 reps of Jumping Jacks, High Knees w/ Butt Kicks, Squats w/ Jumps for a total of 4 times.'),
(33, 'Circuit 5 - Mountain Climbers with leg extensions, Lateral lunges (alternating sides), Side plank (hold each side)\r\n', 4, 15, 'Perform 15 reps of Mountain Climbers with leg extensions, Lateral lunges (alternating sides), Side plank (hold each side) for a total of 4 times.'),
(34, 'Circuit 6 - Full Burpees, Decline Pushups (modify on incline if needed)\r\n', 4, 15, 'Perform 15 repos of Full Burpees and Decline Pushups for a total of 4 times.'),
(35, 'Circuit 7 - Double Unders (jump rope variation) or Jumping Jacks with high knees, Jumping Lunges (alternating legs), Box Jumps (modify with step if needed)\r\n', 0, 0, 'Perform Double Unders (jump rope variation) or Jumping Jacks with high knees, Jumping Lunges (alternating legs), Box Jumps (modify with step if needed) for a total of 4 times.\r\n'),
(36, 'Circuit 8 - Sprinter Sit-ups (explosive sit-ups with leg extension), Single-leg Squats (Pistol Squats) - alternate legs per round, Hollow Body Hold with leg raises (alternate legs per round)\r\n', 5, 20, 'Perform 20 reps of Sprinter Sit-ups (explosive sit-ups with leg extension), Single-leg Squats (Pistol Squats) - alternate legs per round, Hollow Body Hold with leg raises (alternate legs per round) for a total of 5 times.\r\n'),
(37, 'Circuit 9 - Tuck Jumps (jump and tuck knees to chest), Decline Push-ups with shoulder taps (alternate shoulders per round)\r\n\r\n', 5, 20, 'Perform 20 reps of Tuck Jumps (jump and tuck knees to chest), Decline Push-ups with shoulder taps (alternate shoulders per round) a total of four times.  Rest 30 seconds between sets.\r\n\r\n'),
(38, 'Neck Rolls', 2, 10, 'Slowly roll your head in a circular motion, forward and backward.\r\n'),
(39, 'Arm Circles', 2, 10, 'Make small circles forward and backward with both arms.\r\n'),
(40, 'Torso Twists', 2, 10, 'Stand with feet shoulder-width apart and twist your torso from side to side, reaching your arms overhead in the opposite direction.\r\n'),
(41, 'Hamstring Stretch', 2, 10, 'Sit on the floor with legs extended and reach for your toes. If you can\'t reach your toes, hold onto your hamstrings or calves.\r\n'),
(42, 'Quad Stretch', 2, 10, ' Stand on one leg and pull your other foot up behind you, grabbing your foot or ankle to pull your heel towards your glutes.\r\n'),
(43, 'Calf Stretch', 2, 10, 'Stand facing a wall, place your hands on the wall and step back with one leg, keeping your heel flat on the ground. Lean into the wall and feel the stretch in your calf.\r\n'),
(44, 'Butterfly Stretch', 2, 10, 'Sit on the floor with the soles of your feet together and gently press your knees down towards the ground.\r\n'),
(45, 'Neck Side Bends', 2, 10, 'Gently tilt your head towards one shoulder, bringing your ear closer to your shoulder.\r\n'),
(46, 'Arm Circles with Variations', 2, 10, 'Make larger circles forward and backward with both arms, or perform arm circles with your arms overhead.\r\n'),
(47, 'Standing Side Bends', 2, 10, 'Stand with feet shoulder-width apart and reach your arm overhead on one side while bending your torso towards the opposite hip.\r\n'),
(48, 'High Lunge Stretch', 2, 10, 'Step forward with one leg and lunge down, keeping your back knee on the ground. Reach for your front foot or ankle.'),
(49, 'Figure-Four Stretch', 2, 10, 'Lie on your back and cross one ankle over the opposite thigh, just above the knee. Pull the back of your knee towards your chest.\r\n'),
(50, 'Calf Stretch with Wall Walk', 2, 10, 'Same as the beginner calf stretch, but slowly walk your hands closer to the wall as you hold the stretch.\r\n'),
(51, 'Pigeon Pose', 2, 10, 'Start in a downward-facing dog position, slide one knee forward between your hands and lower your hips towards the ground.\r\n'),
(52, 'Neck Rotations', 2, 10, 'Slowly rotate your head in a circular motion, both clockwise and counter-clockwise.\r\n'),
(53, 'Arm Circles with Pulses', 2, 10, 'Make large circles forward and backward with both arms, pulsing or bouncing slightly at the end of each range of motion.\r\n'),
(54, 'Standing Arabesque', 2, 10, 'Stand on one leg with the other leg extended straight back, reaching for your toes and keeping your back straight.\r\n'),
(55, 'Lizard Pose', 2, 10, 'Start in a downward-facing dog position, lower your forearms down to the ground and step one leg forward between your hands.\r\n'),
(56, 'Straddle Stretch', 2, 10, 'Sit on the floor with legs extended in a V-shape and lean forward, reaching for your toes or ankles.\r\n'),
(57, 'Glute Bridge with Single Leg Extension', 2, 10, 'Lie on your back with knees bent and feet flat on the floor. Lift your hips off the ground and extend one leg straight up towards the ceiling.\r\n'),
(58, 'Standing Forward Fold with Hamstring Grab', 2, 10, 'Stand with feet shoulder-width apart and hinge at the hips to fold forward, reaching for your toes or ankles. If you can\'t reach your toes, grab your hamstrings or calves.\r\n');

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
  `AvatarID` int(11) NOT NULL,
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
  `Email` varchar(45) NOT NULL,
  `WorkoutsCompleted` int(11) NOT NULL,
  `LastWorkoutTime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
-- --------------------------------------------------------

--
-- Table structure for table `Workouts`
--

CREATE TABLE `Workouts` (
  `WorkoutID` int(11) NOT NULL,
  `WorkoutName` varchar(45) NOT NULL,
  `FitnessGoalID` int(11) DEFAULT NULL,
  `BodyTypeID` int(11) DEFAULT NULL,
  `WorkoutDescription` varchar(255) NOT NULL,
  `WorkoutDuration` int(11) NOT NULL,
  `WorkoutSets` int(11) NOT NULL,
  `WorkoutReps` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Workouts`
--

INSERT INTO `Workouts` (`WorkoutID`, `WorkoutName`, `FitnessGoalID`, `BodyTypeID`, `WorkoutDescription`, `WorkoutDuration`, `WorkoutSets`, `WorkoutReps`) VALUES
(2, 'Burn It Up', 2, 2, 'Burn it Up is designed to help you build muscle for your body type - Endomorph.', 30, 4, 15),
(3, 'Strength & Power', 2, 1, 'Strength & Power is designed to help you build muscle.  ', 30, 0, 0),
(4, 'Strength & Stamina', 2, 3, 'Strength & Stamina is designed to build muscle for your body type - Ectomorph', 30, 0, 0),
(5, 'Circuit Four', 2, 4, 'HIIT Blast is designed to build muscle for your body type - Mesomorph', 30, 0, 0),
(6, 'Calorie Crusher', 1, 1, 'Calorie Crush is designed to help you lose weight.', 30, 0, 0),
(7, 'Shred & Shed', 1, 2, 'Shred & Shed is designed to help you lose weight for your body type - Endomorph', 30, 0, 0),
(8, 'Weight Loss Warrior', 1, 3, 'Weight Loss Warrior is designed to help you lost weight for your body type - Ectomorph', 30, 0, 0),
(9, 'Cut & Burn', 1, 4, 'Cut & Burn is designed to help you lose weight for your bodytype - Mesomorph', 30, 0, 0),
(10, 'Circuit Nine', 3, 1, '', 0, 0, 0),
(11, 'Circuit Ten', 3, 2, '', 0, 0, 0),
(12, 'Circuit Eleven', 3, 3, '', 0, 0, 0),
(13, 'Circuit Thirteen', 3, 4, '', 0, 0, 0),
(14, 'Circuit Fourteen', 4, 1, '', 0, 0, 0),
(15, 'Circuit Fifteen', 4, 2, '', 0, 0, 0),
(16, 'Circuit Sixteen', 4, 3, '', 0, 0, 0),
(17, 'Circuit Fourteen', 4, 4, '', 0, 0, 0),
(18, 'Circuit Seventeen', 5, 1, '', 0, 0, 0),
(19, 'Circuit Eighteen', 5, 2, '', 0, 0, 0),
(20, 'Circuit Nineteen', 5, 3, '', 0, 0, 0),
(21, 'Circuit Twenty', 5, 4, '', 0, 0, 0),
(22, 'Circuit Twenty One', 6, 1, '', 0, 0, 0),
(23, 'Circuit Twenty Two', 6, 2, '', 0, 0, 0),
(24, 'Circuit Twenty Three', 6, 3, '', 0, 0, 0),
(25, 'Circuit Twenty Four', 6, 4, '', 0, 0, 0),
(26, 'Circuit Twenty Five', 7, 1, '', 0, 0, 0),
(27, 'Circuit Twenty Six', 7, 2, '', 0, 0, 0),
(28, 'Circuit Twenty Seven', 7, 3, '', 0, 0, 0),
(29, 'Circuit Twenty Eight', 7, 4, '', 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `WorkoutsExercises`
--

CREATE TABLE `WorkoutsExercises` (
  `WorkoutID` int(11) NOT NULL,
  `ExerciseID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `WorkoutsExercises`
--

INSERT INTO `WorkoutsExercises` (`WorkoutID`, `ExerciseID`) VALUES
(2, 1),
(2, 4),
(2, 5),
(2, 8),
(2, 11),
(2, 14),
(2, 20),
(2, 29),
(2, 30),
(3, 6),
(3, 7),
(3, 22),
(3, 28),
(3, 30),
(4, 1),
(4, 5),
(4, 6),
(4, 7),
(4, 25),
(5, 19),
(5, 21),
(5, 22),
(5, 24),
(5, 25),
(6, 3),
(6, 6),
(6, 9),
(6, 23),
(6, 28),
(6, 32),
(7, 3),
(7, 5),
(7, 8),
(7, 9),
(7, 13),
(7, 18),
(8, 1),
(8, 7),
(8, 8),
(8, 15),
(8, 16),
(9, 30),
(9, 32);

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
-- Indexes for table `Exercises`
--
ALTER TABLE `Exercises`
  ADD PRIMARY KEY (`ExerciseID`);

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
  ADD UNIQUE KEY `FitnessGoalID` (`FitnessGoalID`,`BodyTypeID`);

--
-- Indexes for table `WorkoutsExercises`
--
ALTER TABLE `WorkoutsExercises`
  ADD PRIMARY KEY (`WorkoutID`,`ExerciseID`);

--
-- AUTO_INCREMENT for table `Activities`
--
ALTER TABLE `Activities`
  MODIFY `ActivityID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ActivityLevels`
--
ALTER TABLE `ActivityLevels`
  MODIFY `ActivityLevelID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `BodyTypes`
--
ALTER TABLE `BodyTypes`
  MODIFY `BodyTypeID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Challenges`
--
ALTER TABLE `Challenges`
  MODIFY `ChallengeID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Exercises`
--
ALTER TABLE `Exercises`
  MODIFY `ExerciseID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `FitnessGoals`
--
ALTER TABLE `FitnessGoals`
  MODIFY `FitnessGoalID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `FitnessLevels`
--
ALTER TABLE `FitnessLevels`
  MODIFY `FitnessLevelID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Genders`
--
ALTER TABLE `Genders`
  MODIFY `GenderID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `SurveyInfo`
--
ALTER TABLE `SurveyInfo`
  MODIFY `SurveyID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `UserInfo`
--
ALTER TABLE `UserInfo`
  MODIFY `UserInfoID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `UserLogins`
--
ALTER TABLE `UserLogins`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Workouts`
--
ALTER TABLE `Workouts`
  MODIFY `WorkoutID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `WorkoutsExercises`
--
ALTER TABLE `WorkoutsExercises`
  MODIFY `WorkoutID` int(11) NOT NULL AUTO_INCREMENT;

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
