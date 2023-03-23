import theme from '../../theme/index';
import {StyleSheet, Platform} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

let headericonOpacity = 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
  Title: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: '#000',
  },
  Button: {
    height: 48,
    borderRadius: 48,
    marginTop: 10,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#0E47A1',
    justifyContent: 'center',
  },
  ButtonText: {
    alignSelf: 'center',
    color: '#fff',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },

  headerPosition: {
    paddingHorizontal: 10,
    paddingVertical: responsiveHeight(0.7),
    backgroundColor: theme.color.background,
    position: 'absolute',
    width: '100%',
    top: Platform.OS == 'ios' ? theme.window.APPBAR_HEIGHT : 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  crossButton: {
    width: responsiveWidth(10),
    opacity: headericonOpacity,
    marginTop: responsiveHeight(0.7),
  },
  currentLocationButton: {
    width: responsiveFontSize(5),
    height: responsiveFontSize(5),
    borderRadius: responsiveFontSize(5) / 2,
    backgroundColor: theme.color.button1,
    opacity: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: responsiveHeight(Platform.OS == 'android' ? 10 : 12),
    right: responsiveHeight(1.4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  BottomView: {
    width: '100%',
    backgroundColor: theme.color.button1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom:
      Platform.OS == 'android'
        ? 0
        : theme.window.STATUSBAR_HEIGHT + responsiveHeight(2.8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 12,
  },
  section2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: theme.color.background,
    borderRadius: 7,
    alignSelf: 'center',
    marginTop: 10,
    elevation: 4,
  },
  section2Text: {
    color: theme.color.buttonText,
    fontSize: responsiveFontSize(2.15),
    fontFamily: theme.fonts.fontBold,
  },
  section2DisbaleText: {
    color: theme.color.buttonText,
    fontSize: responsiveFontSize(1.75),
    fontFamily: theme.fonts.fontBold,
  },
  fieldText: {
    fontSize: responsiveFontSize(1.65),
    color: theme.color.title,
    fontFamily: theme.fonts.fontMedium,
    marginBottom: responsiveHeight(0.7),
  },
  input: {
    backgroundColor: theme.color.background,
    fontSize: responsiveFontSize(1.55),
    fontFamily: theme.fonts.fontNormal,
    borderWidth: 0.6,
    borderColor: theme.color.subTitle,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: responsiveHeight(1.4),
    color: theme.color.title,
  },

  adressWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  adressTitle: {
    fontSize: responsiveFontSize(1.75),
    color: theme.color.button1,
    fontFamily: theme.fonts.fontBold,
  },
  navigate: {
    width: responsiveFontSize(3),
    height: responsiveFontSize(3),
    opacity: 0.9,
  },
  disableText: {
    fontSize: responsiveFontSize(1.4),
    color: theme.color.subTitleLight,
    fontFamily: theme.fonts.fontBold,
    marginTop: responsiveHeight(0.7),
    marginBottom: responsiveHeight(1.4),
    letterSpacing: -0.2,
    paddingHorizontal: 10,
  },
});

export default styles;
