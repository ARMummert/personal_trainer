  import * as React from 'react';
  import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
  import { FontAwesome } from '@expo/vector-icons';
  import { useState, useEffect } from 'react';
  import { NavigationProp} from '@react-navigation/native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

  interface User {
    WorkoutsCompleted?: number; 
    Username: string;
    Email: string;
    Avatar: string;
  }
  interface AccountProfileProps {
    navigation: NavigationProp<any>;
    Avatar: string;
    Username: string;
    Email: string;
    WorkoutsCompleted: number;
    isLoading: boolean;
  }

  const AccountProfileScreen: React.FC<AccountProfileProps> = ({ navigation }) => {
    const [Username, setUserName] = useState('');
    const [Email, setEmail] = useState('');
    const [Avatar, setAvatar] = useState('');
    const [WorkoutsCompleted, setWorkoutsCompleted] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [finalWorkoutTime, setFinalWorkoutTime] = useState(0);

    // Format workout time as MM:SS
    const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    useEffect(() => {
      const fetchData = async () => {
        const storedUsername = await AsyncStorage.getItem('Username');
        if (!storedUsername) {
          console.error('No username found in storage');
          return;
        }
        const storedAvatar = await AsyncStorage.getItem('Avatar'); 
        if (storedAvatar) {
          setAvatar(storedAvatar);
          console.log('Stored avatar:', storedAvatar);
        }
        const storedWorkoutTime = await AsyncStorage.getItem('WorkoutTime');
        if (storedWorkoutTime) {
          const workoutTime = formatTime(parseInt(storedWorkoutTime, 10));
          setFinalWorkoutTime(parseInt(workoutTime, 10));
          console.log('Stored workout time:', formatTime(parseInt(workoutTime, 10)));
        }

        try {
          const response = await fetch(`http://localhost:5000/api/user/${storedUsername}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });

          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }

          const fetchedUser = await response.json();
          if (!fetchedUser) {
            console.error('Fetched user is undefined or null');
          }
          setUserName(fetchedUser.Username);
          setEmail(fetchedUser.Email);
          setWorkoutsCompleted(fetchedUser.WorkoutsCompleted);
          console.log('Fetched user:', fetchedUser);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, []);

    useEffect(() => {
      if (!isLoading) {
        navigation.navigate('AccountProfileScreen', { Username });
      }
    }, [isLoading]);

    if (isLoading) {
      return <Text>Loading...</Text>;
    }
    return (
      <ScrollView>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Account Profile</Text>
        <Image source={require('../../assets/images/avatarblue.png')} style={styles.avatar} />
        <View style={styles.profileHeader}>
          <Text style={styles.name}>{Username}</Text>
          <Text style={styles.email}>{Email}</Text>
        </View>
        <View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>You've Completed </Text>
              <Text style={styles.statNumber}>{WorkoutsCompleted} workouts</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Last Workout Time </Text>
              <Text style={styles.statNumber}>{finalWorkoutTime} minutes</Text>
            </View>
        </View>
        
        <View style={styles.settingsList}>
          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('ResetPasswordScreen' as never)}>
            <FontAwesome name="lock" size={24} style={styles.icon} />
            <Text style={styles.settingText}>Reset Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('ResetUserNameScreen' as never)}>
            <FontAwesome name="edit" size={24} style={styles.icon} />
            <Text style={styles.settingText}>Reset Username</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('LogoutScreen' as never)}>
            <FontAwesome name="sign-out" size={24} style={styles.icon} />
            <Text style={styles.settingText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
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
      width: 50,
      height: 50,
      borderRadius: 50,
      marginTop: 50,
      marginBottom: 10,
      alignSelf: 'center',
    },
    name: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white',
    },
    username: {
      fontSize: 18,
      color: 'white',
    },
    email: {
      fontSize: 30,
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
    stat: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      marginTop: 20,
    },
    statNumber: {
      fontSize: 20,
      color: '#F83600',
      fontFamily: 'Alkatra-VariableFront_wght',
      textTransform: 'uppercase',
      marginTop: 10,

    },
    statLabel: {
      fontSize: 30,
      color: 'white',
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
      fontSize: 44,
      color: 'white',
      marginTop: 20,
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
  });

  export default AccountProfileScreen;
