import styles from '../styles/RegisterScreen.style';
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
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyledText } from '../components';
import { darkGreen, Endpoints, kUserEmail } from '../constants';
import { ShopNCopStackNavigation } from '../navigation/NavigationConstants';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../navigation/NavigationTypes';
import { Alert } from 'react-native';
import { ResponseMessages } from '../constants';
import { AxiosResponse } from 'axios';
import bcrypt from 'react-native-bcrypt';
import { axiosSender, testEmailRegex } from '../utils';
import * as SecureStore from 'expo-secure-store';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const RegisterScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repassword, setRepassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  const [loading, setLoading] = useState(false);
  const handleRegistration = async () => {
    setLoading(true);
    try {
      if (firstName === '') {
        setLoading(false);
        Alert.alert('Please fill in your first name.');
        return;
      }
      if (lastName === '') {
        setLoading(false);
        Alert.alert('Please fill in your last name.');
        return;
      }
      if (email === '') {
        setLoading(false);
        Alert.alert('Please fill in your email.');
        return;
      }
      if (!testEmailRegex(email)) {
        setLoading(false);
        Alert.alert('Please entire a valid email address.');
        return;
      }
      if (password === '' || repassword === '') {
        setLoading(false);
        Alert.alert('Please fill in your password.');
        return;
      }
      if (password !== repassword) {
        setLoading(false);
        Alert.alert('Your passwords do not match. Please try again.');
        return;
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const payload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
      };
      const response: AxiosResponse<any, any> | undefined = await axiosSender(
        Endpoints.register.uri,
        Endpoints.register.method,
        '',
        payload
      );
      if (!response) {
        setLoading(false);
        Alert.alert('Network error.');
        return;
      }
      if (response.status === 200) {
        if (response.data.message === ResponseMessages.SUCCESS) {
          await SecureStore.setItemAsync(kUserEmail, response.data.data.email);
          setLoading(false);
          navigation.navigate({
            name: ShopNCopStackNavigation.search,
          } as never);
        } else if (
          response.data.message === ResponseMessages.USER_ALREADY_EXISTS
        ) {
          setLoading(false);
          Alert.alert('User already exists! Please sign in.');
          return;
        } else {
          setLoading(false);
          Alert.alert('Something went wrong.');
          return;
        }
      } else if (response.status === 503) {
        setLoading(false);
        Alert.alert('Something went wrong.');
        return;
      }
    } catch (error) {
      setLoading(false);
      console.log('[handleRegistration]', error);
      Alert.alert('Sorry! Something went wrong.');
      return;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        {loading && <LoadingSpinner />}
        <KeyboardAvoidingView
          style={styles.topHalf}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
          <Image source={require('../../assets/logo/logo.png')} />
          <StyledText
            title="Register"
            style={styles.registerHeaderText}
            isBold={true}
            isLight={false}
          />
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
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
          />
          <TextInput
            secureTextEntry={true}
            style={styles.emailAndPasswordTextBox}
            autoCapitalize="none"
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
          />
          <TextInput
            secureTextEntry={true}
            style={styles.emailAndPasswordTextBox}
            autoCapitalize="none"
            onChangeText={setRepassword}
            value={repassword}
            placeholder="Re-enter Password"
          />
          <TouchableOpacity onPress={() => handleRegistration()}>
            <View style={styles.registerButtonContainer}>
              <StyledText
                title="Register"
                style={styles.registerButtonText}
                isBold={false}
                isLight={false}
              />
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <View style={styles.bottomHalf}>
          <Text style={styles.registerWithText}>Register with</Text>
          <View style={styles.registerWithAppsContainer}>
            <TouchableOpacity
              onPress={() => console.log('apple button pressed')}
            >
              <Image
                source={require('../../assets/apple-login/apple-login.png')}
                style={styles.brandImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log('google button pressed')}
            >
              <Image
                source={require('../../assets/google-login/google-login.png')}
                style={styles.brandImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log('facebook button pressed')}
            >
              <Image
                source={require('../../assets/facebook-login/facebook-login.png')}
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
