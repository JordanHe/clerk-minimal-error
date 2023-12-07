import { useEffect, useState } from "react";
import { Keyboard, KeyboardEventListener, KeyboardMetrics } from "react-native";

export function useKeyboard() {
  const [shown, setShown] = useState(false);
  const handleKeyboardDidShow: KeyboardEventListener = (e) => {
    setShown(true);
  };
  const handleKeyboardDidHide: KeyboardEventListener = (e) => {
    setShown(false);
  };

  useEffect(() => {
    const subscriptions = [
      Keyboard.addListener("keyboardDidShow", handleKeyboardDidShow),
      Keyboard.addListener("keyboardDidHide", handleKeyboardDidHide),
    ];

    return () => {
      subscriptions.forEach((subscription) => subscription.remove());
    };
  }, []);

  return {
    keyboardShown: shown,
  };
}
