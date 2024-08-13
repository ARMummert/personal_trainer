// Filename: HomeScreen.tsx
import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, Button, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

interface Homeprops {
  navigation: NavigationProp<any>;
}
const HomeScreen: React.FC<Homeprops> = ({ navigation }) => {
  const [Username, setUserName] = useState('');

  const getUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('Username');
      console.log('Stored username:', storedUsername);
      if (!storedUsername) {
        throw new Error('No username found in storage');
      }
      setUserName(storedUsername);
  } catch (error) {
    console.error('Error getting username:', error);
    Alert.alert('Error', 'An error occurred. Please try again.');
  }
};
  useEffect(() => {
    getUsername();
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
      <Text style={styles.descriptionText}>
        Start your fitness journey today with our daily workouts.{'\n'}{'\n'}
      </Text>
      <LinearGradient style={styles.gradient2} colors={['#F83600', '#FE8C00']}>
        <View>
        <TouchableOpacity 
        style={{ backgroundColor: 'transparent', justifyContent: 'center', borderRadius: 5 }}
        onPress={() => navigation.navigate('DailyWorkoutScreen')}
      >
        <Text style={{ color: 'white', fontSize: 18, width: 180, textAlign: 'center', fontWeight: 'bold' }}>
          Start Daily Workout
        </Text>
      </TouchableOpacity>
        </View>
      </LinearGradient>
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
    fontSize: 44,
    color: 'white',
    marginTop: 20,
    fontFamily: 'Alkatra-VariableFront_wght',
    textAlign: 'center',
    justifyContent: 'center',
  },
  descriptionText: {
    fontSize: 20,
    color: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Alkatra-VariableFront_wght',
  },
  button: {
    backgroundColor: 'transparent',
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
  gradient2: {
    width: 200,
    padding: 10,
    marginBottom: 55,
    borderRadius: 5,
  },
});

export default HomeScreen;
