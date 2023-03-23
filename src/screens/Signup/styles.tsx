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

  Profile: {
    width: '100%',
    marginBottom: responsiveHeight(2),
  },
  ProfileImageContainer: {
    width: responsiveFontSize(14),
    height: responsiveFontSize(14),
    borderRadius: responsiveFontSize(14) / 2,
    borderColor: theme.color.subTitleLight,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.button1,
  },
  ProfileImage: {
    width: responsiveFontSize(13.8),
    height: responsiveFontSize(13.8),
    borderRadius: responsiveFontSize(13.8) / 2,
  },
  ImageUploadConatiner: {
    height: responsiveFontSize(4),
    width: responsiveFontSize(4),
    borderRadius: responsiveFontSize(4) / 2,
    backgroundColor: theme.color.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.color.subTitle,
    position: 'absolute',
    bottom: -2,
    right: -2,
    opacity: 0.9,
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
    backgroundColor: theme.color.backgroundLight,
    borderRadius: 6,
    borderWidth: 0.7,
    borderColor: theme.color.subTitleLight,
    marginTop: responsiveHeight(4.2),
    paddingHorizontal: 10,
  },
  CountryLogo: {
    width: responsiveWidth(7),
    height: responsiveHeight(6.2),
    resizeMode: 'contain',
  },

  mobileInput: {
    color: theme.color.subTitleLight,
    fontSize: responsiveFontSize(1.7),
    fontFamily: theme.fonts.fontBold,
  },

  input: {
    width: '100%',
    color: theme.color.title,
    backgroundColor: theme.color.background,
    fontSize: responsiveFontSize(1.7),
    fontFamily: theme.fonts.fontNormal,
    borderRadius: 6,
    borderWidth: 0.7,
    borderColor: theme.color.subTitleLight,
    marginTop: responsiveHeight(2.8),
    paddingHorizontal: 10,
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
