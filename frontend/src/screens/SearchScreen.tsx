import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  NativeModules,
  Platform,
} from 'react-native';
import { StyledText } from '../components/StyledText';
import { SearchBar } from '../components/SearchBar';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import { darkGreen, lightGreen, white, kUserEmail } from '../constants';
import { ShopNCopStackNavigation } from '../navigation/NavigationConstants';
import { StackParams } from '../navigation/NavigationTypes';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';

const { StatusBarManager } = NativeModules;
const iOSStatusBarHeight = Constants.statusBarHeight;
type Screen = typeof ShopNCopStackNavigation.search;
type SearchScreenProps = NativeStackScreenProps<StackParams, Screen>;

const logo = require('../../assets/images/icon.png');
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export const SearchScreen = ({ route }: SearchScreenProps) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const [userId, setUserId] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
  const [image, setImage] = useState<any>();

  useEffect(() => {
    (async () => {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      const galleryPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasGalleryPermission(galleryPermission.status === 'granted');
      const userId = await SecureStore.getItemAsync(kUserEmail);
      setUserId(userId);
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions..</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  if (hasGalleryPermission === false) {
    return <Text>Permission to Internal Storage not granted.</Text>;
  }

  const takePicture = async () => {
    console.log('take picture');
    const cameraResponse = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!cameraResponse.canceled) {
      console.log(
        'Taking pictuiree from camera : ',
        cameraResponse.assets[0].uri
      );
      setImage(cameraResponse.assets[0].uri);
    }
  };

  const pickImage = async () => {
    console.log('pick picture');
    const getImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!getImage.canceled) {
      console.log('Printing image from gallery : ', getImage.assets[0].uri);
      setImage(getImage.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SimpleLineIcons
        name="logout"
        size={30}
        color={darkGreen}
        style={styles.logoutIcon}
        onPress={async () => {
          await SecureStore.deleteItemAsync(kUserEmail);
          setUserId(null);
          navigation.replace(ShopNCopStackNavigation.signIn);
        }}
      />
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.imageStyle}></Image>
      </View>
      <MaterialIcons
        name="history"
        size={30}
        color={darkGreen}
        style={styles.historyIcon}
        onPress={() => {
          navigation.navigate(ShopNCopStackNavigation.history as never);
        }}
      />
      <View style={styles.bodyContainer}>
        <View style={styles.topBody}>
          <View style={styles.titleContainer}>
            <StyledText
              title="What are you"
              style={styles.smallFont}
              isBold={false}
              isLight={true}
            />
            <Text>
              <StyledText
                title="Shopping "
                style={styles.mediumFont}
                isBold={true}
                isLight={false}
              />
              <StyledText
                title="for today?"
                style={styles.mediumFont}
                isBold={false}
                isLight={true}
              />
            </Text>
          </View>
          <View>
            <SearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              clicked={clicked}
              setClicked={setClicked}
            />
          </View>
        </View>
        <View style={styles.middleBody}>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <StyledText
              title="or"
              isBold={true}
              isLight={false}
              style={styles.dividerText}
            />
            <View style={styles.divider} />
          </View>
        </View>
        <View style={styles.bottomBody}>
          <View style={styles.iconRowContainer}>
            <View style={styles.iconsContainer}>
              <MaterialIcons
                name="image-search"
                size={30}
                color={darkGreen}
                style={styles.icons}
                onPress={pickImage}
              />
              <View style={styles.verticleLine} />
              <MaterialIcons
                name="camera-alt"
                size={30}
                color={darkGreen}
                style={styles.icons}
                onPress={takePicture}
              />
            </View>
          </View>
          <View style={styles.searchImageContainer}>
            {image && (
              <Image source={{ uri: image }} style={styles.searchImage} />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ShopNCopStackNavigation.results as never);
              }}
              style={styles.button}
            >
              <StyledText
                title="Search"
                isBold={false}
                isLight={false}
                style={styles.buttonText}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.footerContainer}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGreen,
    color: darkGreen,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: screenHeight,
  },
  logoutIcon: {
    position: 'absolute',
    left: 10,
    top:
      Platform.OS === 'android' ? StatusBarManager.HEIGHT : iOSStatusBarHeight,
  },
  historyIcon: {
    position: 'absolute',
    right: 10,
    top:
      Platform.OS === 'android' ? StatusBarManager.HEIGHT : iOSStatusBarHeight,
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRowContainer: {
    flex: 0.5,
    marginBottom: 20,
  },
  iconsContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icons: {
    flex: 2,
    textAlign: 'center',
  },
  verticleLine: {
    width: 2,
    backgroundColor: darkGreen,
  },
  searchImageContainer: {
    flex: 3,
  },
  searchImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageStyle: {
    width: 120,
    height: 120,
  },
  bodyContainer: {
    flex: 9,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screenWidth - 100,
  },
  topBody: {
    flex: 0.4,
  },
  titleContainer: {
    justifyContent: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  middleBody: {
    flex: 0.1,
    alignItems: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: darkGreen,
  },
  dividerText: {
    width: 80,
    textAlign: 'center',
    color: darkGreen,
    fontSize: 16,
  },
  bottomBody: {
    flex: 0.6,
  },
  buttonContainer: {
    flex: 0.5,
    flexDirection: 'row',
    marginVertical: 20,
  },
  button: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: darkGreen,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    color: white,
    letterSpacing: 3,
    fontSize: 16,
  },
  fontBold: {
    fontWeight: 'bold',
  },
  smallFont: {
    fontSize: 20,
    color: darkGreen,
  },
  mediumFont: {
    fontSize: 24,
    color: darkGreen,
  },
  footerContainer: {
    flex: 1,
  },
});
