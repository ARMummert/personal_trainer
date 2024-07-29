// import { useNavigation } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

interface LogoutProps {
    navigation: any;
}

const LogoutScreen: React.FC<LogoutProps> = ({ navigation }) => {
    const [Username] = useState('');
    const [Password] = useState('');

    useNavigation();

    const handleLogout = async () => {
        try {
        // Send logout request to backend
        const response = await fetch('http://localhost:5000/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            body: JSON.stringify({ Username, Password }),
            },
        });

      if (response.ok) {
        // Clear stored credentials
        await SecureStore.deleteItemAsync('Username');
        await SecureStore.deleteItemAsync('Password');
        // Redirect to login screen
        onLogoutSuccess(navigation.navigate('LoginScreen'));
        } else {
        console.error('Logout failed:', response.statusText);
        alert('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Logout failed');
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.message}>Are you sure you want to Logout?</Text>
    <LinearGradient colors={['#F83600', '#FE8C00']} style={styles.gradient}>
      <TouchableOpacity style={styles.navigationButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </LinearGradient>
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
      fontFamily: 'Alkatra-VariableFront_wght',
    },
    input: {
      width: '100%',
      height: 40,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      color: 'white',
      fontFamily: 'Alkatra-VariableFront_wght',
    },
    gradient: {
      width: '5%',
      borderRadius: 5,
      marginBottom: 15,
    },
    emailInput: {
      width: '25%',
      height: 40,
      borderRadius: 5,
      color: 'white',
      marginBottom: 15,
      fontFamily: 'Alkatra-VariableFront_wght',
    },
    space: {
      height: 50,
    },
    reset: {
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
      fontFamily: 'Alkatra-VariableFront_wght',
      margin: 10,
    },
    message: {
        color: 'white',
        fontSize: 20,
        marginBottom: 20,
        fontFamily: 'Alkatra-VariableFront_wght',
    },
    navigationButton: {
        marginBottom: 10,
        marginTop: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: '400',
        fontFamily: 'Alkatra-VariableFront_wght',
    },
  });
export default LogoutScreen;
function onLogoutSuccess(navigation: any) {
    throw new Error('Function not implemented.');
}

