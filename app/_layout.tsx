import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@react-navigation/native";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme(); // Handles light/dark theme
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulating login status
  const router = useRouter()
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"), // Custom font
    EuclidCircularBRegular: require("../assets/fonts/Euclid Circular B Regular.ttf"),
    EuclidCircularBMedium: require("../assets/fonts/Euclid Circular B Medium.ttf"),
    EuclidCircularBSemiBold: require("../assets/fonts/Euclid Circular B SemiBold.ttf"),
    EuclidCircularBBold: require("../assets/fonts/Euclid Circular B Bold.ttf"),
  });

  // Prevent the splash screen from hiding until fonts are loaded
  useEffect(() => {
    const loadApp = async () => {
      await SplashScreen.preventAutoHideAsync();
      if (fontsLoaded) {
        SplashScreen.hideAsync();
      }
     router.replace("/(tabs)")
    };
    loadApp();
  }, [fontsLoaded]);

  // Show nothing until fonts are loaded
  if (!fontsLoaded) {
    return null;
  }

  // Render the navigation stack
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(recipienttabs)" options={{ headerShown: false }} />
        <Stack.Screen name="request/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
