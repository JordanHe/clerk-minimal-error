import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Keyboard,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import Text from "../defaultText";
import { useSignIn } from "@clerk/clerk-expo";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import ff from "../utils/globalStyles";
import { useKeyboard } from "../hooks/useKeyboard";

import { useToast } from "react-native-toast-notifications";

type signInProps = {
  changeScreen: () => void;
};

const SignInScreen: React.FC<signInProps> = ({ changeScreen }) => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const toast = useToast();

  const [emailAddress, setEmailAddress] = useState("");
  const [emailAddressError, setEmailAddressError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [usernameInputPadding, setUsernameInputPadding] = useState(0);
  const marginTop2 = useSharedValue(usernameInputPadding);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginTop: withSpring(marginTop2.value),
    };
  });

  useDerivedValue(() => {
    marginTop2.value = usernameInputPadding;
  }, [usernameInputPadding]);

  const { keyboardShown } = useKeyboard();
  useEffect(() => {
    setUsernameInputPadding(
      keyboardShown ? (Platform.OS === "ios" ? -250 : -120) : 0,
    );
  }, [keyboardShown]);

  const onSignInPress = async () => {
    setIsLoading(true);
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn!.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive!({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      setIsLoading(false);
      err.errors.map((error: any) => {
        if (error.code == "strategy_for_user_invalid") {
          toast.show("Sign in using the Apple, Facebook or Google button.", {
            placement: "top",
          });
        }
        if (error.meta.paramName == "password") {
          setPasswordError(error.longMessage);
        } else if (error.meta.paramName == "identifier") {
          setEmailAddressError(error.longMessage);
        }
      });
    }
  };

  const handleDismiss = () => {
    setUsernameInputPadding(0);
    Keyboard.dismiss();
  };

  return (
    <>
      <Animated.View
        style={[animatedStyle, { height: "40%" }]}
        className="overflow-hidden"
      />
      <TouchableOpacity activeOpacity={1} onPress={handleDismiss}>
        <View
          className={"items-center justify-center self-center py-8"}
          style={{ width: "90%" }}
        >
          <View className={"w-full rounded-3xl px-3"}>
            <Text
              className={"text-ice-lavender pb-8 text-center text-3xl"}
              style={ff.black}
            >
              Sign In
            </Text>

            {/* <OAuth /> */}

            <View className={"mb-4"}>
              <TextInput
                className={
                  "border-ice-lavender text-ice-lavender w-full rounded-xl p-3"
                }
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={emailAddress}
                allowFontScaling={false}
                placeholderTextColor={"grey"}
                cursorColor={"#FE6F64"}
                style={[
                  ff.regular,
                  {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    borderWidth: 1,
                  },
                ]}
                placeholder="Email Address"
                onChangeText={(email) => {
                  setEmailAddress(email);
                  setEmailAddressError("");
                }}
              />
              {emailAddressError && (
                <Text className="text-error-400 pl-2 pt-2">
                  {" "}
                  {emailAddressError}
                </Text>
              )}
            </View>

            <View className={"mb-6"}>
              <TextInput
                className={
                  "border-ice-lavender text-ice-lavender w-full rounded-xl p-3"
                }
                value={password}
                placeholder="Password"
                textContentType="password"
                cursorColor={"#FE6F64"}
                allowFontScaling={false}
                placeholderTextColor={"grey"}
                style={[
                  ff.regular,
                  {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    borderWidth: 1,
                  },
                ]}
                secureTextEntry={true}
                onChangeText={(password) => {
                  setPassword(password);
                  setPasswordError("");
                }}
              />
              {passwordError && (
                <Text className="text-error-400 pl-2 pt-2">
                  {" "}
                  {passwordError}
                </Text>
              )}
            </View>

            <TouchableOpacity
              className={
                "bg-off-black border-peach h-10 justify-center rounded-3xl px-4 py-2 font-bold"
              }
              style={{ borderWidth: 1 }}
              onPress={onSignInPress}
            >
              {!isLoading ? (
                <Text className={"text-peach text-center"} style={ff.regular}>
                  Sign In
                </Text>
              ) : (
                <View className="my-auto self-center">
                  <ActivityIndicator size={"small"} color="#FE6F64" />
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className={"mt-4 text-sm "}
              onPress={changeScreen}
            >
              <Text
                className={"text-ice-lavender py-2 text-center underline"}
                style={ff.regular}
              >
                Don't have an account? Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default SignInScreen;
