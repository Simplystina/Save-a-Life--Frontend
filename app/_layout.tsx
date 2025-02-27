import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@react-navigation/native";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    EuclidCircularBRegular: require("../assets/fonts/Euclid Circular B Regular.ttf"),
    EuclidCircularBMedium: require("../assets/fonts/Euclid Circular B Medium.ttf"),
    EuclidCircularBSemiBold: require("../assets/fonts/Euclid Circular B SemiBold.ttf"),
    EuclidCircularBBold: require("../assets/fonts/Euclid Circular B Bold.ttf"),
  });

  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null); // null indicates loading state
  const [isMounted, setIsMounted] = useState(false); // Track component mount status
  const router = useRouter();

  useEffect(() => {
    const loadApp = async () => {
      await SplashScreen.preventAutoHideAsync();

      // Check token validity
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        // Optionally, validate the token with your backend here
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      if (fontsLoaded) {
        SplashScreen.hideAsync();
      }
    };
    loadApp();
  }, [fontsLoaded]);

  useEffect(() => {
    setIsMounted(true); // Set mounted status to true after component mounts
  }, []);

  useEffect(() => {
    if (isMounted && isAuthenticated !== null) {
      // Navigate based on authentication status
      if (isAuthenticated) { //change this after
        router.replace("/(tabs)"); // Navigate to the main app screen
      } else {
        router.replace("/(onboarding)"); // Navigate to the onboarding screen
      }
    }
  }, [isMounted, isAuthenticated]);

  if (!fontsLoaded || isAuthenticated === null) {
    // Show a loading indicator or splash screen while fonts are loading or auth status is being determined
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(recipienttabs)"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="request/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
