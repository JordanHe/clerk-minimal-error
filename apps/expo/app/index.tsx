import { Redirect, useRouter } from "expo-router";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ImageBackground,
  Platform,
} from "react-native";
import Text from "./defaultText";
import { useUser } from "@clerk/nextjs";
import { RouterOutputs, api } from "../src/utils/api";
import { useCallback, useState } from "react";
import { useEffect } from "react";
// import { initTrackingBackgroundTask } from "./workout/runningComponents/gpsRun";

import NoWifi from "./components/noWifi";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

import NetInfo from "@react-native-community/netinfo";
import { useToast } from "react-native-toast-notifications";

const Index = () => {
  const router = useRouter();
  const toast = useToast();
  const { isSignedIn, user, isLoaded } = useUser();

  return <></>;
};

export default Index;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
