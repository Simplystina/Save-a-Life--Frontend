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
import { useRootNavigationState } from "expo-router";



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
  const [isReady, setIsReady] = useState(false); // Track component mount status
  const router = useRouter();
const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    const loadApp = async () => {
      await SplashScreen.preventAutoHideAsync();
      const token = await AsyncStorage.getItem("userToken");
      console.log(token,"token")
      setIsAuthenticated(!!token); // Convert token to boolean

      if (fontsLoaded) {
        console.log("We're here")
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    };
    loadApp();
  }, [fontsLoaded]);

  useEffect(() => {
    console.log(isReady,"isReady here")
      console.log(isReady, "isReady here");
      console.log(
        rootNavigationState.key,
        "rootNavigationState mounted here"
      );
      console.log(isAuthenticated, "isAuthenticated here");

    // Ensure everything is ready before navigating
    if (!isReady || !rootNavigationState?.key || isAuthenticated === null)
      return;
     console.log("We got here","we got here")
     if (isAuthenticated) {
      console.log("routing")
       router.replace("/(tabs)");
     } else {
       router.replace("/(onboarding)");
     }
    setTimeout(() => {
      console.log(isAuthenticated, "authenticated and token")
      
    }, 2000); // Small delay to prevent race conditions
  }, [isReady, rootNavigationState.key, isAuthenticated]);


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
          <Stack.Screen name="recipientrequestscreen/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
