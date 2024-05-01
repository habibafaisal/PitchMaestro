import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import constants, {windowHeight, windowWidth} from '../utils/styles';
import TextStyle from './TextStyle';
import {useNavigation} from '@react-navigation/native';

const Header = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={constants.backIcon} style={styles.image} />
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <TextStyle textMsg={title} fontFamily={constants.bold} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: constants.primaryColor,
    height: windowHeight * 0.085,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: windowWidth * 0.05,
  },
  headerText: {
    color: constants.secondaryColor,
    fontFamily: constants.regularFont,
    alignItems: 'center',
    fontSize: 24,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
});

export default Header;
