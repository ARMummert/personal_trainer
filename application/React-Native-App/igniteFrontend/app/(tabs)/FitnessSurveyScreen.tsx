import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';
import { NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';


const FitnessSurveyScreen: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
  const [username, setUsername] = useState<string>();
  const [gender, setGender] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [activities, setActivities] = useState<string[]>([]);
  const [challenges, setChallenges] = useState<string[]>([]);

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

  
    const surveyData = {
      gender,
      fitnessGoal,
      bodyType,
      fitnessLevel,
      activityLevel,
      activities,
      challenges,
    };

    useEffect(() => {
      const fetchUsername = async () => {
        try {
          const storedUsername = await AsyncStorage.getItem('Username');
          console.log('Stored username:', storedUsername);
          if (!storedUsername) {
            throw new Error('No username found in storage');
          }
          setUsername(storedUsername);
          console.log('Username:', storedUsername);
        } catch (error) {
          console.error('Error fetching username:', error);
        }
      };
  
      fetchUsername();
    }, []);

    const submitSurvey = async () => {
    try {
      const response = await fetch(`http://localhost:5000/submitSurvey/${username}`, {
        method: 'POst',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      navigation.reset({
        index: 0,
        routes: [{ name: 'DailyWorkoutScreen', params: { username } }],
      });
      console.log('Survey submitted successfully:', result);
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome, {username}!</Text>
      <Text style={styles.title}>Fitness Survey</Text>
      <Text style={styles.fitnesswarning}><strong style={styles.strong}>Important Information:</strong> While Ignite provides personalized training plans, it's not a substitute for professional medical advice. Please consult your doctor before starting any new exercise program, especially if you have any health concerns.</Text>
      <Text style={styles.fitnesswarning}>This survey is designed to help you understand your current fitness level and goals.  The information you provide will be anonymous and will be used to improve fitness programs and resources.</Text>
      <Text style={styles.label}>Gender</Text>
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
      <Text style={styles.label}>Fitness Goals</Text>
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
      <Text style={styles.label}>Body Type</Text>
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
      <Text style={styles.label}>Fitness Level</Text>
        <Picker
          selectedValue={fitnessLevel}
          style={styles.picker}
          onValueChange={(itemValue) => setFitnessLevel(itemValue)}>
          <Picker.Item label="Select..." value="" />
          <Picker.Item label="Beginner" value="Beginner" />
          <Picker.Item label="Intermediate" value="Intermediate" />
          <Picker.Item label="Advanced" value="Advanced" />
        </Picker>
      <Text style={styles.label}>Current Activity Level</Text>
        <Picker
          selectedValue={activityLevel}
          style={styles.picker}
          onValueChange={(itemValue) => setActivityLevel(itemValue)}>
          <Picker.Item label="Select..." value="" />
          <Picker.Item label="0-2 days" value="0-2 days" />
          <Picker.Item label="3-5 days" value="3-5 days" />
          <Picker.Item label="6-7 days" value="6-7 days" />
        </Picker>
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
      <LinearGradient style={styles.gradient} colors={['#F83600', '#FE8C00']}>
        <View>
          <TouchableOpacity onPress={submitSurvey} style={{ backgroundColor: 'transparent', width: 140, justifyContent: 'center', borderRadius: 5 }}>
            <Text style={{ color: 'white', fontSize: 18, width: 140, textAlign: 'center', fontWeight: 'bold' }}>Submit Survey</Text>
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
      width: '20%',
      color: 'black',
      fontWeight: 600,
      backgroundColor: 'white',
      borderRadius: 5,
      fontSize: 20,
      fontFamily: 'Alkatra-VariableFront_wght',
      marginBottom: 25,
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
    width: 200,
    height: 50,
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient2: {
    width: '13%',
    height: 50,
    borderRadius: 5,
    marginBottom: 15,
  },
});

export default FitnessSurveyScreen;
