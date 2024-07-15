-- MySQL Script generated by MySQL Workbench
-- Sun Jul 14 14:49:22 2024
-- Model: IgniteDB   Version: 1.0

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- -----------------------------------------------------
-- Schema IgniteDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `IgniteDB` DEFAULT CHARACTER SET utf8 ;
SHOW WARNINGS;
USE `IgniteDB` ;

-- -----------------------------------------------------
-- Table `IgniteDB`.`Activities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `IgniteDB`.`Activities` (
  `ActivityID` INT NOT NULL AUTO_INCREMENT,
  `ActivityName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ActivityID`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `IgniteDB`.`ActivityLevels`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `IgniteDB`.`ActivityLevels` (
  `ActivityLevelID` INT NOT NULL AUTO_INCREMENT,
  `ActivityLevelName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ActivityLevelID`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `IgniteDB`.`Avatars`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `IgniteDB`.`Avatars` (
  `AvatarID` INT NOT NULL AUTO_INCREMENT,
  `AvatarName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`AvatarID`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `IgniteDB`.`BodyTypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `IgniteDB`.`BodyTypes` (
  `BodyTypeID` INT NOT NULL AUTO_INCREMENT,
  `BodyTypeName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`BodyTypeID`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `IgniteDB`.`Challenges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `IgniteDB`.`Challenges` (
  `ChallengeID` INT NOT NULL AUTO_INCREMENT,
  `ChallengeName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ChallengeID`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `IgniteDB`.`Exercise`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `IgniteDB`.`Exercise` (
  `ExerciseID` INT NOT NULL AUTO_INCREMENT,
  `ExerciseName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ExerciseID`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `IgniteDB`.`FitnessGoals`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `IgniteDB`.`FitnessGoals` (
  `FitnessGoalID` INT NOT NULL AUTO_INCREMENT,
  `FitnessGoalName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`FitnessGoalID`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `IgniteDB`.`FitnessLevels`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `IgniteDB`.`FitnessLevels` (
  `FitnessLevelID` INT NOT NULL AUTO_INCREMENT,
  `FitnessLevelName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`FitnessLevelID`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `IgniteDB`.`Genders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `IgniteDB`.`Genders` (
  `GenderID` INT NOT NULL AUTO_INCREMENT,
  `GenderName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`GenderID`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `IgniteDB`.`SurveyInfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `IgniteDB`.`SurveyInfo` (
  `SurveyID` INT NOT NULL AUTO_INCREMENT,
  `UserID` INT NOT NULL,
  `GenderID` INT NOT NULL,
  `FitnessGoalID` INT NOT NULL,
  `BodyTypeID` INT NOT NULL,
  `FitnessLevelID` INT NOT NULL,
  `ActivityLevelID` INT NOT NULL,
  PRIMARY KEY (`SurveyID`),
    FOREIGN KEY (`UserID`)
    REFERENCES `IgniteDB`.`UserInfo` (`UserID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`GenderID`)
    REFERENCES `IgniteDB`.`Genders` (`GenderID`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
    FOREIGN KEY (`FitnessGoalID`)
    REFERENCES `IgniteDB`.`FitnessGoals` (`FitnessGoalID`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
    FOREIGN KEY (`BodyTypeID`)
    REFERENCES `IgniteDB`.`BodyTypes` (`BodyTypeID`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
    FOREIGN KEY (`FitnessLevelID`)
    REFERENCES `IgniteDB`.`FitnessLevels` (`FitnessLevelID`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
    FOREIGN KEY (`ActivityLevelID`)
    REFERENCES `IgniteDB`.`ActivityLevels` (`ActivityLevelID`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `IgniteDB`.`UserInfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `IgniteDB`.`UserInfo` (
  `UserID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Age` INT NOT NULL,
  `WorkoutStreak` INT NOT NULL DEFAULT 0,
  `WorkoutsCompleted` INT NOT NULL DEFAULT 0,
  `AvatarID` INT NOT NULL DEFAULT 1,
  `SurveyID` INT NOT NULL DEFAULT 0,
  `DateCreated` DATE NOT NULL,
  PRIMARY KEY (`UserID`),
    FOREIGN KEY (`AvatarID`)
    REFERENCES `IgniteDB`.`Avatars` (`AvatarID`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
    FOREIGN KEY (`SurveyID`)
    REFERENCES `IgniteDB`.`SurveyInfo` (`SurveyID`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `IgniteDB`.`UserLogins`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `IgniteDB`.`UserLogins` (
  `Username` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  `userID` INT NOT NULL,
  PRIMARY KEY (`Username`),
    FOREIGN KEY (`userID`)
    REFERENCES `IgniteDB`.`UserInfo` (`UserID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `IgniteDB`.`UserToActivities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `IgniteDB`.`UserToActivities` (
  `SurveyID` INT NOT NULL,
  `ActivityID` INT NOT NULL,
    FOREIGN KEY (`SurveyID`)
    REFERENCES `IgniteDB`.`SurveyInfo` (`SurveyID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`ActivityID`)
    REFERENCES `IgniteDB`.`Activities` (`ActivityID`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `IgniteDB`.`UserToChallenges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `IgniteDB`.`UserToChallenges` (
  `SurveyID` INT NOT NULL,
  `ChallengeID` INT NOT NULL,
    FOREIGN KEY (`SurveyID`)
    REFERENCES `IgniteDB`.`SurveyInfo` (`SurveyID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`ChallengeID`)
    REFERENCES `IgniteDB`.`Challenges` (`ChallengeID`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `IgniteDB`.`UserToExcercises`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `IgniteDB`.`UserToExcercises` (
  `UserID` INT NOT NULL,
  `ExerciseID` INT NOT NULL,
    FOREIGN KEY (`UserID`)
    REFERENCES `IgniteDB`.`UserInfo` (`UserID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`ExerciseID`)
    REFERENCES `IgniteDB`.`Exercise` (`ExerciseID`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `IgniteDB`.`UsersToWorkouts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `IgniteDB`.`UsersToWorkouts` (
  `UserID` INT NOT NULL,
  `WorkoutID` INT NOT NULL,
    FOREIGN KEY (`UserID`)
    REFERENCES `IgniteDB`.`UserInfo` (`UserID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`WorkoutID`)
    REFERENCES `IgniteDB`.`Workouts` (`WorkoutID`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `IgniteDB`.`Workouts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `IgniteDB`.`Workouts` (
  `WorkoutID` INT NOT NULL AUTO_INCREMENT,
  `WorkoutName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`WorkoutID`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `IgniteDB`.`WorkoutsToExercises`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `IgniteDB`.`WorkoutsToExercises` (
  `WorkoutID` INT NOT NULL,
  `ExerciseID` INT NOT NULL,
  `Sets` INT NOT NULL,
  `Reps` INT NOT NULL,
  `Weight` INT NOT NULL,
    FOREIGN KEY (`WorkoutID`)
    REFERENCES `IgniteDB`.`Workouts` (`WorkoutID`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
    FOREIGN KEY (`ExerciseID`)
    REFERENCES `IgniteDB`.`Exercise` (`ExerciseID`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
