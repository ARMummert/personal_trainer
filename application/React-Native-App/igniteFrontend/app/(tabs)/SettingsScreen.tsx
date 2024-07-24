import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { NavigationProp } from '@react-navigation/native';
const SettingsScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
const navigateTo = (screen: string) => navigation.navigate(screen);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.settingItem} onPress={() => navigateTo('AccountProfileScreen')}>
        <FontAwesome name="user" size={24} style={styles.icon} />
        <Text style={styles.settingText}>Account Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={() => navigateTo('PrivacyPolicy')}>
        <FontAwesome name="lock" size={24} style={styles.icon} />
        <Text style={styles.settingText}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={() => navigateTo('AccountSignupScreen')}>
        <FontAwesome name="user-plus" size={24} style={styles.icon} />
        <Text style={styles.settingText}>Create an Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={() => navigateTo('SecurityPrivacy')}>
        <FontAwesome name="shield" size={24} style={styles.icon} />
        <Text style={styles.settingText}>Security/Privacy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={() => navigateTo('FitnessSurveyScreen')}>
        <FontAwesome name="heartbeat" size={24} style={styles.icon} />
        <Text style={styles.settingText}>Retake Fitness Survey</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={() => navigateTo('LoginScreen')}>
        <FontAwesome name="key" size={24} style={styles.icon} />
        <Text style={styles.settingText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={() => navigateTo('ResetPasswordScreen')}>
        <FontAwesome name="refresh" size={24} style={styles.icon} />
        <Text style={styles.settingText}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={() => navigateTo('ResetUserNameScreen')}>
        <FontAwesome name="user" size={24} style={styles.icon} />
        <Text style={styles.settingText}>Reset Username</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: 'white',
  },
  icon: {
    marginRight: 10,
    color: 'white',
  },
  settingText: {
    fontSize: 16,
    color: 'white',
  },
});

export default SettingsScreen;
