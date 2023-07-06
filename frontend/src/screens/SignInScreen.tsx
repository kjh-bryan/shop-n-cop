import styles from '../styles/SignInScreen.style';
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
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { StyledText } from '../components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../navigation/NavigationTypes';
import { ShopNCopStackNavigation } from '../navigation/NavigationConstants';
import { axiosSender, testEmailRegex } from '../utils';
import { Endpoints, kJWTToken, kUserEmail } from '../constants';
import { ResponseMessages } from '../constants';
import { AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const SignInScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    console.log('handleSignIn');
    setLoading(true);
    try {
      if (email === '') {
        Alert.alert('Please enter your email.');
        setLoading(false);
        return;
      }
      if (!testEmailRegex) {
        Alert.alert('Please enter a valid email.');
        setLoading(false);
        return;
      }
      if (password === '') {
        Alert.alert('Please enter your password.');
        setLoading(false);
        return;
      }

      const payload = {
        email,
        password,
      };

      const response: AxiosResponse<any, any> | undefined = await axiosSender(
        Endpoints.signIn.uri,
        Endpoints.signIn.method,
        '',
        payload
      );

      if (!response) {
        Alert.alert('Network error.');
        setLoading(false);
        return;
      }

      if (
        response.status === 200 &&
        response.data.message === ResponseMessages.SUCCESS
      ) {
        await SecureStore.setItemAsync(kUserEmail, response.data.data.email);
        await SecureStore.setItemAsync(kJWTToken, response.data.data.token);
        setLoading(false);
        navigation.navigate({
          name: ShopNCopStackNavigation.search,
        } as never);
      } else if (
        response.status === 200 &&
        response.data.message === ResponseMessages.INCORRECT_CREDENTIALS
      ) {
        setLoading(false);
        Alert.alert(ResponseMessages.INCORRECT_CREDENTIALS);

        return;
      } else {
        setLoading(false);

        Alert.alert('Something went wrong');
        return;
      }
    } catch (error) {
      setLoading(false);
      console.error('[handleSignIn]', error);
      Alert.alert('Sorry! Something went wrong.');
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
          <Image source={require('../../assets/logo/logo.png')} />
          <StyledText
            title="Sign In"
            style={styles.signInHeaderText}
            isBold={true}
            isLight={false}
          />
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
          <TouchableOpacity onPress={handleSignIn}>
            <View style={styles.signInButtonContainer}>
              <StyledText
                title="Sign In"
                style={styles.signInButtonText}
                isBold={false}
                isLight={false}
              />
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <View style={styles.bottomHalf}>
          {/* <Text style={styles.signInWithText}>Sign in with</Text>

          <View style={styles.signInWithAppsContainer}>
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
          </View> */}
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
