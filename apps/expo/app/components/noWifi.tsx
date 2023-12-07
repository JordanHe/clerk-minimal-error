import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { View, ImageBackground, Platform } from "react-native";
import Text from "../defaultText";

import { Feather } from "@expo/vector-icons";
import ff from "../utils/globalStyles";

type NoWifiProps = {};

const NoWifi: React.FC<NoWifiProps> = (p) => {
  return (
    <View className="h-full w-full">
      <View className="mx-auto my-auto items-center">
        <Feather name="wifi-off" size={128} color="#EBF1FF" />
        <Text
          className="text-ice-lavender px-12 pt-12 text-center text-xl"
          style={ff.bold}
        >
          Uh-oh! It seems like your internet connection is off.
        </Text>
        <Text
          className="text-ice-lavender px-12 pt-4 text-center text-base"
          style={ff.regular}
        >
          Please turn it on to access the latest updates and information from
          our app. Thanks!
        </Text>
      </View>
    </View>
  );
};

export default NoWifi;
