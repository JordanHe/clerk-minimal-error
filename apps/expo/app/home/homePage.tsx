import { Redirect, useRouter } from "expo-router";
import {
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
  RefreshControl,
} from "react-native";
import Text from "../defaultText";
import { AntDesign } from "@expo/vector-icons";
import ff from "../utils/globalStyles";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/clerk-expo";

import useTheme from "../utils/useTheme";

const HomePage = () => {
  const theme = useTheme();
  const router = useRouter();

  const { isSignedIn, user, isLoaded } = useUser();

  return <View className="flex-1"></View>;
};

export default HomePage;
