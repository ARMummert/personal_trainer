import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp } from '@react-navigation/native';

interface ResetUserNameProps {
  navigation: NavigationProp<any>;
}

const ResetUserNameScreen: React.FC<ResetUserNameProps> = ({ navigation }) => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const handleResetUsername = async () => {
    if (!Username || !Password) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/reset-username', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ Username, Password }),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Success', 'Username has been reset successfully.');
        navigation.navigate('LoginScreen');
      } else {
        console.error('Error during username reset:', response.statusText);
        Alert.alert('Error', 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error during username reset:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.login}>Reset Username</Text>
      <View style={styles.space}></View>
      <LinearGradient style={styles.emailInput} colors={['#F83600', '#FE8C00']}>
        <TextInput
          placeholder="New Username"
          value={Username}
          onChangeText={setUsername}
          style={styles.input}
        />
      </LinearGradient>
      <LinearGradient style={styles.emailInput} colors={['#F83600', '#FE8C00']}>
        <TextInput
          placeholder="Password"
          value={Password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={styles.input}
        />
      </LinearGradient>
      <Button title="Reset Username" onPress={handleResetUsername} />
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
    height: 20,
  },
  reset: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Alkatra-VariableFront_wght',
    margin: 10,
  },
  signup: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Alkatra-VariableFront_wght',
    margin: 10,
    borderRadius: 55,
  },
  Button: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    borderRadius: 55,
 
  },
  login: {
    color: 'white',
    fontSize: 35,
    textAlign: 'center',
    fontFamily: 'Alkatra-VariableFront_wght',
    margin: 10,
  },
});

export default ResetUserNameScreen;