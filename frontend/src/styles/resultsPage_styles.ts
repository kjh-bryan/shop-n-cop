import { StyleSheet, TextStyle } from "react-native";
import { lightGreen, historyText } from "../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGreen,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: lightGreen,
    height: 98,
  },
  text: {
    fontSize: 28,
    textAlign: "center",
    color: historyText,
  },
  search: {
    top: 0,
    right: 5, // Adjust the spacing as needed
  },
  back: {
    top: 0,
    left: 0, // Adjust the spacing as needed
  },
  body: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 10, // Adjust the spacing as needed
  },
});

export type Styles = {
  header: TextStyle;
  text: TextStyle;
};
