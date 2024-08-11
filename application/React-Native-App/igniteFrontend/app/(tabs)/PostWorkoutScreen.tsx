import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';

interface PostWorkoutprops {
  navigation: NavigationProp<any>;
}

const PostWorkoutScreen: React.FC<PostWorkoutprops> = ({ navigation }) => {    
    const [Username, setUserName] = useState('');
    const [WorkoutIntensityLevel, setWorkoutIntensityLevel] = useState('medium');

    const getWorkoutIntensity = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('Username');
      console.log('Stored username:', storedUsername);
      if (!storedUsername) {
        throw new Error('No username found in storage');
      }
      setUserName(storedUsername);

      // You can fetch or submit workout intensity here if needed

    } catch (error) {
      console.error('Error fetching username:', error);
    }
    }

    useEffect(() => {
        getWorkoutIntensity();
    }, []);

    const handleSubmit = () => {
      navigation.reset ({
        index: 0,
        routes: [{ name: 'AccountProfileScreen', params: { Username } }],
      });

      console.log('Workout intensity level submitted:', WorkoutIntensityLevel);
      alert('Workout intensity level submitted');
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'black' }}>
        <View style={styles.container}>
            <Text style={styles.welcomeText}>How was your workout, {Username}?</Text>
            <Picker
                selectedValue={WorkoutIntensityLevel}
                style={styles.picker}
                onValueChange={(itemValue) => setWorkoutIntensityLevel(itemValue)}>
                <Picker.Item label="Easy" value="easy" />
                <Picker.Item label="Medium" value="medium" />
                <Picker.Item label="Hard" value="hard" />
            </Picker>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
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
    welcomeText: {
      color: 'white',
      marginTop: 50,
      fontSize: 30,
      fontFamily: 'Alkatra-VariableFront_wght',
      textAlign: 'center',
    },
    picker: {
      height: 50,
      width: 200,
      color: 'white',
      fontSize: 20,
      marginTop: 20,
      backgroundColor: '#1e1e1e',
      borderRadius: 10,
    },
    button: {
      backgroundColor: '#F83600',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 20,
      fontFamily: 'Alkatra-VariableFront_wght',
    },
    gradient: {
      borderRadius: 10,
      marginTop: 20,
    },
});

export default PostWorkoutScreen;
