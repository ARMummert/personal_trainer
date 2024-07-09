import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const CustomHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Ignite</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#f0f0f0', // Adjust background color as needed
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000', // Adjust text color as needed
    },
  });
  
  export default CustomHeader;
  