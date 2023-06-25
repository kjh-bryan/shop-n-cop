import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'OpenSans-Regular': require('../../assets/fonts/OpenSans/OpenSans-Regular.ttf'),
    'OpenSans-Bold': require('../../assets/fonts/OpenSans/OpenSans-Bold.ttf'),
    'OpenSans-Light': require('../../assets/fonts/OpenSans/OpenSans-Light.ttf'),
    'Roboto-Bold': require('../../assets/fonts/Roboto/Roboto-Bold.ttf'),
    'Roboto-Medium': require('../../assets/fonts/Roboto/Roboto-Medium.ttf'),
    'Roboto-Light': require('../../assets/fonts/Roboto/Roboto-Light.ttf'),
  });
};
