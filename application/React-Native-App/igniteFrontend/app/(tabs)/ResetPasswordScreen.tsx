import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native'; // Add 'StyleSheet' to the import statement

const handleResetPassword = async () => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
    try {
      const Username = await SecureStore.getItemAsync('userEmail'); // Retrieve email from secure storage
      if (!Username) {
        // Handle case where email is not found
        alert('Email not found. Please register first.');
        return;
      }
  
      //API request
      const response = await fetch('http://localhost:5000/resetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Username }),
      });
    
  
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert('Password reset email sent. Check your inbox.');
        } else {
          alert('Password reset failed. Please try again later.');
        }
      } else {
        console.error('Error during password reset:', response.statusText);
        alert('An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      alert('An error occurred. Please try again.');
    }
    return (
      <View style={styles.container}>
        <Text>Reset Username</Text>
        <View style={styles.space}></View>
        <LinearGradient style={styles.emailInput} colors={['#F83600', '#FE8C00']}>
          <TextInput
            placeholder="New Password"
            value={Password}
            onChangeText={setPassword}
            style={styles.input}
          />
        </LinearGradient>
        <LinearGradient style={styles.emailInput} colors={['#F83600', '#FE8C00']}>
          <TextInput
            placeholder="Username"
            value={Username}
            onChangeText={setUsername}
            secureTextEntry={true}
            style={styles.input}
          />
        </LinearGradient>
        <Button title="Reset Password" onPress={handleResetPassword} />
      </View>
    );
  };
  
// CSS Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 0,
    margin: 0,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
    backgroundColor: 'white',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: 'white',
  },
  gradient: {
    width: '100%',
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  emailInput: {
    width: '25%',
    height: 40,
    borderRadius: 5,
    color: 'white',
    marginBottom: 15,
  },
  space: {
    height: 50,
  },
  reset: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Alkatra-VariableFront_wght',
    margin: 10,
  },
  signup: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Alkatra-VariableFront_wght',
    margin: 10,
    borderRadius: 55,
  },
  Button: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    borderRadius: 55,
  
  },
  login: {
    color: 'white',
    fontSize: 44,
    textAlign: 'center',
    fontFamily: 'Alkatra-VariableFront_wght',
    margin: 10,
  },
});

export default handleResetPassword;