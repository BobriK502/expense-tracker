import 'react-native-reanimated';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SQLiteProvider } from 'expo-sqlite';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, Suspense } from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { View, Text } from 'react-native';

import { migrateDbIfNeeded } from '@/db/index';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { BottomSheet } from '@/components/bottomSheet/index';

import "../global.css"

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? 'light';
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

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Suspense fallback={<View><Text>loading...</Text></View>}>
        <SQLiteProvider databaseName="test.db" onInit={migrateDbIfNeeded}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <KeyboardProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false, statusBarStyle: "dark" }} />
                <Stack.Screen name="+not-found" />
                <Stack.Screen name="entities/new" options={{ headerShown: false, statusBarStyle: "dark" }} />
                <Stack.Screen name="entities/edit" options={{ headerShown: false, statusBarStyle: "dark" }} />
                <Stack.Screen name="settings" options={{ headerShown: false, statusBarStyle: "dark" }} />
              </Stack>
              <StatusBar style="auto" animated backgroundColor={Colors[colorScheme].background} />
            </KeyboardProvider>
            <BottomSheet />
          </GestureHandlerRootView>
        </SQLiteProvider>
      </Suspense>
    </ThemeProvider >
  );
}

