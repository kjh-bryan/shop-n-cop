import { StyleSheet, TextStyle } from 'react-native';
import { lightGreen, green } from '../constants';

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
});

export type Styles = {
  header: TextStyle;
  text: TextStyle;
};
