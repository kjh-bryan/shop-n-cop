import React from 'react';
import { StyleSheet, TextInput, View, Keyboard, Button } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import { darkGreen, white } from '../constants';

export const SearchBar = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
  isDisabled,
}: {
  clicked: any;
  searchPhrase: any;
  setSearchPhrase: any;
  setClicked: any;
  isDisabled: boolean;
}) => {
  return (
    <View style={styles.container}>
      <View
        style={clicked ? styles.searchBarClicked : styles.searchBarUnClicked}
      >
        <TextInput
          style={!isDisabled ? styles.input : styles.disabledInput}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
          selectTextOnFocus={!isDisabled}
          editable={!isDisabled}
        />
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color={darkGreen}
            style={{ marginLeft: 1, position: 'absolute', right: 20 }}
            onPress={() => {
              setSearchPhrase('');
              Keyboard.dismiss();
              setClicked(false);
            }}
          />
        )}

        {!clicked && (
          <Feather
            name="search"
            size={20}
            color={darkGreen}
            style={{ marginLeft: 1, position: 'absolute', right: 20 }}
          />
        )}
      </View>
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    elevation: 5,
    borderWidth: 1,
    borderColor: darkGreen,
    borderRadius: 15,
  },
  searchBarClicked: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: white,
    borderRadius: 15,
    alignItems: 'center',
  },
  searchBarUnClicked: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: white,
    borderRadius: 15,
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    paddingVertical: 20,
    width: '100%',
    fontFamily: 'OpenSans-Regular',
    borderRadius: 15,
    paddingLeft: 20,
  },
  disabledInput: {
    fontSize: 16,
    paddingVertical: 20,
    width: '100%',
    fontFamily: 'OpenSans-Regular',
    borderRadius: 15,
    paddingLeft: 20,
    opacity: 0.4,
    backgroundColor: '#eee',
  },
});
