import { StyleSheet, TextStyle, ViewStyle } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FFE5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F7FFE5",
    height: 98,
  },
  text: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    color: "#C4D7B2",
    // fontFamily:'OpenSans-Medium'
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
