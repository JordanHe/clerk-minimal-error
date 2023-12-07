import { Text as RNText, TextProps } from "react-native";

// Define default props
const defaultTextProps: Partial<TextProps> = {
  allowFontScaling: false,
};

// Create a new component with merged props
const Text: React.FC<TextProps> = (props) => {
  return <RNText {...defaultTextProps} {...props} />;
};

export default Text;
