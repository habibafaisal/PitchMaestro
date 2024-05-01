import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import {useRoute} from '@react-navigation/native';
import Background from '../components/Background';
import {windowHeight, windowWidth} from '../utils/styles';
import constants from '../utils/styles';
import TextStyle from '../components/TextStyle';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {GoogleGenerativeAI} from '@google/generative-ai';
import {API_KEY} from '@env';

const genAI = new GoogleGenerativeAI(API_KEY);

const PlatformInput = ({route}) => {
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [region, setRegion] = useState('');
  const [audience, setAudience] = useState('');
  const [focused, setFocus] = useState('');
  const [selectedImagesFromGallery, setSelectedImagesFromGallery] = useState(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const title = route.params.title;
  console.log(title);

  const fetchData = async () => {
    if (
      !category ||
      !type ||
      !region ||
      !audience ||
      selectedImagesFromGallery.length === 0
    ) {
      Alert.alert('Error', 'Please fill in all fields and select an image.');
      return;
    }

    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({model: 'gemini-pro'});
      let prompt;
      if (title == 'Facebook') {
        prompt = `Given the image, audience type ${audience}, product category ${category}, product type ${type} and target region ${region} Generate a Facebook post with hashtags that is precise, eye catching and interesting to read; include native words and phrases (native language but write in english letters) which are relevant with the target region . include a personal touch by mentioning one of the issues faced by the normal civilian of the region and talk how the products helps to lessen it in a funny manner.`;
      } else if (title == 'Instagram') {
        prompt = `Given the image, audience type ${audience}, product category ${category}, product type ${type} and target region ${region} Generate 5 captions with hashtags that are precise and eye catching; include native words and phrases (native language but write in english letters) which are relevant with the target region . include a personal touch by mentioning one of the issues faced by the normal civilian of the region and talk how the products helps to lessen it in a funny manner.keep it one sentence only with hashtags.`;
      } else if (title == 'X') {
        prompt = `Given the image, audience type ${audience}, product category ${category}, product type ${type} and target region ${region} Generate 5 tweets  with hashtags that are precise and eye catching; include native words and phrases (native language but write in english letters) which are relevant with the target region . include a personal touch by mentioning one of the issues faced by the normal civilian of the region and talk how the products helps to lessen it in a funny manner.keep it one sentence only with hashtags.`;
      }

      const result = await model.generateContent([
        prompt,
        ...selectedImagesFromGallery,
      ]);
      const response = await result.response;
      const text = response.text();
      setApiData(text);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      quality: 1,
    };

    let result = await launchImageLibrary(options);

    if (!result.didCancel) {
      const newImageUris = result.assets.map(asset => asset.uri);
      setSelectedImagesFromGallery([
        ...selectedImagesFromGallery,
        ...newImageUris,
      ]);
      console.log('image func', newImageUris);
    }
  };

  const removeImageFromGallery = index => {
    Alert.alert(
      'Remove Image',
      'Are you sure you want to remove this image?',
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {text: 'Remove', onPress: () => handleImageRemovalGallery(index)},
      ],
      {cancelable: false},
    );
  };
  const handleImageRemovalGallery = index => {
    const updatedImages = [...selectedImagesFromGallery];
    updatedImages.splice(index, 1);
    setSelectedImagesFromGallery(updatedImages);
  };

  return (
    <Background>
      <ScrollView>
        <View style={styles.container}>
          <Header title="Generate a Pitch" />
          <View
            style={{
              marginHorizontal: windowWidth * 0.025,
            }}>
            <View
              style={{
                marginTop: windowHeight * 0.025,
              }}>
              <TextStyle textMsg="Step 2"></TextStyle>
            </View>
            <View style={styles.guidelineViewStyle}>
              <TouchableOpacity
                onPress={pickImage}
                style={styles.imageUploadStyle}>
                <TextStyle textMsg="Click here to select an image or more!"></TextStyle>
              </TouchableOpacity>
            </View>

            <View style={styles.imageViewStyle}>
              {selectedImagesFromGallery.map((uri, index) => (
                <TouchableOpacity onPress={() => removeImageFromGallery(index)}>
                  <Image
                    key={uri}
                    source={{uri}}
                    style={styles.promptImageStyle}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={{}}>
              <TextInput
                style={styles.input}
                placeholder="Product Category eg. Clothing"
                value={category}
                onChangeText={setCategory}
              />
              <TextInput
                style={styles.input}
                placeholder="Product Type eg. Festive Wear"
                value={type}
                onChangeText={setType}
              />
              <TextInput
                style={styles.input}
                placeholder="Target Region eg. Pakistan"
                value={region}
                onChangeText={setRegion}
              />
              <TextInput
                style={styles.input}
                placeholder="Target Audience eg. Women, Brides"
                value={audience}
                onChangeText={setAudience}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  backgroundColor: constants.primaryColor,
                  paddingHorizontal: windowWidth * 0.05,
                  paddingVertical: windowHeight * 0.0085,
                  borderRadius: 8,
                }}
                onPress={() => {
                  fetchData();
                }}>
                <TextStyle textMsg="Submit" fontSize={16} />
              </TouchableOpacity>
            </View>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator
                  size="large"
                  color={constants.primaryColor}
                />
                <TextStyle
                  textMsg="Getting results for your brand to rock!"
                  fontSize={16}
                />
              </View>
            ) : (
              <View style={styles.resultItem}>
                <TextStyle textMsg={apiData} fontSize={16} />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </Background>
  );
};

export default PlatformInput;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: windowHeight * 0.025,
  },

  guidelineViewStyle: {
    marginVertical: windowHeight * 0.025,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageViewStyle: {
    flexDirection: 'row',
    marginBottom: windowHeight * 0.025,
    justifyContent: 'center',
  },
  promptImageStyle: {width: 100, height: 100, margin: 5, borderRadius: 16},
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: constants.black,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginVertical: windowHeight * 0.025,
    // marginBottom: 10,
  },
  resultItem: {
    marginVertical: windowHeight * 0.025,
    // padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: 'lightgray',
  },
});
