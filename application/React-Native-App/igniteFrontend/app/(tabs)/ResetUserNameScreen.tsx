import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp } from '@react-navigation/native';

interface ResetUsernameProps {
  navigation: NavigationProp<any>;
}

const ResetUsernameScreen: React.FC<ResetUsernameProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleResetUsername = async () => {
    if (!email) {
      alert('Please enter your email');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/resetUsername', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert('Username reset link has been sent to your email');
          navigation.navigate('Login');
        } else {
          alert('Email not found');
        }
      } else {
        alert('Failed to send reset link');
      }
    } catch (error) {
      console.error('Error during username reset:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Username</Text>
      <View style={styles.space}></View>
      <LinearGradient style={styles.emailInput} colors={['#F83600', '#FE8C00']}>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
      </LinearGradient>
      <View style={styles.space}></View>
      <Button
        title="Reset Username"
        onPress={handleResetUsername}
        color="#F83600"
      />
      <View style={styles.space}></View>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backToLogin}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 0,
    margin: 0,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
    backgroundColor: 'black',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: 'white',
  },
  emailInput: {
    width: '75%',
    height: 40,
    borderRadius: 5,
    color: 'white',
    marginBottom: 15,
  },
  space: {
    height: 20,
  },
  backToLogin: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
});

export default ResetUsernameScreen;
