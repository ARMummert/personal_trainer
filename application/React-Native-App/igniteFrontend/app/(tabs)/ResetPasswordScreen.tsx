import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp } from '@react-navigation/native';
interface ResetPasswordProps {
  navigation: NavigationProp<any>;
}

const ResetPasswordScreen: React.FC<ResetPasswordProps> = ({ navigation }) => {
  const [Email, setEmail] = useState('');

  const handleResetPassword = async () => {
    if (!Email) {
      alert('Please enter your email');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/reset-password', {
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
      <Text style={styles.title}>Reset Password</Text>
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
        <TouchableOpacity onPress={handleResetPassword} style={{ backgroundColor: '#F83600', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 5 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Reset Password</Text>
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
    fontFamily: 'Alkatra-VariableFront_wght',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: 'white',
    fontSize: 20,
    fontFamily: 'Alkatra-VariableFront_wght',
  },
  emailInput: {
    width: '50%',
    height: 40,
    borderRadius: 5,
    color: 'white',
    marginBottom: 15,
    fontSize: 20,
    fontFamily: 'Alkatra-VariableFront_wght',
  },
  space: {
    height: 20,
  },
  backToLogin: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Alkatra-VariableFront_wght',
    textAlign: 'center',
    margin: 10,
  },
});

export default ResetPasswordScreen;
