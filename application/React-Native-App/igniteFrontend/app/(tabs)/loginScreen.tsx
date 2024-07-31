import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginProps {
  navigation: NavigationProp<any>;
}

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {

  const [Username, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [IsLoading, setIsLoading] = useState(false);
  
  const handleLogin = async () => {
    setIsLoading(true);
    if (!Username || !Password) {
      Alert.alert('Please enter username and password');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Username, Password }),
      });
      console.log('Response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);
        await AsyncStorage.setItem('authToken', data.token);
        Alert.alert('Login Successful');
        navigation.navigate('Home');
      } else {
        const errorData = await response.json();
        console.log('Error data:', errorData);
        Alert.alert('Login failed', 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login failed', 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
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
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0, borderRadius: 5, }}>
        <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: '#EB2000', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 15 }}>
          <Text style={{  color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containertwo}>  
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0, borderRadius: 5, }}>
        <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.reset}>Forgot Password?</Text>
        </TouchableOpacity>
      <View style={styles.spaceBetween} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0, borderRadius: 5, }}>
        <TouchableOpacity onPress={() => navigation.navigate('ResetUserNameScreen')}>
          <Text style={styles.reset}>Forgot Username?</Text>
        </TouchableOpacity>
      </View>
      </View> 
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0, borderRadius: 5, }}>
        <TouchableOpacity onPress={() => navigation.navigate('AccountSignupScreen')} style={styles.signupButton}>
          <Text style={styles.signupText}>Need an Account? </Text>
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
  containertwo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 0,
    margin: 0,
  },
  icon: {
    marginBottom: 20,
  },
  spaceBetween: {
    flex: 1, 
    margin: 10,
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
    fontSize: 20,
    borderColor: 'white',
  },
  gradient: {
    width: '100%',
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 20,
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
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'Alkatra-VariableFront_wght',
    padding: 10,
    borderRadius: 15,
    height: 40,
    width: 170,
    textDecorationLine: 'underline',
  },
  signupButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 40,
    borderRadius: 15,
    height: 40,
    width: 170, 
  },

  signupText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Alkatra-VariableFront_wght',
    padding: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  Button: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    borderRadius: 55,
    shadowColor : 'white',
  
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

