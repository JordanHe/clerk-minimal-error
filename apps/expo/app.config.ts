import { ExpoConfig, ConfigContext } from "@expo/config";

const CLERK_PUBLISHABLE_KEY = "xxxx";

const defineConfig = (_ctx: ConfigContext): ExpoConfig => ({
  name: "minimal",
  slug: "minimal",
  owner: "redacted",
  version: "1.0.0",
  orientation: "portrait",
  scheme: "myapp",
  icon: "./assets/intvl.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/intvl.png",
    resizeMode: "contain",
    backgroundColor: "#FE6F64",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.minimal.app",
    infoPlist: {
      NSHealthShareUsageDescription:
        "We care about your well-being! Please grant us access to your health data, so we can provide personalized insights and recommendations to help you achieve your fitness goals.",
      NSHealthUpdateUsageDescription:
        "Stay motivated and track your progress effortlessly! Allow us to write health data to your Health app, so we can record your workouts and activities for a more accurate fitness analysis.",
      UIBackgroundModes: ["location"],
      LSApplicationQueriesSchemes: ["strava"],
    },
    entitlements: {
      "com.apple.developer.healthkit": true, // required to use healthkit
    },
  },
  android: {
    package: "com.minimal.app",
    googleServicesFile: "",
    // adaptiveIcon: {
    //   foregroundImage: "./app/paywall/img/splashScreen.png",
    //   backgroundColor: "#19171C",
    // },
  },
  web: {
    bundler: "metro",
  },
  extra: {
    eas: {
      projectId: "",
    },
    CLERK_PUBLISHABLE_KEY,
  },
  plugins: [
    ["./expo-plugins/with-modify-gradle.js"],

    [
      "expo-media-library",
      {
        photosPermission: "Allow x to access your photos.",
        savePhotosPermission: "Allow x to save photos.",
        isAccessMediaLocationEnabled: true,
      },
    ],
    [
      "expo-camera",
      {
        cameraPermission: "Allow x to access your camera.",
      },
    ],
    ["expo-localization"],
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission:
          "Allow x to use your location to track your runs using GPS while in the run mode.",
        isAndroidBackgroundLocationEnabled: true,
      },
    ],
    [
      "expo-image-picker",
      {
        photosPermission:
          "The app accesses your photos to choose a profile picture for the x App",
      },
    ],
  ],
});

export default defineConfig;
