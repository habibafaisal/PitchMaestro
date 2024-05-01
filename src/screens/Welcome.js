import React, {useRef, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {
  SafeAreaView,
  Text,
  View,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import constants from '../utils/styles';
import {useNavigation} from '@react-navigation/native';
import Background from '../components/Background';

export default function Welcome() {
  const translateYValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  useEffect(() => {
    const animation = Animated.sequence([
      Animated.timing(translateYValue, {
        toValue: -10,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateYValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(animation).start();
  }, []);

  return (
    <Background>
      <View style={{flex: 1}}>
        <LottieView
          source={require('../../src/assets/animation/splash.json')}
          autoPlay
          loop
          style={{flex: 1}}
        />
        <View style={styles.textViewStyle}>
          <Animated.Text
            style={{
              transform: [{translateY: translateYValue}],
              fontSize: 24,
              fontWeight: '600',
            }}>
            Pitch Maestro
          </Animated.Text>
        </View>

        <View style={{alignItems: 'center', marginBottom: 20}}>
          <TouchableOpacity
            style={styles.ContinueBtnStyle}
            onPress={() => {
              navigation.navigate('Guidelines');
            }}>
            <Text style={{color: 'black', fontSize: 18}}>Let's continue</Text>
          </TouchableOpacity>
          <Animated.Text
            style={{
              fontSize: 14,
              marginTop: 10,
              opacity: translateYValue.interpolate({
                inputRange: [-10, 0],
                outputRange: [1, 0],
              }),
            }}>
            Press the button
          </Animated.Text>
        </View>
      </View>
    </Background>
  );
}
const styles = StyleSheet.create({
  ContinueBtnStyle: {
    width: 200,
    height: 50,
    borderRadius: 25,
    backgroundColor: constants.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  textViewStyle: {
    alignItems: 'center',
    position: 'absolute',
    top: '45%',
    left: 0,
    right: 0,
  },
});
