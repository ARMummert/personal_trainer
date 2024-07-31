import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, TextInput, Button, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { LineChart } from 'react-native-chart-kit'; // Add this line to import LineChart

const AccountProfileScreen = () => {
  const [userData, setUserData] = useState({ name: '', username: '', email: '', avatar: '', workoutStreak: 0, completedWorkouts: 0, });
  const navigation = useNavigation();
  const [currentWeight, setCurrentWeight] = useState('');
  const [weightHistory, setWeightHistory] = useState<number[]>([]);

  const getUserData = async () => {
    try {
      // Assume token is stored after login
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'No token found');
        return;
      }

      const response = await fetch('http://localhost:5000/api/user', {  // Replace with your server IP
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const fetchedUser = await response.json();
      setUserData(fetchedUser);
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Unable to fetch user data.');
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  
  const saveWeight = async () => {
    if (!currentWeight) {
      Alert.alert('Error', 'Please enter your weight');
      return;
    }

    const newWeight = parseFloat(currentWeight);
    if (isNaN(newWeight) || newWeight <= 0) {
      Alert.alert('Error', 'Please enter a valid weight');
      return;
    }

    const updatedWeightHistory = [...weightHistory, newWeight];
    setWeightHistory(updatedWeightHistory);
    setCurrentWeight('');
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'No token found');
        return;
      }

      const response = await fetch('http://localhost:5000/api/user/weight', {  // Replace with your server IP
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ weightHistory: updatedWeightHistory }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      Alert.alert('Success', 'Weight updated successfully');
    } catch (error) {
      console.error('Error saving weight data:', error);
      Alert.alert('Error', 'Unable to save weight data.');
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        {userData.avatar && (
          <Image source={{ uri: userData.avatar }} style={styles.avatar} />
        )}
        <Text style={styles.welcomeText}>Welcome, {userData.name}</Text>
        <Text style={styles.username}>Username: {userData.username}</Text>
        <Text style={styles.email}>Email: {userData.email}</Text>
      </View>
      <View>
        <Text style={styles.welcomeText}>Track your progress</Text>
        <Text style={styles.workoutStreak}>Workout Streak: {userData.workoutStreak}</Text>
        <Text style={styles.completedWorkouts}>Completed Workouts: {userData.completedWorkouts}</Text>
        <Text style={styles.welcomeText}>Weight Tracker</Text>
        <Text style={styles.workoutStreak}>Current Weight</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your weight"
          value={currentWeight}
          onChangeText={setCurrentWeight}
          keyboardType="numeric" />
        <Button title="Save Weight" onPress={saveWeight} /> 
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
    {weightHistory.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Weight Loss Progress</Text>
          <LineChart
            data={{
              labels: weightHistory.map((_, index) => `Day ${index + 1}`),
              datasets: [
                {
                  data: weightHistory,
                },
              ],
            }}
            width={Dimensions.get('window').width - 40} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix="kg"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#000',
              backgroundGradientFrom: '#1E2923',
              backgroundGradientTo: '#08130D',
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      )}
    </ScrollView>
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
  settingsList: {},
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
    
  }
});

export default AccountProfileScreen;
