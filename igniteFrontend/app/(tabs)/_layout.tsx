import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { createDrawerNavigator } from '@react-navigation/drawer';
// Remove the duplicate import statement for 'FontAwesome'
import HomeScreen from './HomeScreen'; // Import the HomeScreen component with the correct file extension
import { View } from 'react-native';
import { Text } from 'react-native';
import { Button } from 'react-native-elements';
import SettingsScreen  from './SettingsScreen'; 
import AccountProfileScreen from './AccountProfileScreen';
import LoginScreen from './LoginScreen';
import * as React from 'react';
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons'; // Add this import statement
import { useColorScheme } from '@/components/useColorScheme';
import PrivacyPolicy  from './PrivacyPolicy';


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const Drawer = createDrawerNavigator();

function DrawerContent(props: any) {
  // Add your dropdown menu items and navigation logic here
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Dropdown Menu</Text>
      {/* Add your menu items here */}
      <Button title="Home" onPress={() => props.navigation.navigate('Home')} />
      <Button title="Login" onPress={() => props.navigation.navigate('LoginScreen')} />
      <Button title='Account Profile' onPress={() => props.navigation.navigate('AccountProfileScreen')} />
      <Button title="Appearance/Theme" onPress={() => props.navigation.navigate('AppearanceTheme')} />
      <Button title="Retake Fitness Survey" onPress={() => props.navigation.navigate('RetakeFitnessSurvey')} />
      <Button title="Login" onPress={() => props.navigation.navigate('LoginScreen')} />
      <Button title="Privacy Policy" onPress={() => props.navigation.navigate('PrivacyPolicy')} />
      <Button title="Security/Privacy" onPress={() => props.navigation.navigate('SecurityPrivacy')} />
      <Button title="Settings" onPress={() => props.navigation.navigate('Settings')} /> 
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
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen} // Replace with your actual home screen component
        options={{
          title: 'Dashboard',
          // Remove tabBarIcon as it's not used in Drawer
          // drawerIcon can be used to set the drawer menu icon
          drawerIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen} // Replace with your actual settings screen component
        options={{
          title: 'Settings',
          // Remove tabBarIcon as it's not used in Drawer
          drawerIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Drawer.Screen
        name="AccountProfileScreen"
        component={AccountProfileScreen} // Replace with your actual account profile screen component
        options={{
          title: 'Account Profile',
          drawerIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
        />
      <Drawer.Screen
        name="LoginScreen"
        component={LoginScreen} // Replace with your actual login screen component
        options={{
          title: 'Login',
          drawerIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
        />
      <Drawer.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy} // Replace with your actual privacy policy screen component
        options={{
          title: 'Privacy Policy',
          drawerIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
        />
    </Drawer.Navigator>
  );
}

