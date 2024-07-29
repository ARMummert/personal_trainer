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
        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('editAccountProfileScreen' as never)}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
    color: 'white',
    fontFamily: 'Alkatra-VariableFront_wght',
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
    fontFamily: 'Alkatra-VariableFront_wght',
  },
  email: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Alkatra-VariableFront_wght',
  },
  settingsList: {
    // Remove the color property
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    color: 'white',
  },
  settingText: {
    fontSize: 20,
    color: 'white', 
    fontFamily: 'Alkatra-VariableFront_wght',

  },
  icon: {
    marginRight: 10,
    color: 'white',
  },
});

export default AccountProfileScreen;


