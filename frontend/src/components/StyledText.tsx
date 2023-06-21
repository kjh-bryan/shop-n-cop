import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import React from 'react';
import { StyleSheet, StyleSheetProperties, Text, TextProps } from 'react-native';




export const StyledText = ({title, style,isBold} : {title:string, style:any,isBold:boolean}) => {

     let [fontsLoaded] = useFonts({
       "OpenSans-Regular": require("../../assets/fonts/OpenSans-Regular.ttf"),
       "OpenSans-Bold": require("../../assets/fonts/OpenSans-Bold.ttf"),
     });

     if (!fontsLoaded) {
       return <AppLoading />;
     }
       return (
         <Text style={[isBold ? styles.bold : styles.regular, style]}>
           {title}
         </Text>
       );
};

const styles = StyleSheet.create({
  regular: {
    fontFamily: "OpenSans-Regular",
  },
  bold: {
    fontFamily: "OpenSans-Bold",
  },
});

