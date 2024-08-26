/* eslint-disable global-require */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { NativeWindStyleSheet } from 'nativewind';
import { useEffect } from 'react';

import { RefreshProvider } from '@/context/RefreshContext';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function Layout() {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <RefreshProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: 'modal', title: 'Add new contact' }}
        />
        <Stack.Screen
          name="edit/[id]"
          options={{
            title: 'Contact Detail',
            navigationBarColor: '#000',
            headerTintColor: '#000',
          }}
        />
      </Stack>
    </RefreshProvider>
  );
}
