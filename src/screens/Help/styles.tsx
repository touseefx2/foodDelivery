import {StyleSheet} from 'react-native';
import theme from '../../theme/index';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
  section1: {
    marginTop: '12%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  logo: {
    width: responsiveWidth(30),
    height: responsiveHeight(20),
    resizeMode: 'cover',
  },

  title: {
    fontSize: responsiveFontSize(4),
    fontFamily: theme.fonts.fontBold,
    color: theme.color.title,
    textAlign: 'center',
  },

  title2: {
    fontSize: responsiveFontSize(2.3),
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.title,
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: responsiveHeight(4.2),
  },

  title3: {
    fontSize: responsiveFontSize(2.15),
    fontFamily: theme.fonts.fontBold,
    color: theme.color.button1,
    textAlign: 'center',
    marginTop: responsiveHeight(2.8),
  },
});
