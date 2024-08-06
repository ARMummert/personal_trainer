// Filename: HomeScreen.tsx
import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationProp, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Homeprops {
  navigation: NavigationProp<any>;
}
const HomeScreen: React.FC<Homeprops> = ({ navigation }) => {
  const [Username, setUserName] = useState('');
  const [Workouts, setWorkouts] = useState([]);

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
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };
  useEffect(() => {
    getWorkouts();
  }, []);

  const renderWorkout = ({ item }: { item: any }) => (
    <View style={styles.workoutCard}>
      <Text style={styles.workoutName}>{item.WorkoutName}</Text>
      <Button title="Start Workout" />
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/fitappimage.jpg')} style={styles.headerImage} resizeMode="cover"  />
      <Text style={styles.welcomeText}>Welcome, {Username}</Text>
      <Text style={styles.descriptionText}>
        Track your fitness journey and your daily workouts, all in one place.
      </Text>
      <FlatList
        data={Workouts}
        renderItem={renderWorkout}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
 
  card: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 10,
    borderRadius: 5,
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Alkatra-VariableFront_wght',
  },
  headerImage: {
    width: '100%',
    height: 200,
  },
  workoutCard: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 10,
    borderRadius: 5,
  },
  workoutName: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Alkatra-VariableFront_wght',
  },

  welcomeText: {
    fontSize: 24,
    color: 'white',
    marginTop: 20,
    fontFamily: 'Alkatra-VariableFront_wght',
  },

  descriptionText: {
    fontSize: 20,
    color: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Alkatra-VariableFront_wght',
  },
 
});
export default HomeScreen;
