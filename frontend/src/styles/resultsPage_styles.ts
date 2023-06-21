import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 10,
    backgroundColor: "#F7FFE5",
    height:98
  },
  text: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: '#C4D7B2',
    bottom:6
    // fontFamily:'OpenSans-Medium'
  },
  search: {
    bottom: 36,
    left:330 // Adjust the spacing as needed
  },
  back: {
    top: 22,
    left: 30, // Adjust the spacing as needed
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
