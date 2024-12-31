import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@react-navigation/native";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme(); // Handles light/dark theme
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulating login status
  
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"), // Custom font
    EuclidCircularBRegular : require("../assets/fonts/Euclid Circular B Regular.ttf")
  });

  // Prevent the splash screen from hiding until fonts are loaded
  useEffect(() => {
    const loadApp = async () => {
      await SplashScreen.preventAutoHideAsync();
      if (fontsLoaded) {
        SplashScreen.hideAsync();
      }
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
        {!isLoggedIn ? (
          // If user is not logged in, show onboarding stack
          <Stack.Screen
            name="(onboarding)"
            options={{ headerShown: false }}
          />
        ) : (
          // If logged in, show the main tab navigation
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
        )}
        {/* Add a fallback for undefined routes */}
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
