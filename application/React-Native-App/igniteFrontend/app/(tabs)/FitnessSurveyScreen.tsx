import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp } from '@react-navigation/native';

const FitnessSurveyScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [age, setAge] = useState('');
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

  const handleSubmit = async () => {
    const surveyData = {
      age,
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
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      Alert.alert('Error', 'An error occurred while submitting the survey');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Fitness Survey</Text>
      
      <TextInput
        style={styles.age}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Gender</Text>
      <Picker
        selectedValue={gender}
        style={styles.picker}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="Select..." value="" />
        <Picker.Item label="Female" value="Female" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Non-Binary" value="Non-Binary" />
        <Picker.Item label="Prefer not to say" value="Prefer not to say" />
      </Picker>

      <Text style={styles.label}>Fitness Goals</Text>
      <Picker
        selectedValue={fitnessGoal}
        style={styles.picker}
        onValueChange={(itemValue) => setFitnessGoal(itemValue)}
      >
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
        onValueChange={(itemValue) => setBodyType(itemValue)}
      >
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
        onValueChange={(itemValue) => setFitnessLevel(itemValue)}
      >
        <Picker.Item label="Select..." value="" />
        <Picker.Item label="Beginner" value="Beginner" />
        <Picker.Item label="Intermediate" value="Intermediate" />
        <Picker.Item label="Advanced" value="Advanced" />
      </Picker>

      <Text style={styles.label}>Current Activity Level</Text>
      <Picker
        selectedValue={activityLevel}
        style={styles.picker}
        onValueChange={(itemValue) => setActivityLevel(itemValue)}
      >
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

      <Button title="Submit Survey" onPress={handleSubmit} color="#F83600" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 50,
    paddingBottom: 100,
    paddingLeft: 150,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 44,
    marginBottom: 20,
    color: 'white',
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
  },
  label: {
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '25%',
    color: 'white',
    backgroundColor: '#F83600',
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 20,
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
    color: 'white',
    fontSize: 20,
  },
});

export default FitnessSurveyScreen;
