import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Dimensions,
  Text,
  Pressable,
} from 'react-native';
import { darkGreen, lightGreen, white } from '../constants';
import { StyledText } from './StyledText';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface CustomModalProps {
  openModal: boolean;
  title: string;
  body: string;
  button1: () => void;
  button1Text?: string;
  button2: () => void;
  button2Text?: string;
}

const WIDTH = Dimensions.get('window').width;
export const CustomModal = ({
  openModal,
  title,
  body,
  button1,
  button1Text,
  button2,
  button2Text,
}: CustomModalProps) => {
  return (
    <Modal visible={openModal} animationType="fade" transparent={true}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.title}>
            <StyledText title={title} style={styles.titleText} />
          </View>
          <View style={styles.body}>
            <StyledText title={body} isLight style={styles.bodyText} />
          </View>
          <View style={styles.buttons}>
            <Pressable
              onPress={button1}
              style={[styles.primaryButton, styles.buttonContainer]}
            >
              <StyledText
                title={button1Text ?? ''}
                style={[styles.buttonText, styles.primaryButton]}
              />
            </Pressable>
            <Pressable
              onPress={button2}
              style={[styles.buttonContainer, styles.secondaryButton]}
            >
              <StyledText
                title={button2Text ?? ''}
                style={[styles.buttonText, styles.secondaryButton]}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modal: {
    backgroundColor: lightGreen,
    padding: 15,
    width: WIDTH * 0.85,
    borderRadius: 15,
    marginHorizontal: WIDTH * 0.075,
  },
  title: {
    paddingVertical: 5,
  },
  titleText: {
    fontSize: 20,
  },
  body: {
    paddingVertical: 5,
  },
  bodyText: {
    fontSize: 18,
  },
  buttons: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    width: WIDTH * 0.3,
    alignItems: 'center',
  },
  primaryButton: {
    borderColor: darkGreen,
    color: darkGreen,
  },
  secondaryButton: {
    borderColor: darkGreen,
    backgroundColor: darkGreen,
    color: white,
  },
  buttonText: {
    fontSize: 18,
  },
});
