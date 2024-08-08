import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

interface PostWorkoutprops {
  navigation: NavigationProp<any>;
}

const PostWorkoutScreen: React.FC<PostWorkoutprops> = ({ navigation }) => {    
    const [Username, setUserName] = useState('');
    const [WorkoutIntensity, setWorkoutIntensity] = useState([]);
    const [WorkoutIntensityLevel, setWorkoutIntensityLevel] = useState('');

    const getWorkoutIntensity = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('Username');
      console.log('Stored username:', storedUsername);
      if (!storedUsername) {
        throw new Error('No username found in storage');
      }
      setUserName(storedUsername);

      const response = await fetch(`http://localhost:5000/api/workouts/${storedUsername}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: storedUsername, workoutIntensity: 'high' }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const data = await response.json();
      setWorkoutIntensity(data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
    }
    useEffect(() => {
        getWorkoutIntensity();
    }, []);

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
        </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
    },
    headerImage: {
      width: '100%',
      height: 200,
    },
    gradient: {
      width: '100%',
      alignItems: 'center',
      padding: 10,
    },
    welcomeText: {
      color: 'white',
      fontSize: 30,
      fontFamily: 'AguafinaScript-Regular',
    },
    paragraphText: {
      color: '#FE8C00',
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
    });

export default PostWorkoutScreen;