import { Dimensions, StyleSheet, TextStyle } from 'react-native';
import { darkGreen, green } from '../constants';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  cardContainer: {
    width: (windowWidth - 48) / 2, // Adjust the width to fit two cards in a row with spacing
    height: 200,
    alignItems: 'center',
    marginVertical: 30,
  },
  productImage: {
    width: 160,
    height: 160,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: darkGreen,
    resizeMode: 'contain',
  },
  productTitle: {
    fontSize: 16,
    textAlign: 'center',
    top: 8,
    color: green,
  },
  productShop: {
    fontSize: 13,
    textAlign: 'center',
    top: 7,
    color: green,
    paddingBottom: 2,
  },
  productPrice: {
    fontSize: 16,
    textAlign: 'center',
    top: 6,
    color: green,
    paddingBottom: 30,
  },
});

export type Styles = {
  header: TextStyle;
  text: TextStyle;
};
