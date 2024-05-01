import {Dimensions} from 'react-native';

export default constants = {
  primaryColor: '#bdec54', //rgba(189,236,84,255)
  secondaryColor: 'black',
  regularFont: 'Lato',
  bold: 'Lato-Bold',
  italic: 'Lato-Italic',
  boldItalic: 'Lato-BoldItalic',
  light: 'Lato-Light',
  lightItalic: 'Lato-LightItalic',
  black: 'Lato-Black',
  blackItalic: 'Lato-BlackItalic',
  thin: 'Lato-Thin',
  thinItalic: 'Lato-ThinItalic',
  backIcon: require('../assets/images/backIcon.png'),
};

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
