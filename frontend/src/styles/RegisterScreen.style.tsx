import { StyleSheet } from "react-native";
import { 
  darkGreen, 
  lightGreen, 
  textBoxBG,
  textBoxBorder,
  white
 } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGreen,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  registerWithText: {
    color: darkGreen,
    fontWeight: "bold",
    marginVertical: 20,
    fontFamily: "Roboto-Bold"
  },
  registerWithAppsContainer: {
    flex: 1,
    flexDirection: "row",
  },
  brandImage: {
    marginHorizontal: 10,
  },
  nameContainer: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  nameTextBox: {
    height: 67,
    width: 150,
    borderWidth: 3,
    padding: 10,
    backgroundColor: textBoxBG,
    borderRadius: 15,
    borderColor: textBoxBorder,
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.15,
    marginHorizontal: 15,
  },
  registerButtonContainer: {
    width: 330,
    height: 49,
    alignItems: "center",
    backgroundColor: darkGreen,
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 15,
  },
  registerButtonText: {
    color: white,
    fontSize: 20,
  },
  registerHeaderText: {
    color: darkGreen,
    fontSize: 24,
    fontWeight: "bold",
  },
  topHalf: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  bottomHalf: {
    flex: 0.2,
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
  backChevron: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default styles;
