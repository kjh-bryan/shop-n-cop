import { useState, useEffect, useCallback } from 'react';
import { registerRootComponent } from 'expo';
import { loadFonts } from './utils';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { Navigation } from './navigation/StackNavigator';
import { ShopNCopStackNavigation } from './navigation/NavigationConstants';
import * as SecureStore from 'expo-secure-store';
import { kUserEmail } from './constants';

SplashScreen.preventAutoHideAsync();

const EntryPoint = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const [initialRoute, setInitialRoute] = useState<string>(ShopNCopStackNavigation.signIn);
  useEffect( () => {
    const handleLogInStatus = async () => {
      try {
      const userId = await SecureStore.getItemAsync(kUserEmail);
      if (userId !== null) {
        setInitialRoute(ShopNCopStackNavigation.search);
      } else {
        setInitialRoute(ShopNCopStackNavigation.signIn);
      }
    } catch(error) {
      console.error('handleLogInStatus]', error);
    }
    }
    handleLogInStatus();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await loadFonts();
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.error('Cannot load custom fonts. Using default fonts...');
      } finally {
        setAppIsReady(true);
      }
    })();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Navigation initialRoute={initialRoute}/>
    </View>
  );
};

export default registerRootComponent(EntryPoint);
