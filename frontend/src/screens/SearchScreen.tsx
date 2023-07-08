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
  Linking,
  Alert,
} from 'react-native';
import { StyledText } from '../components/StyledText';
import { SearchBar } from '../components/SearchBar';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Entypo,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import {
  darkGreen,
  lightGreen,
  white,
  kUserEmail,
  green,
  Endpoints,
  red,
  kJWTToken,
  historyShadow,
} from '../constants';
import { ShopNCopStackNavigation } from '../navigation/NavigationConstants';
import { StackParams } from '../navigation/NavigationTypes';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';
import { CustomModal, CustomModalProps } from '../components/CustomModal';
import { AxiosResponse } from 'axios';
import { axiosSender, localUrl } from '../utils';
import { LoadingSpinner } from '../components/LoadingSpinner';

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
  const [cameraPermissionModal, setCameraPermissionModal] =
    useState<boolean>(false);
  const [galleryPermissionModal, setGalleryPermissionModal] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      const galleryPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      setHasCameraPermission(cameraPermission.granted);
      setHasGalleryPermission(galleryPermission.granted);

      if (!cameraPermission.granted) setCameraPermissionModal(true);
      if (!galleryPermission.granted) setGalleryPermissionModal(true);

      const userId = await SecureStore.getItemAsync(kUserEmail);
      setUserId(userId);
    })();
  }, []);

  const cameraPermissionModalProps: CustomModalProps = {
    openModal: cameraPermissionModal,
    title: 'Camera Permission required',
    body: 'Shop N Cop requires your camera permission to send your photos to search',
    button1Text: 'Settings',
    button1: () => {
      setCameraPermissionModal(false);
      Linking.openSettings();
    },
    button2Text: 'OK',
    button2: () => {
      setCameraPermissionModal(false);
    },
  };

  const galleryPermissionModalProps: CustomModalProps = {
    openModal: galleryPermissionModal,
    title: 'Gallery Permission required',
    body: 'Shop N Cop requires your access to your gallery to pick images',
    button1Text: 'Settings',
    button1: () => {
      setGalleryPermissionModal(false);
      Linking.openSettings();
    },
    button2Text: 'OK',
    button2: () => {
      setGalleryPermissionModal(false);
    },
  };

  const recheckPermissions = async (type: string): Promise<boolean> => {
    console.log('RecheckPermissions');
    if (type === 'GALLERY') {
      const galleryPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasCameraPermission(galleryPermission.granted);

      return galleryPermission.granted;
    } else {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.granted);
      return cameraPermission.granted;
    }
  };

  const takePicture = async () => {
    const permission = await recheckPermissions('CAMERA');
    if (!permission) {
      setCameraPermissionModal(true);
      return;
    }

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
    const permission = await recheckPermissions('GALLERY');
    if (!permission) {
      setGalleryPermissionModal(true);
      return;
    }
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

  const sendImgToCloud = async () => {
    console.log('sending.....');
    setLoading(true);
    try {
      if (!image) {
        Alert.alert('Image could not be taken, please upload again.');
        setLoading(false);
        return;
      }

      const local = await localUrl();
      const token = await SecureStore.getItemAsync(kJWTToken);
      const headers = {
        Authorization: 'Bearer ' + token,
      };
      const uploadResult = await FileSystem.uploadAsync(
        `http://${local}:9090/api/upload`,
        image,
        {
          httpMethod: 'POST',
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: 'newFile',
          headers,
        }
      );

      console.log('uploadResult');
      console.log(uploadResult);
      if (uploadResult.status !== 200) {
        Alert.alert('Could not upload image to cloud.');
        setLoading(false);
        throw new Error('Network response was not ok');
      } else {
        const responseBody = uploadResult.body;
        const jsonData = JSON.parse(responseBody);
        const imageUrl = jsonData.data.url;
        getResultWithSerpapi('IMAGE', imageUrl);
      }
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // error.request is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
      setLoading(false);
    }
  };

  const getResultWithSerpapi = async (
    type: string,
    url?: string,
    query?: string
  ) => {
    console.log('getResultWithSerpapi');
    if (type === 'IMAGE') {
      const params = `?type=IMAGE&imageURL=${url}`;
      try {
        const response: AxiosResponse<any, any> | undefined = await axiosSender(
          Endpoints.search.uri,
          Endpoints.search.method,
          params,
          null
        );
        if (!response) {
          console.error('Error in axiosSender with getResultWithSerpapi');
          setLoading(false);
          return;
        }
        if (response.data === undefined) {
          setLoading(false);
          Alert.alert(
            'No results has been found with this image. Please try another image.'
          );
          return;
        }
        setLoading(false);
        navigation.navigate(ShopNCopStackNavigation.results, {
          data: response.data.data,
        });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      try {
        setLoading(true);
        const params = `?type=TEXT&query=${query}`;
        const response: AxiosResponse<any, any> | undefined = await axiosSender(
          Endpoints.search.uri,
          Endpoints.search.method,
          params,
          null
        );

        if (!response) {
          setLoading(false);
          return;
        }
        setLoading(false);
        navigation.navigate(ShopNCopStackNavigation.results, {
          data: response.data.data,
          query,
        });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoadingSpinner />}
      <SimpleLineIcons
        name="logout"
        size={30}
        color={darkGreen}
        style={styles.logoutIcon}
        onPress={async () => {
          await SecureStore.deleteItemAsync(kUserEmail);
          await SecureStore.deleteItemAsync(kJWTToken);
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
              isDisabled={image}
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
                color={searchPhrase.length === 0 ? white : '#ECECEC'}
                style={
                  searchPhrase.length === 0
                    ? styles.icons
                    : styles.disabledIcons
                }
                onPress={() => {
                  if (searchPhrase.length === 0) {
                    pickImage();
                  }
                }}
              />
              <View style={styles.verticleLine} />
              <MaterialIcons
                name="camera-alt"
                size={30}
                color={searchPhrase.length === 0 ? white : '#ECECEC'}
                style={
                  searchPhrase.length === 0
                    ? styles.icons
                    : styles.disabledIcons
                }
                onPress={() => {
                  if (searchPhrase.length === 0) {
                    takePicture();
                  }
                }}
              />
            </View>
          </View>
          <View style={styles.searchImageContainer}>
            {image && (
              <>
                <Entypo
                  name="cross"
                  size={27}
                  color={darkGreen}
                  style={styles.crossIcon}
                  onPress={() => {
                    console.log('cancel image');
                    setImage(null);
                  }}
                />
                <Image source={{ uri: image }} style={styles.searchImage} />
              </>
            )}

            {!image && searchPhrase.length === 0 ? (
              <MaterialCommunityIcons
                name="image-filter-hdr"
                size={80}
                color={darkGreen}
              />
            ) : (
              !image && (
                <MaterialIcons
                  name="image-not-supported"
                  size={80}
                  color="#B1C2AA"
                />
              )
            )}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                if (searchPhrase.length !== 0) {
                  getResultWithSerpapi('TEXT', '', searchPhrase);
                } else {
                  sendImgToCloud();
                }
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
      {cameraPermissionModal && CustomModal(cameraPermissionModalProps)}
      {galleryPermissionModal && CustomModal(galleryPermissionModalProps)}
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
    backgroundColor: darkGreen,
    borderRadius: 12,
    borderColor: darkGreen,
    borderWidth: 1,
    marginHorizontal: 5,
    textAlign: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: historyShadow,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    textAlignVertical: 'center',
  },
  disabledIcons: {
    flex: 2,
    backgroundColor: '#B1C2AA',
    borderRadius: 12,
    marginHorizontal: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  verticleLine: {
    width: 1,
    backgroundColor: darkGreen,
  },
  searchImageContainer: {
    flex: 3,
    borderColor: darkGreen,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    flex: 0.35,
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
  crossIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  footerContainer: {
    flex: 1,
  },
});
