import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';


const handleResetUsername = async () => {
    const [Password] = useState('');
    try {
      const Username = await SecureStore.getItemAsync('userEmail');
      if (!Username) {
        // Handle case where email is not found
        alert('Email not found. Please register first.');
        return;
      }
  
      //API request
      const response = await fetch('http://localhost:5000/resetUsername', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Password }),
      });
    
  
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert('Password reset email sent. Check your inbox.');
        } else {
          alert('Password reset failed. Please try again later.');
        }
      } else {
        console.error('Error during password reset:', response.statusText);
        alert('An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      alert('An error occurred. Please try again.');
    }
  };

export default handleResetUsername;