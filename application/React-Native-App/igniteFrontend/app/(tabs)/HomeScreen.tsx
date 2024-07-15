// Filename: HomeScreen.tsx
import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import WorkoutScreen from './WorkoutScreen'; 

const HomeScreen = () => {
  const navigation = useNavigation(); 
  const route = useRoute();
  const {Username} = route.params as { Username: string } || { Username: '' };
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/workouts');
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, []);

  const renderWorkout = ({ item }: { item: any }) => (
    <View style={styles.workoutCard}>
      <Text style={styles.workoutName}>{item.WorkoutName}</Text>
      <Button title="Start Workout" onPress={() => navigation.navigate('WorkoutScreen' )} />
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
        data={workouts}
        renderItem={renderWorkout}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.card}>
        <Text style={styles.cardText}>Welcome to the Home Screen!</Text>
      </View>
   
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
    fontSize: 18,
    fontWeight: 'bold',
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
    fontSize: 18,
    fontWeight: 'bold',
  },

  welcomeText: {
    fontSize: 24,
    color: 'white',
    marginTop: 20,
  },

  descriptionText: {
    fontSize: 16,
    color: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    textAlign: 'center',
  },

});

export default HomeScreen;