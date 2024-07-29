import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
interface SignUpProps {
  navigation: NavigationProp<any>;
}

const AccountSignUpScreen: React.FC<SignUpProps> = ({ navigation }) => {
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Fullname, setFullname] = useState('');
  const [RePassword, setRePassword] = useState('');
  const [loadedAvatarOptions, setLoadedAvatarOptions] = useState<{ label: string; value: any; }[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadAvatars = () => {
      const avatarOptions = [
        { label: 'Crimson Crush', value: require('../../assets/images/avatardarkpink.png') },
        { label: 'Blue Boost', value: require('../../assets/images/avatarblue.png') },
        { label: 'Focused Teal', value: require('../../assets/images/avatarteal.png') },
        { label: 'Vibrant Violet', value: require('../../assets/images/avatarpurple.png') },
        { label: 'Refreshing Green', value: require('../../assets/images/avatargreen.png') },
        { label: 'Sunshine Yellow', value: require('../../assets/images/avataryellow.png') },
        { label: 'Fiery Orange', value: require('../../assets/images/avatarorange.png') },
        { label: 'Rose Gold Radiance', value: require('../../assets/images/avatarpink.png') },
      ];
      setLoadedAvatarOptions(avatarOptions);
    };

    loadAvatars();
  }, []);

  const handleSignUp = async () => {
    if (!Fullname || !Username || !Email || !Password) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/accountEdit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Fullname, Username, Email, Password, selectedAvatar }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert('Account created successfully');
          navigation.navigate('LoginScreen');
        } else {
          alert('Failed to create account');
        }
      } else {
        alert('Sign-up failed');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const renderAvatarItem = ({ item }: { item: { label: string; value: any; } }) => (
    <TouchableOpacity
      style={styles.pickerItem}
      onPress={() => {
        setSelectedAvatar(item.label);
        setModalVisible(false);
      }}
    >
      <Image source={item.value} style={styles.pickerImage} />
      <Text style={styles.pickerLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.scroll}>
    <View style={styles.container}>
      <Text style={styles.title}>Edit Account Profile</Text>
      <View style={styles.space}></View>
      <LinearGradient style={styles.inputContainer} colors={['#F83600', '#FE8C00']}>
        <TextInput
          placeholder="Fullname"
          value={Fullname}
          onChangeText={setFullname}
          style={styles.input}
        />
      </LinearGradient>
      <LinearGradient style={styles.inputContainer} colors={['#F83600', '#FE8C00']}>
        <TextInput
          placeholder="Username"
          value={Username}
          onChangeText={setUsername}
          style={styles.input}
        />
      </LinearGradient>
      <LinearGradient style={styles.inputContainer} colors={['#F83600', '#FE8C00']}>
        <TextInput
          placeholder="Email"
          value={Email}
          onChangeText={setEmail}
          style={styles.input}
        />
      </LinearGradient>
      <LinearGradient style={styles.inputContainer} colors={['#F83600', '#FE8C00']}>
        <TextInput
          placeholder="Password"
          value={Password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={styles.input}
        />
      </LinearGradient>
      <LinearGradient style={styles.inputContainer} colors={['#F83600', '#FE8C00']}>
        <TextInput
          placeholder="Re-enter Password"
          value={RePassword}
          onChangeText={setRePassword}
          secureTextEntry={true}
          style={styles.input}
        />
      </LinearGradient>     
      <TouchableOpacity style={styles.picker} onPress={() => setModalVisible(true)}> 
        <Text style={styles.pickerText}>{selectedAvatar || 'Select Avatar...'}</Text>
        <AntDesign style={styles.carrot} name="caretdown" size={24} color="white" />
      </TouchableOpacity>
      {selectedAvatar && (
        <Image
          source={loadedAvatarOptions.find(option => option.label === selectedAvatar)?.value}
          style={styles.avatarImage}
        />
      )}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={loadedAvatarOptions}
              renderItem={renderAvatarItem}
              keyExtractor={(item) => item.label}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.space}></View>
      <TouchableOpacity
        onPress={handleSignUp}
        style={styles.signUpButton}
      >
        <Text style={styles.signUpButtonText}>Save Profile</Text>
      </TouchableOpacity>
      <View style={styles.space}></View>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.backToLogin}>Back to Login</Text>
      </TouchableOpacity>
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
    backgroundColor: '#F83600',
    width: '14%',
    height: '10%',
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
    color: '#F83600',
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
    backgroundColor: '#F83600',
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

export default AccountSignUpScreen;