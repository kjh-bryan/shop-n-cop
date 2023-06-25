import { useState, useEffect, useCallback } from 'react';
import { registerRootComponent } from 'expo';
import { Navigation } from './navigation/StackNavigator';
import { loadFonts } from './utils';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

const EntryPoint = () => {
  const [appIsReady, setAppIsReady] = useState(false);

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
      <Navigation />
    </View>
  );
};

export default registerRootComponent(EntryPoint);
