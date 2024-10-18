import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Platform, useColorScheme } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import { DarkTheme, LightTheme } from '@/constants/Colors';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const backgroundColor = useThemeColor("background");
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const isWeb = Platform.OS === "web";
  const screenOptions = {
    ...(isWeb ? {} : { contentStyle: { backgroundColor } })
  };
  console.log(screenOptions);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : LightTheme}>
      <Stack screenOptions={screenOptions}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
