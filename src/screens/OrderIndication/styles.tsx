import theme from '../../theme';
import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },

  Body: {
    width: '90%',
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(3),
  },
  logo: {
    width: responsiveWidth(40),
    height: responsiveHeight(30),
    resizeMode: 'contain',
  },
  title: {
    fontSize: responsiveFontSize(2.8),
    fontFamily: theme.fonts.fontBold,
    color: theme.color.title,
  },
  Description: {
    fontSize: responsiveFontSize(2.1),
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.title,
  },

  ContinueButton: {
    backgroundColor: theme.color.button1,
    borderRadius: 10,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    marginVertical: responsiveHeight(2.8),
  },
  ContinueButtonText: {
    color: theme.color.buttonText,
    fontSize: responsiveFontSize(2.1),
    fontFamily: theme.fonts.fontBold,
  },
});

export default styles;
