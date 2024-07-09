import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Icon } from 'react-native-elements';

interface LoginProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simulate login (replace with actual authentication logic)
    if (email && password) {
      navigation.navigate('Profile');
    } else {
      alert('Please enter email and password');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Icon name="account-circle" size={100} />
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ width: '80%', height: 40, borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={{ width: '80%', height: 40, borderWidth: 1, padding: 10, marginTop: 10 }}
      />
      <Button title="Login" onPress={handleLogin}/>
    </View>
  );
};

export default LoginScreen;
