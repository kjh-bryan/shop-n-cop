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
