import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import * as NavigationBar from "expo-navigation-bar";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Platform } from "react-native";
import Head from "expo-router/head";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    GeistBold: require("../assets/fonts/Geist-Bold.ttf"),
    GeistSemiBold: require("../assets/fonts/Geist-SemiBold.ttf"),
    GeistMedium: require("../assets/fonts/Geist-Medium.ttf"),
    GeistRegular: require("../assets/fonts/Geist-Regular.ttf"),
  });

  useEffect(() => {
    const setNavBar = async () => {
      try {
        if (Platform.OS === "android") {
          await SplashScreen.preventAutoHideAsync();
          await NavigationBar.setPositionAsync("absolute");
          await NavigationBar.setBackgroundColorAsync("#00000000");
          await NavigationBar.setVisibilityAsync("hidden");
          await NavigationBar.setBehaviorAsync("overlay-swipe");
        }
      } catch (e) {
        console.warn("Error setting navigation bar:", e);
      } finally {
        if (loaded) {
          await SplashScreen.hideAsync();
        }
      }
    };

    setNavBar();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Expo Blog</title>
        <meta
          name="description"
          content="Single screen blog demo with expo and reanimated."
        />

        {/* Open Graph / Facebook */}
        <meta
          name="og:image"
          content="https://raw.githubusercontent.com/Solarin-Johnson/expo-blog/refs/heads/main/assets/images/twitter-cover.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:title" content="Expo Blog" />
        <meta
          property="og:description"
          content="Single screen blog demo with expo and reanimated"
        />
        <meta property="og:url" content="https://expo-blog.expo.app" />
        <meta property="og:type" content="blog" />

        {/* Twitter */}
        <meta
          name="twitter:image"
          content="https://raw.githubusercontent.com/Solarin-Johnson/expo-blog/refs/heads/main/assets/images/twitter-cover.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Expo Blog" />
        <meta
          name="twitter:description"
          content="Single screen blog demo with expo and reanimated."
        />
      </Head>
      <SafeAreaProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" hidden hideTransitionAnimation="fade" />
        </ThemeProvider>
      </SafeAreaProvider>
    </>
  );
}
