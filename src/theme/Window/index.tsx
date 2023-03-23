import {Dimensions, Platform, StatusBar} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT =
  Platform.OS == 'ios' ? responsiveHeight(6.1) : responsiveHeight(7.7);
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA + Width / Height;

const window = {
  Width,
  Height,
  STATUSBAR_HEIGHT,
  APPBAR_HEIGHT,
  LONGITUDE_DELTA,
  LATITUDE_DELTA,
};

export default window;
