import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

const WorkoutScreen = () => {
  const route = useRoute();
  const workoutId = (route.params as { workoutId: string })?.workoutId;
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/workouts/${workoutId}`); // Replace with your backend endpoint
        const data = await response.json();
        setWorkout(data);
      } catch (error) {
        console.error('Error fetching workout:', error);
      }
    };

    fetchWorkout();
  }, [workoutId]);

  if (!workout) {
    return <Text>Loading...</Text>;
  }

  const renderExercise = ({ item }) => (
    <View style={styles.exerciseCard}>
      <Text>{item.exerciseName}</Text>
      {/* Add other exercise details here */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.workoutTitle}>{workout.workoutName}</Text>
      <FlatList
        data={workout.exercises}
        renderItem={renderExercise}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};





export default WorkoutScreen;