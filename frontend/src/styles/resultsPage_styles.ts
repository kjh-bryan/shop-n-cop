import { StyleSheet, TextStyle } from 'react-native';
import { lightGreen, green, darkGreen } from '../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGreen,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: lightGreen,
    height: 98,
    borderBottomWidth: 1,
    borderBottomColor: darkGreen,
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    color: green,
  },
  search: {
    top: 0,
    right: 5, // Adjust the spacing as needed
    opacity: 0,
  },
  back: {
    top: 0,
    left: 0, // Adjust the spacing as needed
  },
  noLinkTextContainer: {
    marginTop: 100,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: darkGreen,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  noLinkText: {
    fontSize: 30,
    color: green,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 10, // Adjust the spacing as needed
  },
});

export type Styles = {
  header: TextStyle;
  text: TextStyle;
};
