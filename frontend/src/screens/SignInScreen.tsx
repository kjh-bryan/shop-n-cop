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
  TouchableWithoutFeedback, Alert
} from 'react-native';
import React, { useState } from 'react';
import { StyledText } from '../components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../navigation/NavigationTypes';
import { ShopNCopStackNavigation } from '../navigation/NavigationConstants';
import { axiosSender } from '../utils';
import { Endpoints } from '../constants';
import { ResponseMessages } from '../../../backend/src/constants';
import bcrypt from 'react-native-bcrypt'
import { AxiosResponse } from 'axios';

export const SignInScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  const handleSignIn = async () => {
    const payload = {
      email: email
    };
    const response :AxiosResponse<any, any> | undefined= await axiosSender(payload, Endpoints.signIn)
      if (!response) {
        Alert.alert('Network error.')
        return;
      }
    
    if (response.status === 200 && response.data.message === ResponseMessages.SUCCESS) {
      const dbPassword = response.data.data.password;
      const passwordMatch = bcrypt.compareSync(dbPassword, password);
      if (passwordMatch) {
        navigation.navigate({
          name: ShopNCopStackNavigation.search,
        } as never);
      } else {
        Alert.alert('Incorrect password. Please try again');
      }
    } else if (response.status === 503 && response.data.message === ResponseMessages.NO_USER) {
      Alert.alert('User not found');
    } else {
      Alert.alert('Something went wrong')
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.topHalf}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Image source={require('../../assets/logo/logo.png')} />
          <StyledText
            title='Sign In'
            style={styles.signInHeaderText}
            isBold={true}
            isLight={false}
          />
          <TextInput
            style={styles.emailAndPasswordTextBox}
            onChangeText={setEmail}
            value={email}
            placeholder='Email'
          />
          <TextInput
            secureTextEntry={true}
            style={styles.emailAndPasswordTextBox}
            onChangeText={setPassword}
            value={password}
            placeholder='Password'
          />
          <TouchableOpacity
            onPress={() => {handleSignIn}}
          >
            <View style={styles.signInButtonContainer}>
              <StyledText
                title='Sign In'
                style={styles.signInButtonText}
                isBold={false}
                isLight={false}
              />
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <View style={styles.bottomHalf}>
          <Text style={styles.signInWithText}>Sign in with</Text>

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
