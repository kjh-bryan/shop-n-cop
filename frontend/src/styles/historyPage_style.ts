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
    justifyContent: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: darkGreen,
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    color: green,
  },
  back: {
    top: 20,
    left: 0, // Adjust the spacing as needed
    position: 'absolute',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20, // Adjust the spacing as needed
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
});

export type Styles = {
  header: TextStyle;
  text: TextStyle;
};
