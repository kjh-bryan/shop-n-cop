import React from 'react';
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

type Screen = typeof ShopNCopStackNavigation.results;
type ResultScreenProps = NativeStackScreenProps<StackParams, Screen>;

export const ResultsPageScreen = ({ route }: ResultScreenProps) => {
  const navigation = useNavigation();

  const query = route.params.query ? route.params.query : '';
  const resultFromSearch = route.params.data as {
    [key: string]: ResultsCardProps;
  };
  const resultArray: ResultsCardProps[] = Object.values(resultFromSearch).map(
    (result) => ({
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
    })
  );

  const filteredResultArray = resultArray.filter(
    (result) => result.price !== undefined
  );

  filteredResultArray.sort((a, b) => {
    const priceA = Number(a.price.extracted_value);
    const priceB = Number(b.price.extracted_value);

    return priceA - priceB;
  });

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
          nPress={() => {
            console.log('on search click');
          }}
          style={styles.search}
        />
      </View>
      <ScrollView
        // stickyHeaderIndices={[0]} // Specify the index of the sticky header
        // showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <View style={styles.body}>
          {filteredResultArray.map((item, index) => (
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
