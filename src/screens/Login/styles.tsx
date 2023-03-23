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
  main: {
    width: '100%',
    paddingHorizontal: 25,
    marginTop: responsiveHeight(2.8),
  },
  title: {
    marginTop: responsiveHeight(2.8),
    fontSize: responsiveFontSize(2.3),
    color: theme.color.subTitle,
    fontFamily: theme.fonts.fontBold,
  },
  MobileInputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.color.background,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: theme.color.subTitleLight,
    marginTop: responsiveHeight(2.8),
    paddingHorizontal: 10,
  },
  CountryLogo: {
    width: responsiveWidth(7),
    height: responsiveHeight(6.2),
    resizeMode: 'contain',
  },

  input: {
    color: theme.color.title,
    fontSize: responsiveFontSize(1.7),
    fontFamily: theme.fonts.fontMedium,
  },

  button: {
    borderRadius: 10,
    padding: 12,
    justifyContent: 'center',
    width: responsiveWidth(90),
    alignSelf: 'center',
    fontFamily: theme.fonts.fontNormal,
    marginVertical: responsiveHeight(3),
    alignItems: 'center',
    backgroundColor: theme.color.button1,
  },
  buttonText: {
    textAlign: 'center',
    color: theme.color.buttonText,
    fontSize: responsiveFontSize(2.3),
    fontFamily: theme.fonts.fontBold,
  },
});
