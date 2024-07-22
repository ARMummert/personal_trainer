import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const AccountProfileScreen = () => {
  const [Username, setUserName] = useState('');

  const navigation = useNavigation();
  const username = { // Replace with your user data fetching logic
    name: 'John Doe',
    email: 'johndoe@example.com',
    avatar: 'https://placeimg.com/150/150/people', // Replace with your avatar URL
  };
  const getUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user'); // Assuming the endpoint returns all user data
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const fetchedUser = await response.json();
      setUserName(fetchedUser); // Update user state with all fetched data
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
        <Text style={styles.name}>{username.name}</Text>
        <Text style={styles.email}>{username.email}</Text>
      </View>
      <View style={styles.settingsList}>
        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('EditProfileScreen')}>
          <FontAwesome name="edit" size={24} style={styles.icon} />
          <Text style={styles.settingText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <FontAwesome name="lock" size={24} style={styles.icon} />
          <Text style={styles.settingText}>Change Password</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('LogoutScreen')}>
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
    padding: 20,
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
  },
  email: {
    fontSize: 16,
    color: '#aaa',
  },
  settingsList: {
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    marginRight: 10,
  },
  settingText: {
    fontSize: 16,
  },
});

export default AccountProfileScreen;


