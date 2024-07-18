// Filename: navigation.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../app/(tabs)/loginScreen';
import ResetPasswordScreen from '../app/(tabs)/ResetPasswordScreen';
import ResetUserNameScreen from '../app/(tabs)/ResetUserNameScreen';
import React from 'react';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        <Stack.Screen name="ResetUsernameScreen" component={ResetUserNameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;