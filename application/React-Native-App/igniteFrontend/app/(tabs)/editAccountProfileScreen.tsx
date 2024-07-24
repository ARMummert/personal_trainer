import * as React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const EditAccountProfileScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState(''); // User's full name
  const [username, setUsername] = useState(''); // Username for editing
  const [email, setEmail] = useState(''); // User's email
  const [password, setPassword] = useState(''); // User's password

  const handleSaveProfile = async () => {
    // Implement logic to save edited profile data (fullName, username, email, password)
    // Consider security implications of allowing username edits

    try {
      const response = await fetch('http://localhost:5000/api/user/update', {
        method: 'POST', // Likely a POST request for updates
        headers: {
          'Content-Type': 'application/json', // Send data as JSON
        },
        body: JSON.stringify({ fullName, username, email, password }), // Include all fields
      });

      if (response.ok) {
        Alert.alert('Success!', 'Profile updated successfully.');
        navigation.goBack(); // Go back to AccountProfileScreen
      } else {
        Alert.alert('Error!', 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error!', 'An error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.fieldLabel}>Full Name</Text>
        <LinearGradient style={styles.emailInput} colors={['#F83600', '#FE8C00']}>
        <TextInput
          style={styles.textInput}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
        />
        </LinearGradient>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.fieldLabel}>Username</Text>
        <LinearGradient style={styles.emailInput} colors={['#F83600', '#FE8C00']}>
        <TextInput
          style={styles.textInput}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          // Consider adding validation for username format (e.g., minimum length)
        />
        </LinearGradient>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.fieldLabel}>Email</Text>
        <LinearGradient style={styles.emailInput} colors={['#F83600', '#FE8C00']}>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address" 
        />
        </LinearGradient>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.fieldLabel}>Password</Text>
        <LinearGradient style={styles.emailInput} colors={['#F83600', '#FE8C00']}>
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry={true} 
        />
        </LinearGradient>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.saveButtonText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: 44,
    textAlign: 'center',
    fontFamily: 'Alkatra-VariableFront_wght',
    margin: 10,
  },
  inputContainer: {
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  fieldLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    color: 'white',
  },
  saveButton: {
    backgroundColor: '#F83600', 
    padding: 15,
    width: '10%',
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    },
  emailInput: {
    width: '25%',
    height: 40,
    borderRadius: 5,
    color: 'white',
    marginBottom: 15,
      },
});

export default EditAccountProfileScreen;

function fetchUserData(): { username: any; email: any; } {
    throw new Error('Function not implemented.');
}
