import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FFE5",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  blueText: {
    fontFamily: "Roboto",
    color: "#4285F4",
    fontWeight: "normal",
  },
  signInWithText: {
    fontFamily: "Open Sans",
    color: "#A0C49D",
    fontWeight: "bold",
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
    fontFamily: "Roboto",
    color: "#A0C49D",
    fontSize: 14,
    fontWeight: "bold",
  },
  signInButtonContainer: {
    width: 330,
    height: 49,
    alignItems: "center",
    backgroundColor: "#A0C49D",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 15,
  },
  signInButtonText: {
    fontFamily: "Open Sans",
    color: "#FFFFFF",
    fontSize: 20,
  },
  signInHeaderText: {
    color: "#A0C49D",
    fontSize: 24,
    fontWeight: "bold",
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
    backgroundColor: "#FFFFFFBF",
    borderRadius: 15,
    borderColor: "#A0C49D7A",
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.15,
  },
});

export default styles;
