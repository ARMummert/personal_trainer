import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp } from '@react-navigation/native';

interface SignUpProps {
  navigation: NavigationProp<any>;
}

const AccountSignUpScreen: React.FC<SignUpProps> = ({ navigation }) => {
  const [Name, setName] = useState('');
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [re_enter_password, setre_enter_password] = useState('');
  

  const handleSignUp = async () => {
    if (!Name || !Username || !Email || !Password) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/UserInfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name, Username, Email, Password, re_enter_password }),
      });

      if (response.ok) {
        const data = await response.json();lko hre_enter_password
        if (data.success) {
          alert('Account created successfully');
          navigation.navigate('LoginScreen');
        } else {
          alert('Failed to create account');
        }
      } else {
        alert('Sign-up failed');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.space}></View>
      <LinearGradient style={styles.inputContainer} colors={['#F83600', '#FE8C00']}>
        <TextInput
          placeholder="Name"
          value={Name}
          onChangeText={setName}
          style={styles.input}
        />
      </LinearGradient>
      <LinearGradient style={styles.inputContainer} colors={['#F83600', '#FE8C00']}>
        <TextInput
          placeholder="Username"
          value={Username}
          onChangeText={setUsername}
          style={styles.input}
        />
      </LinearGradient>
      <LinearGradient style={styles.inputContainer} colors={['#F83600', '#FE8C00']}>
        <TextInput
          placeholder="Email"
          value={Email}
          onChangeText={setEmail}
          style={styles.input}
        />
      </LinearGradient>
      <LinearGradient style={styles.inputContainer} colors={['#F83600', '#FE8C00']}>
        <TextInput
          placeholder="Password"
          value={Password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={styles.input}
        />
      </LinearGradient>
      <LinearGradient style={styles.inputContainer} colors={['#F83600', '#FE8C00']}>
        <TextInput
          placeholder="Re-enter Password"
          value={re_enter_password}
          onChangeText={setre_enter_password}
          secureTextEntry={true}
          style={styles.input}
        />
      </LinearGradient>
      <View style={styles.space}></View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0, borderRadius: 5, }}>
        <TouchableOpacity onPress={handleSignUp} style={{ backgroundColor: '#F83600', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 5 }}>
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.space}></View>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
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
    fontSize: 44,
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
  inputContainer: {
    width: '20%',
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

export default AccountSignUpScreen;
