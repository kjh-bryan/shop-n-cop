import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { deployedIPAddress } from '../constants';

export const localUrl = async () => {
  return deployedIPAddress;

  /* use this if local
  if (Platform.OS === 'android') {
    return Constants.linkingUri.replace(/^exp:\/\/(.*?):19000/, '$1');
  } else {
    return 'localhost';
  }
  */
};
