import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import constants from '../utils/styles';

const TextStyle = ({textMsg, fontSize, fontFamily}) => {
  return (
    <Text
      style={{
        color: constants.secondaryColor,
        fontFamily: fontFamily || constants.bold,
        fontSize: fontSize || 24,
        textAlign: 'center',
      }}>
      {textMsg}
    </Text>
  );
};

export default TextStyle;

const styles = StyleSheet.create({
  headerText: {
    color: constants.secondaryColor,
    fontFamily: constants.bold,
    fontSize: 24,
  },
});
