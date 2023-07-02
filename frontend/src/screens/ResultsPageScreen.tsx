import React from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from '../styles/resultsPage_styles';
import ResultsCard from '../components/ResultCard';

import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyledText } from '../components';
import { darkGreen } from '../constants';
import { ShopNCopStackNavigation } from '../navigation/NavigationConstants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParams } from '../navigation/NavigationTypes';

type Screen = typeof ShopNCopStackNavigation.results;
type ResultScreenProps = NativeStackScreenProps<StackParams, Screen>;

export const ResultsPageScreen = ({ route }: ResultScreenProps) => {
  const navigation = useNavigation();
  const resultFromSearch = route.params.data;
  const data = [
    {
      title: 'Ready Stock Ni*ke Air..',
      content: 'Shopee',
      price: '$22.81',
      image: require('../../assets/images/product1.png'),
    },
    {
      title: 'Authentic Nlke_Air Force..',
      content: 'Amazon',
      price: '$47.03',
      image: require('../../assets/images/product2.png'),
    },
    {
      title: 'Special Offer NIK-E AIR..',
      content: 'Shopee',
      price: '$64',
      image: require('../../assets/images/product3.png'),
    },
    {
      title: 'NIke Air Max Fusion Air',
      content: 'Lazada',
      price: '$75',
      image: require('../../assets/images/product4.png'),
    },
    {
      title: 'Ready Stock Ni*ke Air..',
      content: 'Shopee',
      price: '$22.81',
      image: require('../../assets/images/product1.png'),
    },
    {
      title: 'Authentic Nlke_Air Force..',
      content: 'Amazon',
      price: '$47.03',
      image: require('../../assets/images/product2.png'),
    },
    {
      title: 'Special Offer NIK-E AIR..',
      content: 'Shopee',
      price: '$64',
      image: require('../../assets/images/product3.png'),
    },
    {
      title: 'NIke Air Max Fusion Air',
      content: 'Lazada',
      price: '$75',
      image: require('../../assets/images/product4.png'),
    },
  ];

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
          {data.map((item, index) => (
            <ResultsCard
              key={index}
              title={item.title}
              content={item.content}
              price={item.price}
              image={item.image}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
