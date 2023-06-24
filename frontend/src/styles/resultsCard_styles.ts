import { Dimensions, StyleSheet, TextStyle } from "react-native";
import { historyText } from "../constants";

const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  cardContainer: {
    width: (windowWidth - 48) / 2, // Adjust the width to fit two cards in a row with spacing
    alignItems: "center",
  },
  productTitle: {
    fontSize: 16,
    textAlign: "center",
    top: 8,
    color: historyText,
  },
  productShop: {
    fontSize: 13,
    textAlign: "center",
    top: 7,
    color: historyText,
    paddingBottom: 2,
  },
  productPrice: {
    fontSize: 16,
    textAlign: "center",
    top: 6,
    color: historyText,
    paddingBottom: 30,
  },
});

export type Styles = {
  header: TextStyle;
  text: TextStyle;
};
