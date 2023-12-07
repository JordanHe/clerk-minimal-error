import { Tabs } from "expo-router";
import {
  FontAwesome5,
  Ionicons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";

import { useEffect, useState } from "react";
import { api } from "../../src/utils/api";
import { useUser } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import useTheme from "../utils/useTheme";

export default () => {
  const theme = useTheme();
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveBackgroundColor: theme == "dark" ? "#1C1C1C" : "#EBF1FF",
        tabBarInactiveBackgroundColor: theme == "dark" ? "#1C1C1C" : "#EBF1FF",
        tabBarInactiveTintColor: theme == "dark" ? "#1C1C1C" : "#EBF1FF",
        tabBarStyle: {
          backgroundColor: theme == "dark" ? "#1C1C1C" : "#EBF1FF",
        },
      }}
    >
      <Tabs.Screen
        name="homePage"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
          title: "Home",
          tabBarAllowFontScaling: false,
          headerTitleAllowFontScaling: false,
          headerShown: false,
          tabBarActiveTintColor: "#FE6F64",
          tabBarInactiveTintColor: theme == "light" ? "#1C1C1C" : "#EBF1FF",
        }}
      />
    </Tabs>
  );
  // return <Tabs/>
};
