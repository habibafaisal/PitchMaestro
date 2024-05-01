import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useRef} from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import {windowHeight, windowWidth} from '../utils/styles';
import constants from '../utils/styles';
import TextStyle from '../components/TextStyle';

const Guidelines = ({navigation}) => {
  const translateYValue = useRef(new Animated.Value(0)).current;

  return (
    <Background>
      <View style={styles.container}>
        <View>
          <Header title="Hmm...but what is it?" />
        </View>
        <View style={{marginHorizontal: windowWidth * 0.05}}>
          <View style={{marginVertical: windowHeight * 0.05}}>
            <TextStyle textMsg="Welcome to Pitch Maestro!" />
          </View>
          <View style={{marginVertical: windowHeight * 0.025}}>
            <TextStyle
              textMsg="In a world where crafting captivating content can be both pricey and time-consuming, let's flip the script!"
              fontFamily={constants.regularFont}
            />
          </View>
          <View style={{}}>
            <TextStyle
              textMsg="It's as simple as selecting your preferred platform to start."
              fontFamily={constants.regularFont}
            />
          </View>
          <View style={{}}>
            <TextStyle
              textMsg="Just upload your image and fill in the details – you're ready to shine!"
              fontFamily={constants.regularFont}
            />
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.ContinueBtnStyle}
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <TextStyle
                textMsg="Let's begin our journey!"
                fontSize={16}
                fontFamily={constants.regularFont}
              />
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
      </View>
    </Background>
  );
};

export default Guidelines;

const styles = StyleSheet.create({
  buttonView: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: windowHeight * 0.05,
  },
  container: {
    flex: 1,
  },
  ContinueBtnStyle: {
    width: windowWidth * 0.65,
    height: 50,
    borderRadius: 25,
    backgroundColor: constants.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  flatListContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginVertical: windowHeight * 0.05,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: constants.secondaryColor,
    margin: 5,
    height: windowHeight * 0.125,
    borderRadius: 12,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
});
