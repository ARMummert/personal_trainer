import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

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
    <ScrollView>
    <View style={styles.container}>
      <Image source={require('../../assets/images/fitappimage.jpg')} style={styles.headerImage} resizeMode="cover"  />
      <LinearGradient style={styles.gradient} colors={['#F83600', '#FE8C00']}>
        <Text style={[styles.welcomeText, { display: 'flex', fontFamily: 'AguafinaScript-Regular', fontSize: 55 }]}>
          <Text style={styles.paragraphText}>Get</Text> <Text>Fit</Text>, <Text style={styles.paragraphText}>Feel</Text> <Text>Fierce</Text>
        </Text>
      </LinearGradient>
      <Text style={styles.welcomeText}>Welcome, {Username}</Text>
      <Text style={styles.descriptionText}>
       Enjoy Today's Workout!{'\n'}{'\n'}
      </Text>
      <FlatList
        data={Workouts}
        renderItem={renderWorkout}
        keyExtractor={(item) => item.id.toString()}
      />
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
  welcomeText: {
    fontSize: 44,
    color: 'white',
    marginTop: 20,
    fontFamily: 'Alkatra-VariableFront_wght',
    textAlign: 'center',
    justifyContent: 'center',
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
export default HomeScreen;