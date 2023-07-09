import React, { SetStateAction, useEffect, useState } from 'react';
import { View, ScrollView, Alert, Dimensions } from 'react-native';
import { styles } from '../styles/historyPage_style';
import HistoryCard, {
  HistoryCardProps,
  PriceInterface,
} from '../components/HistoryCard';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyledText } from '../components';
import {
  darkGreen,
  Endpoints,
  kUserEmail,
  ResponseMessages,
} from '../constants';
import * as SecureStore from 'expo-secure-store';
import { AxiosResponse } from 'axios';
import { axiosSender } from '../utils';
import ContentLoader, { Rect } from 'react-content-loader/native';

const width = Dimensions.get('window').width;
export const HistoryPageScreen: React.FC = () => {
  const navigation = useNavigation();
  const [links, setLinks] = useState<HistoryCardProps[]>([]);
  const [userEmail, setUserEmail] =
    useState<SetStateAction<string | null>>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      console.log('in useEffect async');
      const userEmailValue = await SecureStore.getItemAsync(kUserEmail);
      setUserEmail(userEmailValue);
      console.log('setUserEmail : ', userEmail);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await getSetLinks();
      if (links.length !== 0) {
        setLoading(false);
      }
    })();
  }, [userEmail]);

  const getSetLinks = async () => {
    console.log('In getSetLinks : ');
    console.log(userEmail);
    try {
      if (!userEmail) {
        const userEmailValue = await SecureStore.getItemAsync(kUserEmail);
        setUserEmail(userEmailValue);
        return;
      }

      const params = `?email=${userEmail}`;
      const response: AxiosResponse<any, any> | undefined = await axiosSender(
        Endpoints.getLinks.uri,
        Endpoints.getLinks.method,
        params,
        null
      );
      console.log('Print out response');
      console.log(response);
      if (!response) {
        setLoading(false);
        console.log('Error submitting links');
        Alert.alert('Unable to fetch visited links');
        return;
      }
      if (
        response.status === 200 &&
        response.data.message === ResponseMessages.NO_LINK
      ) {
        setLoading(false);
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
      setLoading(false);
      console.log(resultArray);
    } catch (err) {
      console.log('Error in getSetLinks ', err);
      setLoading(false);
    }
  };

  const handleOnClick = async () => {
    await getSetLinks();
  };

  const Loader = () => {
    return (
      <ContentLoader
        speed={2}
        width={width}
        height={730}
        viewBox="0 0 411 730"
        backgroundColor="#C4D7B2"
        foregroundColor="#f7ffe5"
      >
        <Rect x="45" y="757" rx="11" ry="11" width="135" height="21" />
        <Rect x="52" y="813" rx="11" ry="11" width="120" height="18" />
        <Rect x="61" y="787" rx="11" ry="11" width="100" height="15" />
        <Rect x="237" y="758" rx="11" ry="11" width="135" height="21" />
        <Rect x="244" y="814" rx="11" ry="11" width="120" height="18" />
        <Rect x="253" y="788" rx="11" ry="11" width="100" height="15" />
        <Rect x="20" y="20" rx="20" ry="20" width="370" height="115" />
        <Rect x="20" y="155" rx="20" ry="20" width="370" height="115" />
        <Rect x="20" y="290" rx="20" ry="20" width="370" height="115" />
        <Rect x="20" y="425" rx="20" ry="20" width="370" height="115" />
        <Rect x="20" y="560" rx="20" ry="20" width="370" height="115" />
        <Rect x="20" y="695" rx="20" ry="20" width="370" height="115" />
      </ContentLoader>
    );
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
      {loading ? (
        Loader()
      ) : (
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
      )}
    </SafeAreaView>
  );
};
