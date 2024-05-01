import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import {windowHeight, windowWidth} from '../utils/styles';
import constants from '../utils/styles';
import TextStyle from '../components/TextStyle';

const Home = ({navigation}) => {
  const socialPlatforms = [
    {
      id: '1',
      title: 'Facebook',
      image: require('../assets/images/fb-logo.png'),
      platformDescription:
        'A post to connect with millions of users worldwide!',
    },
    {
      id: '2',
      title: 'Instagram',
      image: require('../assets/images/insta-logo.png'),
      platformDescription:
        'Share your brands story with stunning visuals along with eye-catching captions!',
    },
    {
      id: '3',
      title: 'X',
      image: require('../assets/images/x-logo.png'),
      platformDescription:
        'Discover new opportunities for your product growth!',
    },
  ];
  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Platform', {title: item.title});
          }}>
          <View style={{alignItems: 'center', fontFamily: constants.bold}}>
            <Image source={item.image} style={styles.image} />
          </View>
          <Text style={{textAlign: 'center', fontFamily: constants.bold}}>
            {item.title}
          </Text>
          <Text style={{textAlign: 'center', fontFamily: constants.regular}}>
            {item.platformDescription}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Background>
      <View style={styles.container}>
        <View>
          <Header title="Dashboard" />
        </View>
        <View style={{marginHorizontal: windowHeight * 0.025}}>
          <View
            style={{
              marginTop: windowHeight * 0.025,
              marginHorizontal: windowHeight * 0.025,
            }}>
            <TextStyle
              textMsg="Step 1: Select a platform"
              fontFamily={constants.bold}
            />
          </View>

          <View style={styles.flatListContainer}>
            <FlatList
              data={socialPlatforms}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              numColumns={2}
            />
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {},
  flatListContainer: {
    paddingHorizontal: 10,
    marginVertical: windowHeight * 0.05,
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: constants.secondaryColor,
    marginVertical: windowHeight * 0.005,
    paddingVertical: windowHeight * 0.025,
    paddingHorizontal: windowWidth * 0.025,
    borderRadius: 12,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
});
