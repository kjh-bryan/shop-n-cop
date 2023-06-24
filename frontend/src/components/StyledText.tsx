import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import React from "react";
import {
  StyleSheet,
  StyleSheetProperties,
  Text,
  TextProps,
} from "react-native";

export const StyledText = ({
  title,
  style,
  isBold = false,
  isLight = false,
}: {
  title: string;
  style?: any;
  isBold?: boolean;
  isLight?: boolean;
}) => {
  const [fontsLoaded] = useFonts({
    "OpenSans-Regular": require("../../assets/fonts/OpenSans/OpenSans-Regular.ttf"),
    "OpenSans-Bold": require("../../assets/fonts/OpenSans/OpenSans-Bold.ttf"),
    "OpenSans-Light": require("../../assets/fonts/OpenSans/OpenSans-Light.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      {isBold && !isLight && <Text style={[styles.bold, style]}>{title}</Text>}

      {!isBold && isLight && <Text style={[styles.light, style]}>{title}</Text>}

      {!isBold && !isLight && (
        <Text style={[styles.regular, style]}>{title}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  regular: {
    fontFamily: "OpenSans-Regular",
  },
  light: {
    fontFamily: "OpenSans-Light",
  },
  bold: {
    fontFamily: "OpenSans-Bold",
  },
});
