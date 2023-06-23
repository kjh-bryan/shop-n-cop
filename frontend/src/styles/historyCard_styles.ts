import { StyleSheet, TextStyle } from "react-native";

export const styles = StyleSheet.create({
  cardOuter: {
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20,
    backgroundColor: "#f9ffeb",
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
    color: "#C4D7B2",
    alignItems: "flex-start",
    // fontFamily:'OpenSans-Medium'
  },
  historyShop: {
    fontSize: 13,
    textAlign: "left",
    color: "#C4D7B2",
    paddingBottom: 2,
    // fontFamily:'OpenSans-Medium'
  },
  historyPrice: {
    fontSize: 17,
    textAlign: "left",
    color: "#C4D7B2",
    marginBottom: 10,
    // fontFamily:'OpenSans-Medium'
  },
  historyLastViewed: {
    fontSize: 14,
    textAlign: "left",
    color: "#C4D7B2",
    // fontFamily:'OpenSans-Medium'
  },
});

export type Styles = {
  header: TextStyle;
  text: TextStyle;
};
