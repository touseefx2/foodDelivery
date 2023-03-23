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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    position: 'absolute',
    top:
      Platform.OS == 'ios'
        ? theme.window.APPBAR_HEIGHT + 10
        : responsiveHeight(1.5),
    width: '100%',
  },
  crossButton: {
    width: responsiveFontSize(5),
    height: responsiveFontSize(5),
    borderRadius: responsiveFontSize(5 / 2),
    opacity: headericonOpacity,
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
  googleSearchBar: {
    width: responsiveWidth(55),

    backgroundColor: theme.color.background,
    borderRadius: 12,
    opacity: headericonOpacity,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  googleSearchBarText: {
    fontSize: responsiveFontSize(1.75),
    color: theme.color.title,
    marginLeft: 10,
    fontFamily: theme.fonts.fontMedium,
  },
  currentLocationButton: {
    width: responsiveFontSize(5),
    height: responsiveFontSize(5),
    borderRadius: responsiveFontSize(5 / 2),
    backgroundColor: theme.color.background,
    opacity: headericonOpacity,
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
  footerContainer: {
    width: '100%',
    backgroundColor: theme.color.background,
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    position: 'absolute',
    zIndex: 3,
    bottom: 0,
  },
  footerSection1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
    marginBottom: Platform.OS == 'ios' ? responsiveHeight(1.4) : 0,
  },
  locationIconConatiner: {
    width: '10%',
  },
  textAreaContainer: {
    width: '87%',
  },
  textAreaTitle: {
    color: theme.color.title,
    fontSize: responsiveFontSize(2),
    fontFamily: theme.fonts.fontMedium,
    textTransform: 'capitalize',
  },
  textAreaSubTitle: {
    color: theme.color.subTitle,
    fontSize: responsiveFontSize(1.9),
    fontFamily: theme.fonts.fontNormal,
    textTransform: 'capitalize',
  },
  footerButtonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: theme.color.button1,
    borderRadius: 7,
    alignSelf: 'center',
    marginTop: responsiveHeight(1.4),
    marginBottom:
      Platform.OS == 'ios' ? theme.window.APPBAR_HEIGHT : responsiveHeight(0.7),
  },
  footerButtonText: {
    color: theme.color.buttonText,
    fontSize: responsiveFontSize(2.1),
    fontFamily: theme.fonts.fontBold,
    textTransform: 'capitalize',
  },
});

export default styles;
