import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store'; // Import for secure storage
import axios from 'axios'; // Import for making requests

interface LoginProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    try {
      // Storing data securely
      await SecureStore.setItemAsync('userEmail', email);
      await SecureStore.setItemAsync('userPassword', password);

      // Retrieving data securely
      const storedEmail = await SecureStore.getItemAsync('userEmail');
      const storedPassword = await SecureStore.getItemAsync('userPassword');

      console.log('Stored Email:', storedEmail);
      console.log('Stored Password:', storedPassword);

      //API request
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      if (response.data.success) {
        navigation.navigate('Home');
      } else {
        alert('Login failed');
      }
      } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://localhost:5000/reset-password', {
        email,
      });
  
      if (response.data.success) {
        await SecureStore.deleteItemAsync('userPassword');
        setPassword('');
        alert('Password has been reset');
      } else {
        alert('Password reset failed');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      alert('An error occurred. Please try again.');
    }
  };
  
  const handleResetUsername = async () => {
    try {
      const response = await axios.post('http://localhost:5000/reset-username', {
        email,
      });
  
      if (response.data.success) {
        await SecureStore.deleteItemAsync('userEmail');
        setEmail('');
        alert('Username has been reset');
      } else {
        alert('Username reset failed');
      }
    } catch (error) {
      console.error('Error during username reset:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="account-circle" size={100} color="white" />
      <View style={styles.space}></View>
      <LinearGradient style={styles.emailInput} colors={['#F83600', '#FE8C00']}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
     </LinearGradient>
     <LinearGradient style={styles.emailInput} colors={['#F83600', '#FE8C00']}>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
      />
      </LinearGradient>
      <View style={styles.space}></View>
        <Button
          title="Login"
          onPress={handleLogin}
          color="#F83600"
        />
      <View style={styles.space}></View>
      <TouchableOpacity onPress={handleResetPassword}>
      <Text style={styles.reset}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleResetUsername}>
      <Text style={styles.reset}>Forgot Username?</Text>
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
});

export default LoginScreen;
