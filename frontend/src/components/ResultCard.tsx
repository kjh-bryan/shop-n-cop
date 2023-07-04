import React from 'react';
import {
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { styles } from '../styles/resultsCard_styles';
import { StyledText } from './StyledText';
import * as SecureStore from 'expo-secure-store';
import { Endpoints, kUserEmail } from './../constants';
import { AxiosResponse } from 'axios';
import { axiosSender } from '../utils';
import { openBrowserAsync } from 'expo-web-browser';
export interface ResultsCardProps {
  fullTitle: string;
  title: string;
  link: string;
  source: string;
  price: PriceInterface;
  extracted_price?: number;
  thumbnail: string;
}

export interface PriceInterface {
  value: string;
  extracted_value: number;
  currency: string;
}

export const ResultsCard: React.FC<ResultsCardProps> = ({
  fullTitle,
  title,
  link,
  source,
  price,
  thumbnail,
}) => {
  const handlePressed = async () => {
    const userEmail = await SecureStore.getItemAsync(kUserEmail);
    const data = {
      fullTitle,
      link,
      source,
      price,
      thumbnail,
      userEmail,
    };

    const response: AxiosResponse<any, any> | undefined = await axiosSender(
      Endpoints.postLinks.uri,
      Endpoints.postLinks.method,
      '',
      data
    );
    if (!response) {
      console.log('Error submitting links');
      Alert.alert('Unable to save links to user profile');
    }

    openBrowserAsync(link);
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => handlePressed()}>
      <View style={styles.cardContainer}>
        <Image source={{ uri: thumbnail }} style={styles.productImage} />
        <StyledText title={title} style={styles.productTitle} />
        <StyledText title={source} style={styles.productShop} />
        <StyledText title={price.value} isBold style={styles.productPrice} />
      </View>
    </TouchableOpacity>
  );
};
