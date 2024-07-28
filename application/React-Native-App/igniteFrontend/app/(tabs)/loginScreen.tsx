import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp } from '@react-navigation/native';


//LoginProps may change depending on the backend implementation
interface LoginProps {
  navigation: NavigationProp<any>;
}

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {

  const [Username, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  
  const handleLogin = async () => {
    if (!Username || !Password) {
      alert('Please enter username and password');
      return;
    }

    try {
    
      //API request
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Username: Username, Password: Password }),
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
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0, borderRadius: 5, }}>
        <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: '#F83600', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 5 }}>
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Login</Text>
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
        <TouchableOpacity onPress={() => navigation.navigate('AccountSignupScreen')}>
          <Text style={styles.signup}>Need an Account? </Text>
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
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: 'Alkatra-VariableFront_wght',
    padding: 10,
    borderRadius: 15,
    height: 40,
    width: 150,
    backgroundColor: '#F83600',
  },
  signup: {
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: 'Alkatra-VariableFront_wght',
    padding: 10,
    marginTop: -10,
    marginBottom: 40,
    borderRadius: 15,
    height: 40,
    width: 150,
    backgroundColor: '#F83600',
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

