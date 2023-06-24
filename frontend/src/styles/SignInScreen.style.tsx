import { StyleSheet } from "react-native";
import { 
  darkGreen, 
  lightGreen, 
  textBoxBG,
  textBoxBorder, 
  blue,
  white
 } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGreen,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  blueText: {
    color: blue,
  },
  signInWithText: {
    color: darkGreen,
    marginVertical: 20,
  },
  signInWithAppsContainer: {
    flex: 1,
    flexDirection: "row",
  },
  brandImage: {
    marginHorizontal: 10,
  },
  notMemberContainer: {
    flex: 1,
    flexDirection: "row",
  },
  notMemberText: {
    color: darkGreen,
    fontSize: 14,
  },
  signInButtonContainer: {
    width: 330,
    height: 49,
    alignItems: "center",
    backgroundColor: darkGreen,
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 15,
  },
  signInButtonText: {
    color: white,
    fontSize: 20,
  },
  signInHeaderText: {
    color: darkGreen,
    fontSize: 24,
  },
  topHalf: {
    flex: 0.75,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  bottomHalf: {
    flex: 0.25,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  emailAndPasswordTextBox: {
    height: 67,
    width: 330,
    borderWidth: 3,
    padding: 10,
    backgroundColor: textBoxBG,
    borderRadius: 15,
    borderColor: textBoxBorder,
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.15,
  },
});

export default styles;
