import { StyleSheet, TextStyle } from 'react-native';
import { historyShadow, historyCardBG, green } from '../constants';

export const styles = StyleSheet.create({
  cardOuter: {
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: historyShadow,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20,
    backgroundColor: historyCardBG,
    marginHorizontal: 21,
  },
  card: {
    // Adjust the width to fit two cards in a row with spacing
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexBasis: 'auto',
    width: '100%',
  },
  imageContainer: {
    width: '40%',
  },
  historyImg: {
    width: 115,
    height: 115,
    resizeMode: 'contain',
    alignContent: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  content: {
    width: '60%',
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
  historyTitle: {
    marginTop: 5,
    fontSize: 15,
    textAlign: 'left',
    color: green,
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  historyShop: {
    fontSize: 12,
    textAlign: 'left',
    color: green,
    paddingBottom: 2,
    marginBottom: 5,
  },
  historyPrice: {
    fontSize: 15,
    textAlign: 'left',
    color: green,
    marginBottom: 10,
  },
  historyLastViewed: {
    fontSize: 10,
    textAlign: 'left',
    color: green,
  },
});

export type Styles = {
  header: TextStyle;
  text: TextStyle;
};
