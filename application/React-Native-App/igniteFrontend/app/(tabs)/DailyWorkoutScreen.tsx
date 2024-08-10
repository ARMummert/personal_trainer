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
  const [workouts, setWorkouts] = useState<string[]>([]);
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
        <Text style={styles.welcomeText}>Welcome, {username}</Text>
        <Text style={styles.descriptionText}>
          Enjoy Your Workout!{'\n'}{'\n'}
        </Text>

        <View style={styles.cardcontainer}>
          {/* Render Workout Names */}
          {workouts.length > 0 ? (
            workouts.map((workout, index) => (
              <Text key={index} style={styles.workoutName}>{workout}</Text>
            
            ))
          ) : (
            <Text style={styles.workoutName}>No Workouts Found</Text>
          )}

          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.gradient}
          />
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
    borderRadius: 5,
    backgroundColor: 'white',
    height: 200,
  },
  cardText: {
    fontSize: 20,
    fontFamily: 'Alkatra-VariableFront_wght',
    color: 'black',
  },
  welcomeText: {
    fontSize: 44,
    color: 'white',
    fontFamily: 'Alkatra-VariableFront_wght',
    textAlign: 'center',
    justifyContent: 'center',
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
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Alkatra-VariableFront_wght',
    color: 'black',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
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
 
});
export default DailyWorkoutScreen;