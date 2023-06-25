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

export const SignInScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
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
