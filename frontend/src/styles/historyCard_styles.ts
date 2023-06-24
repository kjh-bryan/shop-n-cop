import { StyleSheet, TextStyle } from "react-native";
import { historyShadow, historyCardBG, historyText } from "../constants";

export const styles = StyleSheet.create({
  cardOuter: {
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: historyShadow,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20,
    backgroundColor: historyCardBG,
    marginHorizontal: 21,
  },
  card: {
    // Adjust the width to fit two cards in a row with spacing
    alignItems: "flex-start",
    flexDirection: "row",
    flexBasis: "auto",
    width: "100%",
  },
  imageContainer: {
    width: "40%",
  },
  historyImg: {
    width: 115,
    height: 115,
    resizeMode: "cover",
    alignContent: "center",
  },
  content: {
    width: "60%",
    flexDirection: "column",
    alignContent: "flex-start",
  },
  historyTitle: {
    marginTop: 10,
    fontSize: 17,
    textAlign: "left",
    color: historyText,
    alignItems: "flex-start",
  },
  historyShop: {
    fontSize: 13,
    textAlign: "left",
    color: historyText,
    paddingBottom: 2,
  },
  historyPrice: {
    fontSize: 17,
    textAlign: "left",
    color: historyText,
  },
  historyLastViewed: {
    fontSize: 14,
    textAlign: "left",
    color: historyText,
  },
});

export type Styles = {
  header: TextStyle;
  text: TextStyle;
};
