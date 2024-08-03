// Filename: HomeScreen.tsx
import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation(); 
  const route = useRoute();
  const {Username} = route.params as { Username: string } || { Username: '' };
  const [workouts, setWorkouts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        setIsLoggedIn(true);
      } else {
        Alert.alert('You must be logged in to view this page');
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/workouts${UserID}');
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
      <Button title="Start Workout" />
    </View>
  );

    if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={{  padding: 20, color: 'white', fontSize: 20, textAlign: 'center' }}>You must be logged in to access this page.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen' as never)} style={{ backgroundColor: '#EB2000', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 15 }}>
          <Text style={{  color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Login </Text>
        </TouchableOpacity>
      </View>
    );
  }

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
