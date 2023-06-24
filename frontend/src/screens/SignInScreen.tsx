import styles from "../styles/SignInScreen.style";
import {
  SafeAreaView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { StyledText } from "../components";
import { useNavigation } from "@react-navigation/native";
import { ShopNCopStackNavigation, StackParams } from "../navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export const SignInScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../../assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Light": require("../../assets/fonts/Roboto/Roboto-Light.ttf"),
  }); 
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.topHalf}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Image source={require("../../assets/logo/logo.png")} />
          <StyledText 
                 title="Sign In"
                 style={styles.signInHeaderText}
                 isBold={true}
                 isLight={false}/>
          <TextInput
            style={styles.emailAndPasswordTextBox}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
          />
          <TextInput
            secureTextEntry={true}
            style={styles.emailAndPasswordTextBox}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
          />
          <TouchableOpacity
            onPress={() => {
              navigation.replace(ShopNCopStackNavigation.search, {
                userId: "test",
              });
            }}
          >
            <View style={styles.signInButtonContainer}>
              <StyledText
                     title="Sign In"
                     style={styles.signInButtonText}
                     isBold={false}
                     isLight={false}/>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <View style={styles.bottomHalf}>
          <Text style={[styles.signInWithText, {fontFamily: "Roboto-Bold"}]}>Sign in with</Text>

          <View style={styles.signInWithAppsContainer}>
            <TouchableOpacity
              onPress={() => console.log("apple button pressed")}
            >
              <Image
                source={require("../../assets/apple-login/apple-login.png")}
                style={styles.brandImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log("google button pressed")}
            >
              <Image
                source={require("../../assets/google-login/google-login.png")}
                style={styles.brandImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log("facebook button pressed")}
            >
              <Image
                source={require("../../assets/facebook-login/facebook-login.png")}
                style={styles.brandImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.notMemberContainer}>
            <Text style={[styles.notMemberText, {fontFamily: "Roboto-Mediuim"}]}>Not a member?</Text>
        
            <TouchableOpacity
              onPress={() => {
                navigation.navigate({
                  name: ShopNCopStackNavigation.register,
                } as never);
              }}
            >
              <Text style={[styles.blueText, {fontFamily: "Roboto-Light"}]}> Register now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
