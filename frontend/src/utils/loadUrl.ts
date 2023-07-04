import Constants from 'expo-constants';
import { Platform } from 'react-native';

export const localUrl = async () => {
  if (Platform.OS === 'android') {
    return Constants.linkingUri.replace(/^exp:\/\/(.*?):19000/, '$1');
  } else {
    return 'localhost';
  }
};
