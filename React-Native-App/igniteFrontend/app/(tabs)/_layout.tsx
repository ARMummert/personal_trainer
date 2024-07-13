import * as React from 'react';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import { View, StyleSheet, Text, GestureResponderEvent, TouchableOpacity, Appearance } from 'react-native';
import HomeScreen from './HomeScreen'; 
import SettingsScreen  from './SettingsScreen'; 
import AccountProfileScreen from './AccountProfileScreen';
import LoginScreen from './loginScreen';
import PrivacyPolicy  from './PrivacyPolicy';
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons'; 
import { useColorScheme } from '@/components/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
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
      <TouchableOpacity style={styles.navigationButton} onPress={() => props.navigation.navigate('AppearanceTheme')}>
        <Text style={styles.buttonText}>Appearance / Theme </Text>
      </TouchableOpacity>
      </LinearGradient>
      <LinearGradient colors={['#F83600', '#FE8C00']} style={styles.gradient}>
      <TouchableOpacity style={styles.navigationButton} onPress={() => props.navigation.navigate('RetakeFitnessSurvey')}>
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
    </View>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
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
        name="Settings"
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
    </Drawer.Navigator>
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
});

