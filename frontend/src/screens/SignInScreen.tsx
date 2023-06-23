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
import { useNavigation } from "@react-navigation/native";
import { ShopNCopStackNavigation } from "../navigation";

export const SignInScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.topHalf}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Image source={require("../../assets/logo/logo.png")} />
          <Text style={styles.signInHeaderText}>Sign In</Text>
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
              navigation.navigate({
                name: ShopNCopStackNavigation.search,
              } as never);
            }}
          >
            <View style={styles.signInButtonContainer}>
              <Text style={styles.signInButtonText}>Sign In</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <View style={styles.bottomHalf}>
          <Text style={styles.signInWithText}>Sign in with</Text>
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
            <Text style={styles.notMemberText}>Not a member?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate({
                  name: ShopNCopStackNavigation.register,
                } as never);
              }}
            >
              <Text style={styles.blueText}> Register now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
