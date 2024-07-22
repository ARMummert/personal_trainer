import * as React from 'react';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import { View, StyleSheet, Text, GestureResponderEvent, TouchableOpacity, Appearance, Alert } from 'react-native';
import HomeScreen from './HomeScreen'; 
import SettingsScreen  from './SettingsScreen'; 
import AccountProfileScreen from './AccountProfileScreen';
import LoginScreen from './loginScreen';
import PrivacyPolicy  from './PrivacyPolicy';
import LogoutScreen from './LogoutScreen';
import AccountSignupScreen from './AccountSignupScreen';
import FitnessSurveyScreen from './FitnessSurveyScreen';
import ResetPasswordScreen from './ResetPasswordScreen';
import ResetUserNameScreen from './ResetUserNameScreen';
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons'; 
import { useColorScheme } from '@/components/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';


// Footer component
const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
        <FontAwesome name="home" size={24} color='#F83600' />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AccountProfileScreen' as never)}>
        <FontAwesome name="user" size={24} color='#F83600' />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen' as never)}>
        <FontAwesome name="gear" size={24} color='#F83600' />
      </TouchableOpacity>
    </View>
  );
};


function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const Drawer = createDrawerNavigator();

function DrawerContent(props: any) {
  const navigation = useNavigation();
  

  function onPress(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
  }
   // Load custom fonts
   const [fontsLoaded] = useFonts({
    'Alkatra': require('../../assets/fonts/Alkatra-VariableFont_wght.ttf'), 
    'AguafinaScript-Regular': require('../../assets/fonts/AguafinaScript-Regular.ttf'),
  });
   
  if (!fontsLoaded) {
   <Text>Loading...</Text>;
  }
  return (
   
    <View style={styles.container}>   
      <TouchableOpacity style={styles.closeIcon} onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
    <FontAwesome name="close" size={24} color="white" />
  </TouchableOpacity>
    <View style={styles.navigationButtonContainer}>  
      <Text style={styles.headerTitle}>Ignite</Text>
      <LinearGradient colors={['#F83600', '#FE8C00']} style={styles.gradient}>
      <TouchableOpacity style={styles.navigationButton} onPress={() => props.navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      </LinearGradient>
      <LinearGradient colors={['#F83600', '#FE8C00']} style={styles.gradient}>
      <TouchableOpacity style={styles.navigationButton} onPress={() => props.navigation.navigate('LoginScreen')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      </LinearGradient>
      <LinearGradient colors={['#F83600', '#FE8C00']} style={styles.gradient}>
      <TouchableOpacity style={styles.navigationButton} onPress={() => props.navigation.navigate('AccountProfileScreen')}>
        <Text style={styles.buttonText}>Account Profile</Text>
      </TouchableOpacity>
      </LinearGradient>
      <LinearGradient colors={['#F83600', '#FE8C00']} style={styles.gradient}>
      <TouchableOpacity style={styles.navigationButton} onPress={() => props.navigation.navigate('AccountSignupScreen')}>
        <Text style={styles.buttonText}>Create an Account </Text>
      </TouchableOpacity>
      </LinearGradient>
      <LinearGradient colors={['#F83600', '#FE8C00']} style={styles.gradient}>
      <TouchableOpacity style={styles.navigationButton} onPress={() => props.navigation.navigate('FitnessSurveyScreen')}>
        <Text style={styles.buttonText}>Retake Fitness Survey</Text>
      </TouchableOpacity>
      </LinearGradient>
      <LinearGradient colors={['#F83600', '#FE8C00']} style={styles.gradient}>
      <TouchableOpacity style={styles.navigationButton} onPress={() => props.navigation.navigate('SettingsScreen')}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
      </LinearGradient>
      <LinearGradient colors={['#F83600', '#FE8C00']} style={styles.gradient}>
      <TouchableOpacity style={styles.navigationButton} onPress={() => props.navigation.navigate('PrivacyPolicy')}>
        <Text style={styles.buttonText}>Privacy Policy</Text>
      </TouchableOpacity>
      </LinearGradient>
      <LinearGradient colors={['#F83600', '#FE8C00']} style={styles.gradient}>
      <TouchableOpacity style={styles.navigationButton} onPress={() => props.navigation.navigate('LogoutScreen')}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      </LinearGradient>
      <LinearGradient colors={['#F83600', '#FE8C00']} style={styles.gradient}>
      <TouchableOpacity style={styles.navigationButton} onPress={() => props.navigation.navigate('ResetPasswordScreen')}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      </LinearGradient>
      <LinearGradient colors={['#F83600', '#FE8C00']} style={styles.gradient}>
      <TouchableOpacity style={styles.navigationButton} onPress={() => props.navigation.navigate('ResetUserNameScreen')}>
        <Text style={styles.buttonText}>Reset Username</Text>
      </TouchableOpacity>
      </LinearGradient>
    </View>
    </View>
    
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
      <View style={{ flex: 1 }}>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
        headerShown: useClientOnlyValue(false, true),
        headerStyle: {
        height: 100, // Adjust this value to your desired height
        backgroundColor: 'black', // Set background color
        borderBottomWidth: 0, // Remove bottom border
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight: 'bold',
      },
      headerTitle: ({ children }) => ( // Custom header for Home screen
      <View>
        <Text style={styles.headerTitle}>Ignite</Text>
      </View>
      ),
      headerLeft: (props) => (
      <DrawerToggleButton {...props} tintColor="white" />
      ),
    }}
    >
    <Drawer.Screen
    name="Home"
    component={HomeScreen}
    options={{
      title: 'Dashboard',
      drawerIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
    }}
    />
    <Drawer.Screen
    name="LoginScreen"
    component={LoginScreen}
    options={{
      title: 'Login',
      drawerIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
    }}
    />
    <Drawer.Screen
    name="AccountProfileScreen"
    component={AccountProfileScreen}
    options={{
      title: 'Account Profile',
      drawerIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
    }}
    />
     <Drawer.Screen
    name="AccountSignupScreen"
    component={AccountSignupScreen}
    options={{
      title: 'Create an Account',
      drawerIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
    }}
    />
      <Drawer.Screen
    name="FitnessSurveyScreen"
    component={FitnessSurveyScreen}
    options={{
      title: 'Fitness Survey',
      drawerIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
    }}
    />
    <Drawer.Screen
    name="SettingsScreen"
    component={SettingsScreen}
    options={{
      title: 'Settings',
      drawerIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
    }}
    />
    <Drawer.Screen
    name="PrivacyPolicy"
    component={PrivacyPolicy}
    options={{
      title: 'Privacy Policy',
      drawerIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
    }}
    />
    <Drawer.Screen
    name="LogoutScreen"
    component={LogoutScreen}
    options={{
      title: 'Logout',
      drawerIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
    }}
    />
    <Drawer.Screen
    name="ResetPasswordScreen"
    component={ResetPasswordScreen}
    options={{
      title: 'Reset Password',
      drawerIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
    }}
    />
     <Drawer.Screen
    name="ResetUserNameScreen"
    component={ResetUserNameScreen}
    options={{
      title: 'Reset Username',
      drawerIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
    }}
    />
  </Drawer.Navigator>
    <Footer /> 
  </View>
    );
  }

const styles = StyleSheet.create({
  navigationButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 25,
    padding: 20,
    backgroundColor: 'black',
    width: '75%',
  },
  navigationButton: {
    marginBottom: 10,
    marginTop: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 48,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 40,
    color: '#F83600', 
    fontFamily: 'AguafinaScript-Regular',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 0,
    margin: 0,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
    backgroundColor: 'white',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5, 
  },
  gradient: {
    width: '100%',
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Alkatra-VariableFront_wght',
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Alkatra-VariableFront_wght',
  },
  closeButton: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Alkatra-VariableFront_wght',
    marginBottom: 20,
  },
  closeIcon: {
    position: 'absolute',
    top: 40,
    right: 40,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
  },
});

