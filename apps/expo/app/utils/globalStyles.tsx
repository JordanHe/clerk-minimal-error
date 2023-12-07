import { StyleSheet } from "react-native";
import * as Font from "expo-font";

// Define a font family object that maps the font styles to their respective font files
const montserratFonts = {
  regular: {
    fontFamily: "Montserrat-Regular",
  },
  bold: {
    fontFamily: "Montserrat-Bold",
  },
  italic: {
    fontFamily: "Montserrat-Italic",
  },
  light: {
    fontFamily: "Montserrat-Light",
  },
  thin: {
    fontFamily: "Montserrat-Thin",
  },
  black: {
    fontFamily: "Montserrat-Bold",
  },
};

const ff = StyleSheet.create({
  regular: montserratFonts.regular,
  bold: montserratFonts.bold,
  italic: montserratFonts.italic,
  light: montserratFonts.light,
  thin: montserratFonts.thin,
  black: montserratFonts.black,
});

export default ff;
