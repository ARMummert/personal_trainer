import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { NavigationProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SettingsScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
const navigateTo = (screen: string) => navigation.navigate(screen);
const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      Alert.alert('You must be logged in to view this page');
    }
  };

  checkLoginStatus();
}, []);

if (!isLoggedIn) {
  return (
    <View style={styles.container}>
      <Text style={{  padding: 20, color: 'white', fontSize: 20, textAlign: 'center' }}>You must be logged in to access this page.</Text>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen' as never)} style={{ backgroundColor: '#EB2000', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 15, width: 90, alignSelf: 'center' }}>
        <Text style={{  color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Login </Text>
      </TouchableOpacity>
    </View>
  );
}
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.settingItem} onPress={() => navigateTo('AccountProfileScreen')}>
        <FontAwesome name="user" size={24} style={styles.icon} />
        <Text style={styles.settingText}>Account Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={() => navigateTo('PrivacyPolicy')}>
        <FontAwesome name="lock" size={24} style={styles.icon} />
        <Text style={styles.settingText}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={() => navigateTo('AccountSignupScreen')}>
        <FontAwesome name="user-plus" size={24} style={styles.icon} />
        <Text style={styles.settingText}>Create an Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={() => navigateTo('FitnessSurveyScreen')}>
        <FontAwesome name="heartbeat" size={24} style={styles.icon} />
        <Text style={styles.settingText}>Retake Fitness Survey</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={() => navigateTo('LoginScreen')}>
        <FontAwesome name="key" size={24} style={styles.icon} />
        <Text style={styles.settingText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={() => navigateTo('ResetPasswordScreen')}>
        <FontAwesome name="lock" size={24} style={styles.icon} />
        <Text style={styles.settingText}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={() => navigateTo('ResetUserNameScreen')}>
        <FontAwesome name="edit" size={24} style={styles.icon} /> 
        <Text style={styles.settingText}>Reset Username</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: 'white',
  },
  icon: {
    marginRight: 10,
    color: 'white',
  },
  settingText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Alkatra-VariableFront_wght',
  },
});

export default SettingsScreen;
