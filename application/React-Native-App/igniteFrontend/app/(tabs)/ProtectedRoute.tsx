// ProtectedRoute.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from './AuthContext';
import { useNavigation } from '@react-navigation/native';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuth() as { isLoggedIn: false };
  const navigation = useNavigation();
  if (!isLoggedIn) {
    return (
      <View>
        <Text>You must be logged in to access this page.</Text>
        <Button title="Login" onPress={() => navigation.navigate('LoginScreen' as never)} />
      </View>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
