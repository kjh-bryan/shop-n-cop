import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from '../styles/resultsPage_styles';

import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  PriceInterface,
  ResultsCard,
  ResultsCardProps,
  StyledText,
} from '../components';
import { darkGreen } from '../constants';
import { ShopNCopStackNavigation } from '../navigation/NavigationConstants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParams } from '../navigation/NavigationTypes';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions } from 'react-native';

type Screen = typeof ShopNCopStackNavigation.results;
type ResultScreenProps = NativeStackScreenProps<StackParams, Screen>;

const width = Dimensions.get('window').width;
export const ResultsPageScreen = ({ route }: ResultScreenProps) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<ResultsCardProps[]>([]);

  useEffect(() => {
    const sortResults = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const query = route.params.query ? route.params.query : '';
      const resultFromSearch = route.params.data as {
        [key: string]: ResultsCardProps;
      };
      const resultArray: ResultsCardProps[] = Object.values(
        resultFromSearch
      ).map((result) => ({
        fullTitle: result.title,
        title: !result.title
          ? query
          : result.title.length > 16
          ? result.title.slice(0, 16) + '...'
          : result.title,
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
      }));

      const filteredResultArray = resultArray.filter(
        (result) => result.price !== undefined
      );
      filteredResultArray.sort((a, b) => {
        const priceA = Number(a.price.extracted_value);
        const priceB = Number(b.price.extracted_value);

        return priceA - priceB;
      });

      setResult(filteredResultArray);
      setLoading(false);
    };
    sortResults();
  }, [result]);

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
        <Rect x="29" y="29" rx="10" ry="10" width="160" height="160" />
        <Rect x="42" y="196" rx="11" ry="11" width="135" height="21" />
        <Rect x="49" y="252" rx="11" ry="11" width="120" height="18" />
        <Rect x="58" y="226" rx="11" ry="11" width="100" height="15" />
        <Rect x="221" y="30" rx="10" ry="10" width="160" height="160" />
        <Rect x="234" y="197" rx="11" ry="11" width="135" height="21" />
        <Rect x="241" y="253" rx="11" ry="11" width="120" height="18" />
        <Rect x="250" y="227" rx="11" ry="11" width="100" height="15" />
        <Rect x="27" y="306" rx="10" ry="10" width="160" height="160" />
        <Rect x="40" y="473" rx="11" ry="11" width="135" height="21" />
        <Rect x="47" y="529" rx="11" ry="11" width="120" height="18" />
        <Rect x="56" y="503" rx="11" ry="11" width="100" height="15" />
        <Rect x="219" y="307" rx="10" ry="10" width="160" height="160" />
        <Rect x="232" y="474" rx="11" ry="11" width="135" height="21" />
        <Rect x="239" y="530" rx="11" ry="11" width="120" height="18" />
        <Rect x="248" y="504" rx="11" ry="11" width="100" height="15" />
        <Rect x="32" y="590" rx="10" ry="10" width="160" height="160" />
        <Rect x="45" y="757" rx="11" ry="11" width="135" height="21" />
        <Rect x="52" y="813" rx="11" ry="11" width="120" height="18" />
        <Rect x="61" y="787" rx="11" ry="11" width="100" height="15" />
        <Rect x="224" y="591" rx="10" ry="10" width="160" height="160" />
        <Rect x="237" y="758" rx="11" ry="11" width="135" height="21" />
        <Rect x="244" y="814" rx="11" ry="11" width="120" height="18" />
        <Rect x="253" y="788" rx="11" ry="11" width="100" height="15" />
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
        <StyledText title="Results Page" isBold style={styles.text} />
        {/* <Image
          style={styles.search}
          source={require("../../assets/images/search.png")}
        /> */}
        <Feather
          name="search"
          size={30}
          color={darkGreen}
          onPress={() => {
            console.log('on search click');
          }}
          style={styles.search}
        />
      </View>

      {loading ? (
        Loader()
      ) : (
        <ScrollView
          // stickyHeaderIndices={[0]} // Specify the index of the sticky header
          // showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          <View style={styles.body}>
            {result.length > 0 &&
              result.map((item, index) => (
                <ResultsCard
                  key={index}
                  fullTitle={item.fullTitle}
                  link={item.link}
                  title={item.title}
                  source={item.source}
                  price={item.price}
                  thumbnail={item.thumbnail}
                />
              ))}
            {result.length === 0 && (
              <View style={styles.noLinkTextContainer}>
                <StyledText
                  title={'No results'}
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
