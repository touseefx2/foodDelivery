import theme from '../../theme/index';
import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  dotPosition: {
    left: '50%',
    position: 'absolute',
    top: '50%',
  },
  dotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotPinLocation: {
    position: 'absolute',
    opacity: 0.8,
    bottom: responsiveHeight(0.8),
    width: responsiveWidth(6.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: responsiveFontSize(0.7),
    height: responsiveFontSize(0.7),
    borderRadius: responsiveFontSize(0.7) / 2,
    backgroundColor: 'black',
  },
  dotWarningMessage: {
    backgroundColor: theme.color.background,
    opacity: 0.8,
    bottom: responsiveHeight(4.5),
    alignSelf: 'center',
    position: 'absolute',
    width: responsiveWidth(47),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    borderRadius: 10,
  },
  dotWarningMessageText: {
    fontSize: responsiveFontSize(1.6),
    color: theme.color.title,
    fontFamily: theme.fonts.fontMedium,
  },
});

export default styles;
