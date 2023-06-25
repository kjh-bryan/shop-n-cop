import React from 'react';
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { darkGreen, white } from '../constants';

export const SearchBar = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
}: {
  clicked: any;
  searchPhrase: any;
  setSearchPhrase: any;
  setClicked: any;
}) => {
    return (
      <View style={styles.container}>
        <View
          style={clicked ? styles.searchBarClicked : styles.searchBarUnClicked}
        >
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchPhrase}
            onChangeText={setSearchPhrase}
            onFocus={() => {
              setClicked(true);
            }}
          />
          {clicked && (
            <Entypo
              name="cross"
              size={20}
              color={darkGreen}
              style={{ marginLeft: 1,position:'absolute', right:20,}}
              onPress={() => {
                setSearchPhrase("");
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
              style={{ marginLeft: 1,position:'absolute', right:20, }}
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
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    elevation: 5,
    borderWidth: 1,
    borderColor: darkGreen,
    borderRadius:15,
  },
  searchBarClicked: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: white,
    borderRadius: 15,
    alignItems: "center",
  },
  searchBarUnClicked: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: white,
    borderRadius: 15,
    alignItems: "center",
  },
  input: {
    fontSize: 16,
    paddingVertical:20,
    width: "100%",
    fontFamily: "OpenSans-Regular",
    borderRadius:15,
    paddingLeft:20,
  },
});