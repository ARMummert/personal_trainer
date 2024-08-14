import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { time } from 'console';

interface DailyWorkoutprops {
  navigation: NavigationProp<any>;
}

const DailyWorkoutScreen: React.FC<DailyWorkoutprops> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  interface Workout {
    id: string; // Add the 'id' property
    Exercises: any[];
    WorkoutName: string;
    Description: string;
    Duration: number;
  }

  interface Exercise {
    id: number;
    ExerciseName: string;
    Sets: number;
    Reps: number;
    Description: string;
  }
  
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>(workouts.length > 0 ? workouts[0].Exercises : []);
  const [workoutTime, setWorkoutTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Start the timer when the component mounts
  useEffect(() => {
    if (isTimerRunning) {
      const timer = setInterval(() => {
        setWorkoutTime(prevTime => prevTime + 1); // Increment the timer every second
      }, 1000);

      return () => clearInterval(timer); // Clear the timer when the component unmounts
    }
  }, [isTimerRunning]);

  // Format workout time as MM:SS
  const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  

  const getWorkouts = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('Username');
      console.log('Stored username:', storedUsername);
      if (!storedUsername) {
        throw new Error('No username found in storage');
      }
      setUsername(storedUsername);
      
      const response = await fetch(`http://localhost:5000/api/workouts/${storedUsername}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
  
      const data = await response.json();
      setWorkouts(data || []); // Ensure these are lowercase as they match the response structure
      setWorkoutName(data.workoutName);
      setExercises(data.exercises  || []);
      setExercises(data.exerciseName);
      
      
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };
  
  useEffect(() => {
    getWorkouts();
  }, []);

  const handleCompleteWorkout = async () => {
    try {
      // Stop the timer
      const finalWorkoutTime = workoutTime;
      clearInterval(finalWorkoutTime);
     
      await AsyncStorage.setItem('WorkoutTime', JSON.stringify(finalWorkoutTime));
      
      const storedUsername = await AsyncStorage.getItem('Username'); 
      if (!storedUsername) {
        throw new Error('No username found in storage');
      }
      setUsername(storedUsername);
      
      const response = await fetch(`http://localhost:5000/api/workouts/${storedUsername}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ WorkoutsCompleted: workouts.length }),
      });

      if (response.status === 200) {
        await AsyncStorage.setItem(`${storedUsername}_WorkoutsCompleted`, JSON.stringify(workouts.length));
      
        navigation.reset({
          index: 0,
          routes: [{ name: 'PostWorkoutScreen' }],
        });
       
        Alert.alert("Success", "Workout completed successfully!");
        const confirm = window.confirm('Workout Completed Succesfully!');
        if (!confirm) {
          return;
        }
    
      } else {
        Alert.alert("Error", "Failed to complete the workout.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while completing the workout.");
      console.error(error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={styles.container}>
        <Text style={styles.welcomeHeader}>Daily Workout</Text>
        <Text style={styles.welcomeText}>Enjoy Your Workout, {username}!</Text>
        <Text style={styles.timerText}>Workout Time: {formatTime(workoutTime)}</Text>
      <View>
      {/* Render Workout Names */}
      {workouts.length > 0 ? (
      workouts.map((workout, index) => (
      <View style={styles.container2} key={index}>
        <LinearGradient style={styles.gradient} colors={['#F83600', '#FE8C00']}>
        <Text style={styles.workoutName}>{workout.WorkoutName}</Text>
        </LinearGradient>
        <Text style={styles.workoutDescription}>{workout.Description}</Text>  
        <Text style={styles.workoutDescription}>
          Duration: {workout.Duration} mins
        </Text>
        {/* Render Exercises for each Workout */}
        {workout.Exercises && workout.Exercises.length > 0 ? (
          workout.Exercises.map((exercise: any, exIndex) => (
            <View key={exIndex} style={styles.exerciseContainer}>
              <Text style={styles.workoutDescription}>{exercise.ExerciseName}</Text>
              <Text style={styles.workoutDescription}>
                Sets: {exercise.Sets} | Reps: {exercise.Reps}
              </Text>
              <Text style={styles.exerciseDescription}>{exercise.Description}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noExercises}>No Exercises Found</Text>
        )}
      </View>
      ))
    ) : (
      <Text style={styles.workoutName}>No Workouts Found</Text>
    )}

      </View>
          <LinearGradient style={styles.gradient3} colors={['#F83600', '#FE8C00']}>
            <TouchableOpacity
                style={styles.button2}
                onPress={() => handleCompleteWorkout()}>
                  <Text style={styles.buttonText}>Complete Workout</Text>
            </TouchableOpacity>
          </LinearGradient>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
  },
  cardText: {
    fontSize: 24,
    fontFamily: 'Alkatra-VariableFront_wght',
    color: 'black',
  },
  welcomeText: {
    fontSize: 44,
    color: 'white',
    fontFamily: 'Alkatra-VariableFront_wght',
    textAlign: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  welcomeHeader: {
    fontSize: 50,
    color: 'white',
    marginTop: 20,
    marginBottom: 45,
    fontFamily: 'Alkatra-VariableFront_wght',
    textAlign: 'center',
    justifyContent: 'center',
  },
  workoutName: {
    fontSize: 44,
    fontWeight: 'bold',
    fontFamily: 'AguafinaScript-Regular',
    color: 'black',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 20,
    color: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Alkatra-VariableFront_wght',
  },
  paragraphText: {
    fontSize: 45,
    fontFamily: 'Alkatra-VariableFront_wght',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    color: 'black',
  },
  gradient: {
    width: '80%',
    height: 220,
    borderRadius: 5,
    marginBottom: -90,
    padding: 20,
    alignContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },
  gradient2: {
    borderRadius: 5,
    height: 40,
    width: 170,
    marginBottom: 15,
    alignContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },
  gradient3: {
    borderRadius: 5,
    height: 50,
    width: 185,
    marginBottom: 15,
    marginTop: 40,
    alignContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },
  exerciseContainer: {
    width: '80%',
    padding: 20,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Alkatra-VariableFront_wght',
    color: 'black',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
  noExercises: {
    fontSize: 20,
    fontFamily: 'Alkatra-VariableFront_wght',
    color: 'black',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
  workoutDescription: {
    fontSize: 20,
    width: '80%',
    fontFamily: 'Alkatra-VariableFront_wght',
    color: 'black',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
  },
  exerciseDescription: {
    fontSize: 24,
    fontFamily: 'Alkatra-VariableFront_wght',
    color: 'black',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  button2: { 
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'Alkatra-VariableFront_wght',
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 24,
    fontFamily: 'Alkatra-VariableFront_wght',
    color: 'white',
    marginBottom: 20,
    marginTop: 20,
  },
});
export default DailyWorkoutScreen;