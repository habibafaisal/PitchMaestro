import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Background = ({children}) => {
  return <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>;
};

export default Background;

const styles = StyleSheet.create({});
