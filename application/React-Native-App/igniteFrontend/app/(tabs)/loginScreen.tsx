import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store'; // Import for secure storage
import { NavigationProp } from '@react-navigation/native';
import handleResetPassword from './ResetPasswordScreen';
import handleResetUsername from './ResetUserNameScreen';

//LoginProps may change depending on the backend implementation
interface LoginProps {
  navigation: NavigationProp<any>;
}

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const [Username, setUserName] = useState('');
  const [Password, setPassword] = useState('');

  const handlePressPassword = () => {
    navigation.navigate('ResetPasswordScreen');
  };

  const handlePressUsername = () => {
    navigation.navigate('ResetUsernameScreen');
  };

  const handleLogin = async () => {
    if (!Username || !Password) {
      alert('Please enter username and password');
      return;
    }

    try {
      // Storing data securely
      await SecureStore.setItemAsync('userUsername', Username);
      await SecureStore.setItemAsync('userPassword', Password);
    
      // Retrieving data securely
      const storedUsername = await SecureStore.getItemAsync('userUsername');
      const storedPassword = await SecureStore.getItemAsync('userPassword');
    
      console.log('Stored Username:', storedUsername);
      console.log('Stored Password:', storedPassword);
    
      //API request
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: Username, password: Password }),
      });
    
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          navigation.navigate('HomeScreen', { Username });
        } else {
          alert('Invalid username or password');
        }
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.login}>Login</Text>
      <View style={styles.space}></View>
      <LinearGradient style={styles.emailInput} colors={['#F83600', '#FE8C00']}>
        <TextInput
          placeholder="Username"
          value={Username}
          onChangeText={setUserName}
          style={styles.input} />
      </LinearGradient>
      <LinearGradient style={styles.emailInput} colors={['#F83600', '#FE8C00']}>
        <TextInput
          placeholder="Password"
          value={Password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={styles.input} />
      </LinearGradient>
      <View style={styles.space}></View>
      <Button
        title="Login"
        onPress={handleLogin}
        color="#F83600" />

      <View style={styles.space}></View>
      <TouchableOpacity style={styles.reset}>
        <Button
          title="Forgot Password?"
          onPress={handlePressPassword}
          color="#F83600" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.reset}>
        <Button
          title="Forgot Username?"
          onPress={handlePressUsername}
          color="#F83600" />
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, borderRadius: 5, }}>
        <TouchableOpacity onPress={() => navigation.navigate('AccountSignUpScreen')}>
          <Text style={styles.signup}>Need an Account? </Text>
          <Button color="#F83600" title="Sign Up" />
        </TouchableOpacity>
      </View>
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

export default LoginScreen;
function onLoginSuccess(Username: string) {
  throw new Error('Function not implemented.');
}

