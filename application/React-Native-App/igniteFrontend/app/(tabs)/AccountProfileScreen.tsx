import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountProfileScreen = () => {
  const [userData, setUserData] = useState({Username: '', Email: '' });
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        setIsLoggedIn(true);
        await getUserData(token);
      } else {
        Alert.alert('You must be logged in to view this page');
      }
    };

    checkLoginStatus();
  }, []);

  const getUserData = async (token: string = '') => {
    try {
      const response = await fetch('http://localhost:5000/api/userinfo', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
         credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const fetchedUser = await response.json();
      console.log('Fetched user data:', fetchedUser);
      setUserData(fetchedUser.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Unable to fetch user data.');
    }
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={{  padding: 20, color: 'white', fontSize: 20, textAlign: 'center' }}>You must be logged in to access this page.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen' as never)} style={{ backgroundColor: '#EB2000', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 15, width: 90, alignSelf: 'center'}}>
          <Text style={{  color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Login </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.username}>Username: {userData.Username}</Text>
        <Text style={styles.email}>Email: {userData.Email}</Text>
      </View>
      <View>
        <Text style={styles.welcomeText}>Track your progress</Text>
      </View>
      <View style={styles.settingsList}>
        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('ResetUserNameScreen' as never)}>
          <FontAwesome name="edit" size={24} style={styles.icon} />
          <Text style={styles.settingText}>Reset Username</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('ResetPasswordScreen' as never)}>
          <FontAwesome name="lock" size={24} style={styles.icon} />
          <Text style={styles.settingText}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('LogoutScreen' as never)}>
          <FontAwesome name="sign-out" size={24} style={styles.icon} />
          <Text style={styles.settingText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  username: {
    fontSize: 18,
    color: 'white',
  },
  email: {
    fontSize: 18,
    color: 'white',
  },
  settingsList: {
    backgroundColor: 'black',
    paddingBottom: 100,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  settingText: {
    fontSize: 20,
    color: 'white',
  },
  icon: {
    marginRight: 10,
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    color: 'white',
    marginLeft: 300,
  },
  statLabel: {
    fontSize: 24,
    color: 'white',
    marginLeft: 300,
  },
  statNumber2: {
    fontSize: 24,
    color: 'white',
    marginRight: 300,
  },
  statLabel2: {
    fontSize: 24,
    color: 'white',
    marginRight: 300,
  },
  workoutCard: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 10,
    borderRadius: 5,
  },
  workoutName: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Alkatra-VariableFront_wght',
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Alkatra-VariableFront_wght',
  },
  workoutStreak: {
    fontSize: 20,
    color: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Alkatra-VariableFront_wght',
  },
 completedWorkouts: {
    fontSize: 20,
    color: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    textAlign: 'center',
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
  chartContainer: {
    width: '100%',
    height: 100,
  }, 
  chartTitle: {

  },
});

export default AccountProfileScreen;
