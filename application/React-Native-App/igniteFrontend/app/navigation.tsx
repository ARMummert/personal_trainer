// Filename: navigation.tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../app/(tabs)/loginScreen';
import ResetPasswordScreen from '../app/(tabs)/ResetPasswordScreen';
import ResetUserNameScreen from '../app/(tabs)/ResetUserNameScreen';
import HomeScreen from '../app/(tabs)/HomeScreen';
import AccountSignUpScreen from '../app/(tabs)/AccountSignupScreen';
import FitnessSurveyScreen from '../app/(tabs)/FitnessSurveyScreen';

const Stack = createStackNavigator<any>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        <Stack.Screen name="ResetUserNameScreen" component={ResetUserNameScreen} />
        <Stack.Screen name="AccountSignUpScreen" component={AccountSignUpScreen} />
        <Stack.Screen name="FitnessSurveyScreen" component={FitnessSurveyScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
