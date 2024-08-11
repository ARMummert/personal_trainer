import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Button, Alert, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

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
      console.log('Fetched exercises:', data.exerciseName);
      
      
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  const handleCompleteWorkout = async () => {
    try {
        const storedUsername = await AsyncStorage.getItem('Username');
      console.log('Stored username:', storedUsername);
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
        console.log('Workouts completed:', workouts.length);

        console.log('Workout completed successfully');
        navigation.reset({
          index: 0,
          routes: [{ name: 'PostWorkoutScreen' }],
        });
       
        Alert.alert("Success", "Workout completed successfully!");
        const confirm = window.confirm('Workout Completed Succesfully! Would you like to return to the home screen?');
        if (!confirm) {
          return;
        }
        // Optionally, update local state or trigger a re-render
      } else {
        Alert.alert("Error", "Failed to complete the workout.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while completing the workout.");
      console.error(error);
    }
  };

  const handleRemoveExercise = async (exercise_id: number, workout_id: number) => {
    console.log('exercise_id:', exercise_id);
    console.log('workout_id:', workout_id);
    const confirm = window.confirm('Are you sure you want to delete this exercise?');
    if (!confirm) {
      return;
    }
    if (!exercises) {
      console.error("Exercises array is undefined");
      return;
    }
    const updatedExercises = exercises.filter(exercise => exercise.id !== exercise_id);

    setExercises(updatedExercises);
};

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={styles.container}>
        <Text style={styles.welcomeHeader}>Daily Workout</Text>
        <Text style={styles.welcomeText}>Enjoy Your Workout, {username}!</Text>
      <View style={styles.cardcontainer}>
      {/* Render Workout Names */}
      {workouts.length > 0 ? (
      workouts.map((workout, index) => (
      <View key={index}>
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
              <LinearGradient style={styles.gradient2} colors={['#F83600', '#FE8C00']}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleRemoveExercise(Number(exercise.id), Number(workout.id))}>
                  <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              </LinearGradient>
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
    marginBottom: 50, 
  },
  cardcontainer: {
    width: '80%',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
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
    width: '100%',
    marginBottom: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
    width: '100%',
    padding: 20,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: 'white',
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
    fontSize: 24,
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
});
export default DailyWorkoutScreen;