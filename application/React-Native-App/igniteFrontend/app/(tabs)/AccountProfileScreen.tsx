import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AccountProfileProps {
  navigation: NavigationProp<any>;
}
const AccountProfileScreen: React.FC<AccountProfileProps> = ({ navigation }) => {
  const [Username, setUserName] = useState('');
  const [Email, setEmail] = useState('');
  const [Avatar, setAvatar] = useState('');

  const username = {  // Default user data
    name: 'John Doe',
    email: 'johndoe@example.com',
    avatar: 'https://placeimg.com/150/150/people', 
  };
  const getUserData = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('Username');
      console.log('Stored username:', storedUsername);
      if (!storedUsername) {
        throw new Error('No username found in storage');
      }
      setUserName(storedUsername);

      const response = await fetch(`http://localhost:5000/api/user/${storedUsername}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const fetchedUser = await response.json();
      setUserName(fetchedUser.Username);
      console.log('Fetched user:', fetchedUser);
      setEmail(fetchedUser.Email);
      setAvatar(fetchedUser.Avatar);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        {username.avatar && (
          <Image source={{ uri: username.avatar }} style={styles.avatar} />
        )}
        <Text style={styles.name}>{Username}</Text>
        <Text style={styles.email}>{Email}</Text>
      </View>
      <View style={styles.settingsList}>
        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('EditProfileScreen' as never)}>
          <FontAwesome name="edit" size={24} style={styles.icon} />
          <Text style={styles.settingText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('ResetPasswordScreen' as never)}>
          <FontAwesome name="lock" size={24} style={styles.icon} />
          <Text style={styles.settingText}>Change Password</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('LogoutScreen' as never)}>
          <FontAwesome name="sign-out" size={24} style={styles.icon} />
          <Text style={styles.settingText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Workouts Completed</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber2}>0</Text>
            <Text style={styles.statLabel2}>Workout Streak</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
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