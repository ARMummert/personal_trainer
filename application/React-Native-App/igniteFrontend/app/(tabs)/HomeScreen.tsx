import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const HomeScreen = () => {
  const [workouts, setWorkouts] = useState<{ id: number; title: string }[]>([]);

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

  const renderItem = ({ item }: { item: { id: number; title: string } }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        renderItem={renderItem}
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
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
