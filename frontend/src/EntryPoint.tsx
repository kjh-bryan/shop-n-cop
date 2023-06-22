import SignInScreen from "./screens/SignInScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { registerRootComponent } from "expo";
import { SearchScreen } from "./screens/SearchScreen";
import ResultsPageScreen from "./screens/ResultsPageScreen";
import HistoryPageScreen from "./screens/HistoryPageScreen";

const EntryPoint = () => {
  const [showingResultsPage, isShowingResultsPage] = useState(false);
  const [showingHistoryPage, isShowingHistoryPage] = useState(true);
  // this is just the boilerplate that is generated. remove this when you start frontending
  return (
    <View style={styles.container}>
      {!showingResultsPage && !showingHistoryPage && (
        <Text>Open up App.tsx to start working on your app!</Text>
      )}
      {showingResultsPage && <ResultsPageScreen />}
      {showingHistoryPage && <HistoryPageScreen />}
      <StatusBar style="auto" />
    </View>
    // <SearchScreen />
  );
};

// remember when yall do styling to put it in the style folder keke
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FFE5",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default registerRootComponent(EntryPoint);

