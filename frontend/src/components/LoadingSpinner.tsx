import React from 'react';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { darkGreen } from '../constants';

export const LoadingSpinner = () => {
  const spinnerSize = Platform.OS === 'android' ? 60 : 'large';
  return (
    <View style={styles.loading}>
      <View
        style={
          (StyleSheet.absoluteFill,
          { justifyContent: 'center', alignItems: 'center' })
        }
      >
        <ActivityIndicator size={spinnerSize} color={darkGreen} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.4,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
