import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

interface DailyWorkoutprops {
  navigation: NavigationProp<any>;
}
const DailyWorkoutScreen: React.FC<DailyWorkoutprops> = ({ navigation }) => {
    const [Username, setUserName] = useState('');
    const [Workouts, setWorkouts] = useState('');
    const [WorkoutID, setWorkoutID] = useState('');
    const [WorkoutName, setWorkoutName] = useState('');
    

    const getWorkouts = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('Username');
      console.log('Stored username:', storedUsername);
      if (!storedUsername) {
        throw new Error('No username found in storage');
      }
      setUserName(storedUsername);

      const response = await fetch(`http://localhost:5000/api/workouts/${storedUsername}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const data = await response.json();
      setWorkouts(data);
      setWorkoutID(data.WorkoutID);
      setWorkoutName(data.WorkoutName);
      console.log('Fetched workouts:', data);
      console.log('WorkoutID:', WorkoutID);
      console.log('WorkoutName:', WorkoutName);

    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };
  useEffect(() => {
    getWorkouts();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'black'}}>
      <View style={styles.container}>
        <Text style={styles.welcomeHeader}>Daily Workout</Text>
        <Text style={styles.welcomeText}>Welcome, {Username}</Text>
        <Text style={styles.descriptionText}>
          Enjoy Your Workout!{'\n'}{'\n'}
        </Text>
        <View style={styles.cardcontainer}>
         <Text style={styles.workoutName}>{Workouts}</Text>
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
  },
  gradient: {
    width: '100%',
    marginBottom: 15,
  },
 
});
export default DailyWorkoutScreen;