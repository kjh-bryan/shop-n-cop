import styles from "../styles/RegisterScreen.style";
import {
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
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StyledText } from "../components";
import { darkGreen } from "../constants";

export const RegisterScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.topHalf}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Ionicons
            name="chevron-back"
            size={40}
            color={darkGreen}
            style={styles.backChevron}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Image source={require("../../assets/logo/logo.png")} />
          <StyledText 
                 title="Register"
                 style={styles.registerHeaderText}
                 isBold={true}
                 isLight={false}/>
          <View style={styles.nameContainer}>
            <TextInput
              style={styles.nameTextBox}
              onChangeText={setFirstName}
              value={firstName}
              placeholder="First Name"
            />
            <TextInput
              style={styles.nameTextBox}
              onChangeText={setLastName}
              value={lastName}
              placeholder="Last Name"
            
            />
          </View>
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
          <TextInput
            secureTextEntry={true}
            style={styles.emailAndPasswordTextBox}
            onChangeText={setRepassword}
            value={repassword}
            placeholder="Re-enter Password"
          />
          <TouchableOpacity
            onPress={() => console.log("register button pressed")}
          >
            <View style={styles.registerButtonContainer}>
              <StyledText
              title='Register'
              style={styles.registerButtonText}
              isBold={false}
              isLight={false}/>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <View style={styles.bottomHalf}>
          <Text style={styles.registerWithText}>Register with</Text>
          <View style={styles.registerWithAppsContainer}>
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
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;
