import { registerRootComponent } from 'expo';
import { Navigation } from './navigation/StackNavigator';
import { loadFonts } from './utils';
import AppLoading from 'expo-app-loading';

const EntryPoint = () => {
  const [fontsLoaded, error] = loadFonts();
  if (error !== null) {
    console.error('Cannot load custom fonts. Using default fonts...');
  }
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      <Navigation />
    </>
  );
};

export default registerRootComponent(EntryPoint);
