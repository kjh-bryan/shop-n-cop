import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  NativeModules,
  Platform,
} from "react-native";
import { StyledText } from "../components/StyledText";
import { SearchBar } from "../components/SearchBar";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ShopNCopStackNavigation, StackParams } from "../navigation";
import { SimpleLineIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import Constants from "expo-constants";
const { StatusBarManager } = NativeModules;
const iOSStatusBarHeight = Constants.statusBarHeight;
type Screen = typeof ShopNCopStackNavigation.search;
type SearchScreenProps = NativeStackScreenProps<StackParams, Screen>;

const logo = require("../../assets/images/icon.png");
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

export const SearchScreen = ({ route }: SearchScreenProps) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const userId = route.params?.userId; // getting user id passed from sign in.
  return (
    <SafeAreaView style={styles.container}>
      <SimpleLineIcons
        name="logout"
        size={30}
        color="#A0C49D"
        style={styles.logoutIcon}
        onPress={() => {
          navigation.replace(ShopNCopStackNavigation.signIn);
        }}
      />
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.imageStyle}></Image>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.topBody}>
          <View style={styles.titleContainer}>
            <StyledText
              title="What are you"
              style={styles.smallFont}
              isBold={false}
              isLight={true}
            />
            <Text>
              <StyledText
                title="Shopping "
                style={styles.mediumFont}
                isBold={true}
                isLight={false}
              />
              <StyledText
                title="for today?"
                style={styles.mediumFont}
                isBold={false}
                isLight={true}
              />
            </Text>
          </View>
          <View>
            <SearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              clicked={clicked}
              setClicked={setClicked}
            />
          </View>
        </View>
        <View style={styles.middleBody}>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <StyledText
              title="or"
              isBold={true}
              isLight={false}
              style={styles.dividerText}
            />
            <View style={styles.divider} />
          </View>
        </View>
        <View style={styles.bottomBody}>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() => {
                console.log("Open Gallery");
              }}
            >
              <MaterialIcons name="image-search" size={80} color="#A0C49D" />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ShopNCopStackNavigation.results as never);
              }}
              style={styles.button}
            >
              <StyledText
                title="Search"
                isBold={false}
                isLight={false}
                style={styles.buttonText}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ShopNCopStackNavigation.history as never);
              }}
            >
              <MaterialIcons name="history" size={80} color="#A0C49D" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.footerContainer}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FFE5",
    color: "#A0C49D",
    justifyContent: "center",
    alignItems: "center",
    minHeight: screenHeight,
  },
  logoutIcon: {
    position: "absolute",
    left: 10,
    top:
      Platform.OS === "android" ? StatusBarManager.HEIGHT : iOSStatusBarHeight,
  },
  imageContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: 120,
    height: 120,
  },
  bodyContainer: {
    flex: 9,
    justifyContent: "space-between",
    alignItems: "center",
    width: screenWidth - 100,
  },
  topBody: {
    flex: 0.4,
  },
  titleContainer: {
    justifyContent: "flex-start",
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  middleBody: {
    flex: 0.1,
    alignItems: "center",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#A0C49D",
  },
  dividerText: {
    width: 80,
    textAlign: "center",
    color: "#A0C49D",
    fontSize: 16,
  },
  bottomBody: {
    flex: 0.6,
  },
  buttonContainer: {
    flex: 0.7,
    flexDirection: "row",
    marginVertical: 20,
  },
  button: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#A0C49D",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    letterSpacing: 3,
    fontSize: 16,
  },
  fontBold: {
    fontWeight: "bold",
  },
  smallFont: {
    fontSize: 20,
    color: "#A0C49D",
  },
  mediumFont: {
    fontSize: 24,
    color: "#A0C49D",
  },
  footerContainer: {
    flex: 1,
  },
});
