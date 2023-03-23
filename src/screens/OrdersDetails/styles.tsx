import {StyleSheet} from 'react-native';
import theme from '../../theme/index';
import {
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
  container2: {
    flex: 1,
    backgroundColor: theme.color.backgroundLight,
  },
  separator: {
    width: '100%',
    backgroundColor: 'silver',
    height: responsiveHeight(0.15),
    alignSelf: 'center',
  },
  mainSec: {
    backgroundColor: theme.color.background,
    marginBottom: responsiveHeight(0.7),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  mainSecText: {
    textAlign: 'center',
    fontSize: responsiveFontSize(1.6),
    fontFamily: theme.fonts.fontBold,
    color: theme.color.subTitleLight,
  },
  mainSecText2: {
    textAlign: 'center',
    fontSize: responsiveFontSize(2.75),
    fontFamily: theme.fonts.fontBold,
    color: theme.color.subTitle,
    marginTop: responsiveHeight(1.4),
  },
  iconImg: {
    width: responsiveFontSize(10.5),
    height: responsiveFontSize(10.5),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: responsiveHeight(1.4),
  },

  statusText: {
    marginTop: responsiveHeight(1.4),
    fontSize: responsiveFontSize(1.6),
    color: theme.color.button1,
    fontFamily: theme.fonts.fontBold,
    textTransform: 'capitalize',
  },

  sectionsTitle: {
    fontSize: responsiveFontSize(1.9),
    fontFamily: theme.fonts.fontBold,
    color: theme.color.title,
    textTransform: 'uppercase',
  },
  optionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(0.2),
  },
  sectionsTitle1: {
    fontSize: responsiveFontSize(1.5),
    color: theme.color.title,
    fontFamily: theme.fonts.fontMedium,
    textTransform: 'uppercase',
  },
  sectionsTitle2: {
    fontSize: responsiveFontSize(1.5),
    color: theme.color.title,
    fontFamily: theme.fonts.fontNormal,
    textTransform: 'uppercase',
  },

  contactRiderView: {
    borderRadius: 4,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginTop: responsiveHeight(3.2),
    backgroundColor: theme.color.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    alignSelf: 'center',
    borderColor: theme.color.subTitleLight,
    borderWidth: theme.color.HEADER_BottomBorder_Width,
  },

  contacTitle: {
    fontFamily: theme.fonts.fontBold,
    fontSize: responsiveFontSize(1.75),
    color: theme.color.subTitle,
    textTransform: 'capitalize',
  },
  contacSubTitle: {
    fontFamily: theme.fonts.fontNormal,
    fontSize: responsiveFontSize(1.7),
    color: theme.color.title,
  },
  contactRow: {
    width: '22%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  phoneView: {
    width: responsiveFontSize(5),
    height: responsiveFontSize(5),
    borderRadius: responsiveFontSize(5) / 2,
    borderColor: theme.color.button1,
    borderWidth: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionsTitlenull: {
    fontSize: responsiveFontSize(1.75),
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
  },
  itemContianer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  rightContainer: {
    alignItems: 'flex-end',
    width: '60%',
  },

  helplineIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(1.8),
  },
});
