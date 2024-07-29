import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp } from '@react-navigation/native';
import { ScrollView } from 'react-native';
interface SignUpProps {
  navigation: NavigationProp<any>;
}

const editUsername: React.FC<SignUpProps> = ({ navigation }) => {
  const [Username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState(''); 

  const handleEditProfile = async () => {
    if ( !Username || !newUsername ) {
      alert('Please fill out all fields');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/user/{UserID}', {
        method: 'PUT',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ Username, newUsername }),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert('Account created successfully');
          navigation.navigate('AccountProfileScreen');
        } else {
          alert('Failed to update Username');
        }
      } else {
        alert('Update failed');
      }
    } catch (error) {
      console.error('Error during update:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.scroll}>
    <View style={styles.container}>
      <Text style={styles.title}>Edit Username</Text>
      <View style={styles.space}></View>
      <LinearGradient style={styles.inputContainer} colors={['#F83600', '#FE8C00']}>
        <TextInput
          placeholder="Enter Current Username"
          value={Username}
          onChangeText={setUsername}
          style={styles.input}
        />
      </LinearGradient>
      <LinearGradient style={styles.inputContainer} colors={['#F83600', '#FE8C00']}>
        <TextInput
          placeholder="Enter New Username"
          value={newUsername}
          onChangeText={setNewUsername}
          style={styles.input}
        />
      </LinearGradient> 
     
      <View style={styles.space}></View>
      <TouchableOpacity
        onPress={handleEditProfile}
        style={styles.signUpButton}
      >
        <Text style={styles.signUpButtonText}>Save</Text>
      </TouchableOpacity>
      <View style={styles.space}></View>
    </View>
    </ScrollView> 
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
  scroll: {
    backgroundColor: 'black',
    width: '100%',
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
    fontSize: 20,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: 'white',
    borderColor: 'white',
    fontFamily: 'Alkatra-VariableFront_wght',
  },
  inputContainer: {
    width: '20%',
    height: 40,
    borderRadius: 5,
    color: 'white',
    marginBottom: 15,
    borderColor: 'white',
  },
  space: {
    height: 20,
  },
  backToLogin: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'Alkatra-VariableFront_wght',
  },
  avatarImage: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 20,
    color: 'black',
    marginBottom: 5,
    fontFamily: 'Alkatra-VariableFront_wght',
  },
  picker: {
    backgroundColor: '#EB2000',
    width: '13%',
    height: '12%',
    borderRadius: 5,
    marginTop: 10,
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    
  },
  pickerImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  pickerLabel: {
    color: 'black',
    fontWeight: 'bold',
  },
  pickerText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Alkatra-VariableFront_wght',
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  signUpButton: {
    backgroundColor: '#EB2000',
    padding: 10,
    borderRadius: 5,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Alkatra-VariableFront_wght',
    fontWeight: 'bold',
  },
  carrot : {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    color: 'white',
    marginBottom: 10,
  },
});

export default editUsername;