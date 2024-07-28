import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp } from '@react-navigation/native';
interface ResetUserNameProps {
  navigation: NavigationProp<any>;
}

const ResetUserNameScreen: React.FC<ResetUserNameProps> = ({ navigation }) => {
  const [Email, setEmail] = useState('');

  const handleResetUserName = async () => {
    if (!Email) {
      alert('Please enter your email');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/reset-username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert('Password reset link has been sent to your email');
          navigation.navigate('LoginScreen');
        } else {
          alert('Email not found');
        }
      } else {
        alert('Failed to send reset link');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
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
          value={Email}
          onChangeText={setEmail}
          style={styles.input}
        />
      </LinearGradient>
      <View style={styles.space}></View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0, borderRadius: 5, }}>
        <TouchableOpacity onPress={handleResetUserName} style={{ backgroundColor: '#F83600', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 5 }}>
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Reset Username</Text>
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
  emailInput: {
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

export default ResetUserNameScreen;
