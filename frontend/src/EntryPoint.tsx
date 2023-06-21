import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { registerRootComponent } from "expo";
import { SearchScreen } from "./screens/SearchScreen";

const App = () => {

    // this is just the boilerplate that is generated. remove this when you start frontending
    return (
      // <View style={styles.container}>
      //     <Text>Open up App.tsx to start working on your app!</Text>
      //     <StatusBar style="auto" />
      // </View>
        <SearchScreen />
    );
};

// remember when yall do styling to put it in the style folder keke
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default registerRootComponent(App);
