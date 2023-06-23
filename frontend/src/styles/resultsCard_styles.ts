import { Dimensions, StyleSheet, TextStyle, ViewStyle } from "react-native";

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
    color: "#C4D7B2",
    // fontFamily:'OpenSans-Medium'
  },
  productShop: {
    fontSize: 13,
    textAlign: "center",
    top: 7,
    color: "#C4D7B2",
    paddingBottom: 2,
    // fontFamily:'OpenSans-Medium'
  },
  productPrice: {
    fontSize: 16,
    textAlign: "center",
    top: 6,
    color: "#C4D7B2",
    paddingBottom: 30,
    // fontFamily:'OpenSans-Medium'
  },
});

export type Styles = {
  header: TextStyle;
  text: TextStyle;
};
