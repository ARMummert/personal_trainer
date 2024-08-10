import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

interface DailyWorkoutprops {
  navigation: NavigationProp<any>;
}

const DailyWorkoutScreen: React.FC<DailyWorkoutprops> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  interface Workout {
    Exercises: any[];
    WorkoutName: string;
    Description: string;
    Sets: number;
    Reps: number;
    Duration: number;
  }
  
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [exercises, setExercises] = useState<any[]>([]);
  const [workoutName, setWorkoutName] = useState('');

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
      setWorkouts(data); // Ensure these are lowercase as they match the response structure
      setWorkoutName(data.workoutName);
      setExercises(data.exercises);
      setExercises(data.exerciseName);
      console.log('Fetched workouts:', data.workouts);
      
      
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  useEffect(() => {
    getWorkouts();
  }, []);

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
});
export default DailyWorkoutScreen;