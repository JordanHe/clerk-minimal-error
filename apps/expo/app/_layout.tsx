import "react-native-get-random-values";
import { Stack, SplashScreen } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TRPCProvider, api } from "../src/utils/api";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import SignUpScreen from "./components/signUpScreen";
import SignInScreen from "./components/signInScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { tokenCache } from "./utils/tokenCache";
import { createModalProvider, Alert, Menu } from "react-native-unicorn-modals";

import { ToastProvider } from "react-native-toast-notifications";
import ff from "./utils/globalStyles";
import NetInfo from "@react-native-community/netinfo";
import NoWifi from "./components/noWifi";

// TrackPlayer.registerPlaybackService(() => require("./service"));

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [signInUp, setSignInUp] = useState(true);

  const CLERK_PUBLISHABLE_KEY = "x";

  const changeScreen = () => {
    setSignInUp(!signInUp);
  };

  const [isConnected, setIsConnected] = useState(true);

  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Italic": require("../assets/fonts/Montserrat-Italic.ttf"),
    "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Thin": require("../assets/fonts/Montserrat-Thin.ttf"),
    "Montserrat-Black": require("../assets/fonts/Montserrat-Black.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // await SplashScreen.hideAsync();
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      {isConnected ? (
        <ClerkProvider
          tokenCache={tokenCache}
          publishableKey={CLERK_PUBLISHABLE_KEY}
        >
          <TRPCProvider>
            <SafeAreaProvider onLayout={onLayoutRootView}>
              <ToastProvider
                offsetBottom={60}
                offsetTop={60}
                dangerColor="#EF4E4E"
                textStyle={[{ textAlign: "center" }, ff.regular]}
              >
                <SignedIn>
                  <Stack
                    screenOptions={{
                      headerStyle: {
                        backgroundColor: "#f472b6",
                      },
                      headerShown: false,
                    }}
                  >
                    <Stack.Screen name="index" options={{}} />
                  </Stack>
                </SignedIn>
                <SignedOut>
                  <SafeAreaView className="flex-1" edges={["top"]}>
                    {signInUp ? (
                      <SignUpScreen changeScreen={changeScreen} />
                    ) : (
                      <SignInScreen changeScreen={changeScreen} />
                    )}
                  </SafeAreaView>
                </SignedOut>
              </ToastProvider>
            </SafeAreaProvider>
          </TRPCProvider>
        </ClerkProvider>
      ) : (
        <>
          <NoWifi />
        </>
      )}
    </>
  );
};

export default RootLayout;
