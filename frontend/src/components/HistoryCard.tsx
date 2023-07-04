import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles/historyCard_styles';
import { StyledText } from './StyledText';
import { openBrowserAsync } from 'expo-web-browser';
import { AxiosResponse } from 'axios';
import { axiosSender } from '../utils';
import { Endpoints } from '../constants';

export interface HistoryCardProps {
  _id: string;
  fullTitle: string;
  title: string;
  link: string;
  source: string;
  price: PriceInterface;
  extracted_price?: number;
  thumbnail: string;
  createdAt: string;
  onClick: () => void;
}
export interface PriceInterface {
  value: string;
  extracted_value: number;
  currency: string;
}
const HistoryCard: React.FC<HistoryCardProps> = ({
  _id,
  fullTitle,
  title,
  link,
  price,
  source,
  thumbnail,
  createdAt,
  onClick,
}) => {
  const handlePressed = async () => {
    console.log('handlePress');
    const data = {
      _id,
      fullTitle,
      title,
      link,
      price,
      source,
      thumbnail,
      createdAt,
    };
    const newDate = new Date();
    const params = `?id=${_id}`;
    console.log(params);
    const response: AxiosResponse<any, any> | undefined = await axiosSender(
      Endpoints.updateLink.uri,
      Endpoints.updateLink.method,
      params,
      { newDate }
    );
    if (response === undefined) {
      console.log('Error submitting links');
    }
    onClick();
    openBrowserAsync(link);
  };

  return (
    <View style={styles.cardOuter}>
      <TouchableOpacity activeOpacity={0.9} onPress={() => handlePressed()}>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: thumbnail }} style={styles.historyImg} />
          </View>
          <View style={styles.content}>
            <StyledText title={title} style={styles.historyTitle} />
            <StyledText title={source} style={styles.historyShop} />
            <StyledText
              title={price.value}
              isBold
              style={styles.historyPrice}
            />
            <StyledText
              title={'Last Viewed on ' + createdAt}
              style={styles.historyLastViewed}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HistoryCard;
