import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import {useFonts} from "expo-font";
import AppLoading from "expo-app-loading";
import { StyledText } from '../components/StyledText';


const logo = require('../../assets/icon.png');
const screenWidth = Dimensions.get('screen').width;



export const SearchScreen =()=> {
   

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={logo} style={styles.imageStyle}></Image>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.titleContainer}>
            <StyledText
              title="What are you"
              style={styles.smallFont}
              isBold={false}
            />
            <StyledText
              title="Shopping "
              style={styles.mediumFont}
              isBold={true}
            />
            <StyledText
              title="for today?"
              style={styles.mediumFont}
              isBold={false}
            />
          </View>
        </View>
        <View style={styles.footerContainer}></View>
      </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FFE5",
    color: "#A0C49D",
  },
  imageContainer: {
    flex: 2,
    marginTop: 68,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: 120,
    height: 120,
  },
  bodyContainer: {
    flex: 9,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "red",
  },
  titleContainer: {
    width: screenWidth - 100,
    justifyContent: "flex-start",
    backgroundColor:'yellow'
  },
  
  fontBold: {
    fontWeight: "bold",
  },
  smallFont: {
    fontSize:20,
  },
  mediumFont:{
    fontSize:24,
  },
  footerContainer: {
    flex: 1,
    backgroundColor: "green",
  },
  topContainer: {
    flex: 0.5,
    backgroundColor: "red",
  },
  bottomContainer: {
    flex: 0.5,
    backgroundColor: "blue",
  },
});