import { Text, TextProps } from './Themed';
import React from 'react';
import { LinearGradient } from 'react-native-linear-gradient';
import { Text as RNText, StyleSheet } from 'react-native';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
}

