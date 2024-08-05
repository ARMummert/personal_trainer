import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';
import { NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';


const FitnessSurveyScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [gender, setGender] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [activities, setActivities] = useState<string[]>([]);
  const [challenges, setChallenges] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        setIsLoggedIn(true);
        const username = await AsyncStorage.getItem('username');
        setUsername(username);
        console.log(username);
      } else {
        Alert.alert('You must be logged in to view this page');
      }
    };

    checkLoginStatus();
  }, []);

  const toggleActivity = (activity: string) => {
    setActivities(prev => {
      if (prev.includes(activity)) {
        return prev.filter(a => a !== activity);
      } else {
        return [...prev, activity];
      }
    });
  };

  const toggleChallenge = (challenge: string) => {
    setChallenges(prev => {
      if (prev.includes(challenge)) {
        return prev.filter(c => c !== challenge);
      } else {
        return [...prev, challenge];
      }
    });
  };

  const handleSubmit = async () => {
    const surveyData = {
      username,
      gender,
      fitnessGoal,
      bodyType,
      fitnessLevel,
      activityLevel,
      activities,
      challenges,
    };

    try {
      const response = await fetch('http://localhost:5000/submitSurvey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      });

      const result = await response.json();
      if (result.success) {
        Alert.alert('Success', 'Survey submitted successfully');
        navigation.navigate('Home');
        console.log(username);
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      Alert.alert('Error', 'An error occurred while submitting the survey');
    }
  };
  
  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={{  padding: 20, color: 'white', fontSize: 20, textAlign: 'center' }}>You must be logged in to access this page.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen' as never)} style={{ backgroundColor: '#EB2000', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 15, width: 90, alignSelf: 'center'}}>
          <Text style={{  color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Login </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Welcome, {username}!</Text>
      <Text style={styles.title}>Fitness Survey</Text>
      <Text style={styles.fitnesswarning}><strong style={styles.strong}>Important Information:</strong> While Ignite provides personalized training plans, it's not a substitute for professional medical advice. Please consult your doctor before starting any new exercise program, especially if you have any health concerns.</Text>
      <Text style={styles.fitnesswarning}>This survey is designed to help you understand your current fitness level and goals.  The information you provide will be anonymous and will be used to improve fitness programs and resources.</Text>
      <Text style={styles.label}>Gender</Text>
      <LinearGradient style={styles.gradient} colors={['#F83600', '#FE8C00']}>
        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(itemValue) => setGender(itemValue)}>
          <Picker.Item label="Select..." value="" />
          <Picker.Item style={styles.picker} label="Female" value="Female" />
          <Picker.Item style={styles.picker} label="Male" value="Male" />
          <Picker.Item style={styles.picker} label="Non-Binary" value="Non-Binary" />
          <Picker.Item style={styles.picker} label="Prefer not to say" value="Prefer not to say" />
        </Picker>
      </LinearGradient>
      <Text style={styles.label}>Fitness Goals</Text>
      <LinearGradient style={styles.gradient} colors={['#F83600', '#FE8C00']}>
        <Picker
          selectedValue={fitnessGoal}
          style={styles.picker}
          onValueChange={(itemValue) => setFitnessGoal(itemValue)}>
          <Picker.Item label="Select..." value="" />
          <Picker.Item label="Lose weight" value="Lose weight" />
          <Picker.Item label="Build muscle" value="Build muscle" />
          <Picker.Item label="Improve strength" value="Improve strength" />
          <Picker.Item label="Increase Endurance" value="Increase Endurance" />
          <Picker.Item label="Enhance flexibility" value="Enhance flexibility" />
          <Picker.Item label="Improve overall health" value="Improve overall health" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </LinearGradient>
      <Text style={styles.label}>Body Type</Text>
      <LinearGradient style={styles.gradient} colors={['#F83600', '#FE8C00']}>
        <Picker
          selectedValue={bodyType}
          style={styles.picker}
          onValueChange={(itemValue) => setBodyType(itemValue)}>
          <Picker.Item style={styles.pickerItem} label="Select..." value="" />
          <Picker.Item label="I don’t know my body type (skip to next question)" value="I don’t know my body type" />
          <Picker.Item label="Endomorph" value="Endomorph" />
          <Picker.Item label="Ectomorph" value="Ectomorph" />
          <Picker.Item label="Mesomorph" value="Mesomorph" />
        </Picker>
      </LinearGradient>
      <Text style={styles.label}>Fitness Level</Text>
      <LinearGradient style={styles.gradient} colors={['#F83600', '#FE8C00']}>
        <Picker
          selectedValue={fitnessLevel}
          style={styles.picker}
          onValueChange={(itemValue) => setFitnessLevel(itemValue)}>
          <Picker.Item label="Select..." value="" />
          <Picker.Item label="Beginner" value="Beginner" />
          <Picker.Item label="Intermediate" value="Intermediate" />
          <Picker.Item label="Advanced" value="Advanced" />
        </Picker>
      </LinearGradient>
      <Text style={styles.label}>Current Activity Level</Text>
      <LinearGradient style={styles.gradient} colors={['#F83600', '#FE8C00']}>
        <Picker
          selectedValue={activityLevel}
          style={styles.picker}
          onValueChange={(itemValue) => setActivityLevel(itemValue)}>
          <Picker.Item label="Select..." value="" />
          <Picker.Item label="0-2 days" value="0-2 days" />
          <Picker.Item label="3-5 days" value="3-5 days" />
          <Picker.Item label="6-7 days" value="6-7 days" />
        </Picker>
      </LinearGradient>
      <Text style={styles.label}>What types of activities do you typically engage in? (Select all that apply)</Text>
      {['Running', 'Walking', 'Swimming', 'Weight Lifting', 'Team Sports', 'Yoga/Pilates', 'Other'].map((activity) => (
        <View key={activity} style={styles.checkboxContainer}>
          <CheckBox checked={activities.includes(activity)} onPress={() => toggleActivity(activity)} />
          <Text style={styles.checkboxLabel}>{activity}</Text>
        </View>
      ))}

      <Text style={styles.label}>What are the biggest challenges you face in reaching your fitness goals? (Select all that apply)</Text>
      {['Lack of motivation', 'Time constraints', 'Access to equipment or facilities', 'Difficulty with certain exercises', 'Pain or injury', 'Nutrition difficulties', 'Other'].map((challenge) => (
        <View key={challenge} style={styles.checkboxContainer}>
          <CheckBox checked={challenges.includes(challenge)} onPress={() => toggleChallenge(challenge)} />
          <Text style={styles.checkboxLabel}>{challenge}</Text>
        </View>
      ))}
      <LinearGradient style={styles.gradient2} colors={['#F83600', '#FE8C00']}>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 5, }}>
          <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: 'transparent', paddingHorizontal: 15, paddingVertical: 10, width: 140, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'black', fontSize: 18, width: 140, textAlign: 'center', fontWeight: 'bold' }}>Submit Survey</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 44,
    marginBottom: 20,
    color: 'white',
    fontFamily: 'Alkatra-VariableFront_wght',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: 'white',
    borderColor: '#F83600',
    marginBottom: 15,
    fontFamily: 'Alkatra-VariableFront_wght',
  },
  age: {
    width: '15%',
    height: 40,
    fontSize: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: 'white',
    borderColor: '#F83600',
    marginBottom: 15,
    fontFamily: 'Alkatra-VariableFront_wght',
  },
  label: {
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
    fontFamily: 'Alkatra-VariableFront_wght',
  },
  picker: {
      height: 50,
      width: '100%',
      color: 'black',
      fontWeight: 600,
      backgroundColor: 'transparent',
      borderRadius: 5,
      fontSize: 20,
      fontFamily: 'Alkatra-VariableFront_wght',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 20,
    color: 'white',
  },
  pickerItem: {
    backgroundColor: 'transparent',
    color: 'black',
    fontSize: 20,
  },
  fitnesswarning: {
    fontSize: 20,
    width: 400,
    alignItems: 'flex-start',
    color: 'white',
    marginBottom: 20,
    fontFamily: 'Alkatra-VariableFront_wght',
  },
  strong: {
    fontSize: 24,
  },
  gradient: {
    width: '25%',
    height: 50,
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: 'center',
  },
  gradient2: {
    width: '13%',
    height: 50,
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: 'center',
  },
});

export default FitnessSurveyScreen;
