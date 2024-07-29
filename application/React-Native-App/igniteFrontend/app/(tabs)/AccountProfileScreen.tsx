import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const AccountProfileScreen = () => {
  const [userData, setUserData] = useState({ name: '', username: '', email: '', avatar: '' });

  const navigation = useNavigation();

  const getUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user');
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const fetchedUser = await response.json();
      setUserData(fetchedUser);
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
        {userData.avatar && (
          <Image source={{ uri: userData.avatar }} style={styles.avatar} />
        )}
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.username}>{userData.username}</Text>
        <Text style={styles.email}>{userData.email}</Text>
      </View>
      <View style={styles.settingsList}>
        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('editUsernameScreen' as never)}>
          <FontAwesome name="edit" size={24} style={styles.icon} />
          <Text style={styles.settingText}>Edit Username</Text>
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
  username: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Alkatra-VariableFront_wght',
  },
  email: {
    fontSize: 18,
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
