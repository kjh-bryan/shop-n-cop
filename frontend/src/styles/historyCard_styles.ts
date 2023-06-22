import { StyleSheet, TextStyle } from "react-native";

export const styles = StyleSheet.create({
  cardOuter: {
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
    backgroundColor: "#f9ffeb",
  },
  card: {
    // Adjust the width to fit two cards in a row with spacing
    alignItems: "flex-start",
    flexDirection: "row",
    height: 93,
    width: 300,
  },
  historyImg: {
    right: 15,
    bottom: 15,
    width: 123,
    height: 123,
    alignContent: "center",
  },
  content: {
    flexDirection: "column",
    alignContent: "flex-start",
    bottom: 8,
    right: 3,
  },
  historyTitle: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "left",
    top: 8,
    color: "#C4D7B2",
    alignItems: "flex-start",
    // fontFamily:'OpenSans-Medium'
  },
  historyShop: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "left",
    top: 10,
    left: 3,
    color: "#C4D7B2",
    paddingBottom: 2,
    // fontFamily:'OpenSans-Medium'
  },
  historyPrice: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "left",
    top: 15,
    left: 3,
    color: "#C4D7B2",
    paddingBottom: 30,
    // fontFamily:'OpenSans-Medium'
  },
  historyLastViewed: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "left",
    left: 5,
    color: "#C4D7B2",
    top: 5,
    // fontFamily:'OpenSans-Medium'
  },
});

export type Styles = {
  header: TextStyle;
  text: TextStyle;
};
