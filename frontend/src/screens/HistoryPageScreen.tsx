import React, { SetStateAction, useEffect, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { styles } from '../styles/historyPage_style';
import HistoryCard, {
  HistoryCardProps,
  PriceInterface,
} from '../components/HistoryCard';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyledText } from '../components';
import { darkGreen, Endpoints, kUserEmail } from '../constants';
import * as SecureStore from 'expo-secure-store';
import { AxiosResponse } from 'axios';
import { axiosSender } from '../utils';

export const HistoryPageScreen: React.FC = () => {
  const navigation = useNavigation();
  const [links, setLinks] = useState<HistoryCardProps[]>([]);
  const [userEmail, setUserEmail] =
    useState<SetStateAction<string | null>>(null);

  useEffect(() => {
    (async () => {
      const userEmailValue = await SecureStore.getItemAsync(kUserEmail);
      setUserEmail(userEmailValue);

      await getSetLinks();
    })();
  }, [userEmail]);

  const getSetLinks = async () => {
    if (!userEmail) return;
    const params = `?email=${userEmail}`;
    const response: AxiosResponse<any, any> | undefined = await axiosSender(
      Endpoints.getLinks.uri,
      Endpoints.getLinks.method,
      params,
      null
    );
    if (!response) {
      console.log('Error submitting links');
      Alert.alert('Unable to fetch visited links');
      return;
    }

    const resultFromResponse = response.data.data as {
      [key: string]: HistoryCardProps;
    };
    const resultArray: HistoryCardProps[] = Object.values(
      resultFromResponse
    ).map((result) => ({
      _id: result._id,
      fullTitle: result.fullTitle,
      title:
        result.fullTitle.length > 16
          ? result.fullTitle.slice(0, 16) + '...'
          : result.fullTitle,
      link: result.link,
      source: result.source,
      price:
        typeof result.price !== 'string'
          ? result.price
          : ({
              extracted_value: result.extracted_price,
              value: result.price,
              currency: 'SGD',
            } as PriceInterface),
      extracted_price: result.extracted_price,
      thumbnail: result.thumbnail,
      createdAt: new Date(result.createdAt).toLocaleDateString('en-SG', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      onClick: handleOnClick,
    }));
    setLinks(resultArray);
  };

  const handleOnClick = async () => {
    await getSetLinks();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <Image
          style={styles.back}
          source={require("../../assets/images/back-arrow.png")}
        /> */}

        <Ionicons
          name="chevron-back"
          size={40}
          color={darkGreen}
          style={styles.back}
          onPress={() => {
            navigation.goBack();
            console.log('click');
          }}
        />
        <StyledText title="History" isBold style={styles.text} />
      </View>
      <ScrollView
      // stickyHeaderIndices={[0]} // Specify the index of the sticky header
      // showsVerticalScrollIndicator={false}
      // style={styles.container}
      >
        <View style={styles.body}>
          {links.length > 0 &&
            links.map((item, index) => <HistoryCard key={index} {...item} />)}
          {links.length === 0 && (
            <View style={styles.noLinkTextContainer}>
              <StyledText
                title={'No links visited yet'}
                style={styles.noLinkText}
                isLight
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
