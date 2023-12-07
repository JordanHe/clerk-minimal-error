import {
  ImageBackground,
  Keyboard,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import Text from "../defaultText";
import { useSignUp } from "@clerk/clerk-expo";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../../src/utils/api";
import ff from "../utils/globalStyles";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useKeyboard } from "../hooks/useKeyboard";
import { Ionicons } from "@expo/vector-icons";

type signUpProps = {
  changeScreen: () => void;
};

const SignUpScreen: React.FC<signUpProps> = ({ changeScreen }) => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState("");
  const [emailAddressError, setEmailAddressError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);

  const [usernameInputPadding, setUsernameInputPadding] = useState(0);
  const marginTop = useSharedValue(usernameInputPadding);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginTop: withSpring(marginTop.value),
    };
  });

  const handleVerificationChange = () => {
    setPendingVerification((val) => !val);
    setIsLoading(false);
    setEmailAddress("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };

  useDerivedValue(() => {
    marginTop.value = usernameInputPadding;
  }, [usernameInputPadding]);

  const { keyboardShown } = useKeyboard();
  useEffect(() => {
    setUsernameInputPadding(
      keyboardShown ? (Platform.OS === "ios" ? -250 : -160) : 0,
    );
  }, [keyboardShown]);

  // start the sign up process.
  const onSignUpPress = async () => {
    setIsLoading(true);
    if (!isLoaded) {
      return;
    }

    try {
      await signUp!.create({
        emailAddress,
        password,
        firstName,
        lastName,
      });

      // send the email.
      await signUp!.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      setIsLoading(false);
      err.errors.map((error: any) => {
        if (error.meta.paramName == "email_address") {
          setEmailAddressError(error.message);
        } else if (error.meta.paramName == "first_name") {
          setFirstNameError(error.message);
        } else if (error.meta.paramName == "last_name") {
          setLastNameError(error.message);
        } else if (error.meta.paramName == "password") {
          setPasswordError(error.message);
        }
      });
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    setIsVerifyLoading(true);
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp!.attemptEmailAddressVerification({
        code,
      });
      await setActive!({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      setIsVerifyLoading(false);
      console.error(JSON.stringify(err, null, 2));
      try {
        setCodeError(err.errors[0].longMessage);
      } catch (err: any) {
        setCodeError("");
      }
    }
  };

  const handleDismiss = () => {
    setUsernameInputPadding(0);
    Keyboard.dismiss();
  };

  return (
    <>
      <Animated.View
        style={[animatedStyle, { height: "35%" }]}
        className="overflow-hidden"
      />
      <TouchableOpacity activeOpacity={1} onPress={handleDismiss}>
        <View
          className={"items-center justify-center self-center py-8"}
          style={{ width: "90%" }}
        >
          {!pendingVerification && (
            <View className={"w-full rounded-3xl px-3"}>
              <Text
                className={"text-ice-lavender pb-8 text-center text-3xl"}
                style={ff.black}
              >
                Sign Up
              </Text>

              <View className="mb-4">
                <TextInput
                  className={
                    "text-ice-lavender border-ice-lavender w-full rounded-xl p-3"
                  }
                  autoCapitalize="none"
                  value={emailAddress}
                  placeholder="Email Address"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  allowFontScaling={false}
                  cursorColor={"#FE6F64"}
                  placeholderTextColor={"grey"}
                  style={[
                    ff.regular,
                    { backgroundColor: "rgba(0, 0, 0, 0.7)", borderWidth: 1 },
                  ]}
                  onChangeText={(email) => {
                    setEmailAddressError("");
                    setEmailAddress(email);
                  }}
                />
                {emailAddressError && (
                  <Text className="text-error-400 pl-2 pt-2">
                    {" "}
                    {emailAddressError}
                  </Text>
                )}
              </View>
              <View className="flex flex-row gap-2">
                <View className="mb-4 flex-col" style={{ width: "47%" }}>
                  <TextInput
                    className={
                      "text-ice-lavender border-ice-lavender w-full rounded-xl p-3"
                    }
                    autoCapitalize="words"
                    value={firstName}
                    placeholder="First Name"
                    textContentType="givenName"
                    allowFontScaling={false}
                    cursorColor={"#FE6F64"}
                    style={[
                      ff.regular,
                      { backgroundColor: "rgba(0, 0, 0, 0.7)", borderWidth: 1 },
                    ]}
                    placeholderTextColor={"grey"}
                    onChangeText={(firstName) => {
                      setFirstNameError("");
                      setFirstName(firstName);
                    }}
                  />
                  {firstNameError && (
                    <Text className="text-error-400 pl-2 pt-2">
                      {" "}
                      {firstNameError}
                    </Text>
                  )}
                </View>
                <View className="mb-4 flex-grow flex-col">
                  <TextInput
                    className={
                      "text-ice-lavender border-ice-lavender w-full rounded-xl p-3"
                    }
                    autoCapitalize="words"
                    value={lastName}
                    textContentType="familyName"
                    placeholder="Last Name"
                    allowFontScaling={false}
                    cursorColor={"#FE6F64"}
                    style={[
                      ff.regular,
                      { backgroundColor: "rgba(0, 0, 0, 0.7)", borderWidth: 1 },
                    ]}
                    placeholderTextColor={"grey"}
                    onChangeText={(lastName) => {
                      setLastNameError("");
                      setLastName(lastName);
                    }}
                  />
                  {lastNameError && (
                    <Text className="text-error-400 pl-2 pt-2">
                      {" "}
                      {lastNameError}
                    </Text>
                  )}
                </View>
              </View>

              <View className={"mb-6"}>
                <TextInput
                  className={
                    "text-ice-lavender border-ice-lavender w-full rounded-xl p-3"
                  }
                  value={password}
                  placeholder="Password"
                  placeholderTextColor={"grey"}
                  textContentType="password"
                  cursorColor={"#FE6F64"}
                  allowFontScaling={false}
                  style={[
                    ff.regular,
                    { backgroundColor: "rgba(0, 0, 0, 0.7)", borderWidth: 1 },
                  ]}
                  secureTextEntry={true}
                  onChangeText={(password) => {
                    setPasswordError("");
                    setPassword(password);
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
                onPress={onSignUpPress}
              >
                {!isLoading ? (
                  <Text className={"text-peach text-center"} style={ff.regular}>
                    Sign Up
                  </Text>
                ) : (
                  <View className="my-auto self-center">
                    <ActivityIndicator size={"small"} color="#FE6F64" />
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                className={"mt-4 text-sm text-gray-800"}
                onPress={changeScreen}
              >
                <Text
                  className={"text-ice-lavender text-center underline"}
                  style={ff.regular}
                >
                  Already have an account? Sign in
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {pendingVerification && (
            <View className={"w-full rounded-xl px-8 py-6 shadow-lg"}>
              <View className="flex-row justify-between">
                <TouchableOpacity
                  onPress={handleVerificationChange}
                  className="self-center"
                >
                  <Ionicons name="ios-arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text
                  className={"text-ice-lavender text-center text-2xl"}
                  style={ff.black}
                >
                  Verify Email
                </Text>
                <View className="w-6" />
              </View>
              <View className="pb-6" />
              <View className="mb-4">
                <TextInput
                  className={
                    "text-ice-lavender border-ice-lavender w-full rounded-xl p-3"
                  }
                  style={[
                    ff.regular,
                    { backgroundColor: "rgba(0, 0, 0, 0.7)", borderWidth: 1 },
                  ]}
                  keyboardType="number-pad"
                  allowFontScaling={false}
                  cursorColor={"#FE6F64"}
                  value={code}
                  placeholder="Verification Code"
                  placeholderTextColor={"grey"}
                  onChangeText={(code) => {
                    setCode(code);
                    setCodeError("");
                  }}
                />
                {codeError && (
                  <Text className="text-error-400 pl-2 pt-2"> {codeError}</Text>
                )}
              </View>
              <TouchableOpacity
                className={
                  "bg-peach text-ice-lavender h-10 justify-center rounded-2xl px-4 py-2 font-bold"
                }
                onPress={onPressVerify}
              >
                {!isVerifyLoading ? (
                  <Text
                    className={"text-off-black text-center"}
                    style={ff.regular}
                  >
                    Verify Email
                  </Text>
                ) : (
                  <View className="my-auto self-center">
                    <ActivityIndicator size={"small"} color="#1C1C1C" />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default SignUpScreen;
