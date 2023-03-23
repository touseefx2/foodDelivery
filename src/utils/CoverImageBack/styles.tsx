import theme from '../../theme/index';
import {StyleSheet, Platform} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingHorizontal: 12,
    position: 'absolute',
    top:
      Platform.OS == 'android'
        ? theme.window.STATUSBAR_HEIGHT + responsiveHeight(1.4)
        : theme.window.APPBAR_HEIGHT + responsiveHeight(1.4),
  },
  back: {
    width: responsiveFontSize(4),
    height: responsiveFontSize(4),
    borderRadius: responsiveFontSize(4) / 2,
    backgroundColor: theme.color.background,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default styles;
