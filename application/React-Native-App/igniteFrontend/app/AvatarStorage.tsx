import React, { useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AvatarStorage = () => {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const storeAvatar = async (uri: string) => {
    try {
      // Generate a unique file name
      const fileName = uri.split('/').pop();
      const newPath = FileSystem.documentDirectory ? FileSystem.documentDirectory + fileName : '';

      // Copy the image to the app's document directory
      await FileSystem.copyAsync({ from: uri, to: newPath });

      // Save the image path in AsyncStorage
      await AsyncStorage.setItem('storedImage', newPath);

      setAvatarUri(newPath);
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const loadImage = async () => {
    try {
      const storedImagePath = await AsyncStorage.getItem('storedImage');
      if (storedImagePath) {
        setAvatarUri(storedImagePath);
      }
    } catch (error) {
      console.error('Error loading image:', error);
    }
  };

  return (
    <View>
      <Button title="Load Image" onPress={loadImage} />
      {avatarUri ? (
        <Image source={{ uri: avatarUri }} style={{ width: 200, height: 200 }} />
      ) : (
        <Text>No Image Loaded</Text>
      )}
    </View>
  );
};

export default AvatarStorage;


