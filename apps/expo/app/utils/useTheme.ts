import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useTheme = (): "light" | "dark" => {
  const [theme, setTheme] = useState<"light" | "dark">("dark"); // Default theme

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("theme");
        if (storedTheme !== null) {
          setTheme(storedTheme as "light" | "dark");
        } else {
          // No theme found in AsyncStorage, set default to light and store it
          await AsyncStorage.setItem("theme", "dark");
        }
      } catch (error) {
        console.error(
          "Error fetching or setting theme in AsyncStorage:",
          error,
        );
      }
    };

    fetchTheme();
  }, []); // Run once on component mount

  return theme;
};

export default useTheme;
