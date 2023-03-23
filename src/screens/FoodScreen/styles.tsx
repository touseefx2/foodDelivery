import {StyleSheet, Platform} from 'react-native';
import theme from '../../theme/index';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  separator: {
    width: '95%',
    alignSelf: 'center',
    height: responsiveHeight(0.2),
    backgroundColor: theme.color.subTitle,
    marginTop: responsiveHeight(1.9),
    opacity: 0.1,
  },

  header: {
    width: '100%',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top:
      Platform.OS == 'android'
        ? theme.window.STATUSBAR_HEIGHT - responsiveHeight(1.4)
        : theme.window.APPBAR_HEIGHT,
  },

  icon: {
    width: responsiveFontSize(4),
    height: responsiveFontSize(4),
    borderRadius: responsiveFontSize(4) / 2,
    backgroundColor: theme.color.background,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },

  titleSection: {
    width: '100%',
    marginTop: responsiveHeight(2.8),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  sectionTitle1: {
    fontSize: responsiveFontSize(2.4),
    fontFamily: theme.fonts.fontBold,
    color: theme.color.title,
  },

  sectionSubTitle1: {
    color: theme.color.subTitle,
    fontSize: responsiveFontSize(1.75),
    fontFamily: theme.fonts.fontMedium,
    marginTop: responsiveHeight(0.7),
  },

  sectionTitle2: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
    textAlign: 'right',
  },

  descriptionSection: {
    width: '100%',
    marginTop: responsiveHeight(1.9),
  },

  descriptionText: {
    fontSize: responsiveFontSize(1.75),
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
  },

  chooseButton: {
    paddingHorizontal: 8,
    height: responsiveHeight(2.8),
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.backgroundLight,
  },
  chooseButtonText: {
    color: theme.color.subTitle,
    fontSize: responsiveFontSize(1.4),
    fontFamily: theme.fonts.fontBold,
    textTransform: 'capitalize',
  },

  selectionContainer: {
    width: '100%',
    paddingVertical: responsiveHeight(1.9),
  },

  varaintContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsiveHeight(0.9),
  },

  variationText: {
    color: theme.color.title,
    fontSize: responsiveFontSize(1.75),
    fontFamily: theme.fonts.fontMedium,
    textTransform: 'capitalize',
  },

  box: {
    marginTop: responsiveHeight(1.9),
    width: '100%',
    paddingVertical: responsiveHeight(1.9),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 0.8,
    borderColor: theme.color.subTitleLight,
    paddingHorizontal: responsiveHeight(1.4),
  },

  boxText: {
    color: theme.color.title,
    fontSize: responsiveFontSize(1.9),
    fontFamily: theme.fonts.fontMedium,
  },

  sheetContainer: {
    backgroundColor: theme.color.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sheetIcon: {
    backgroundColor: theme.color.backgroundLight,
  },
  sheetMain: {
    paddingHorizontal: 15,
    paddingTop: responsiveHeight(2),
  },

  sheetTitle: {
    fontFamily: theme.fonts.fontBold,
    color: theme.color.title,
    fontSize: responsiveFontSize(2.65),
    marginBottom: responsiveHeight(1.4),
  },

  sheetRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: responsiveHeight(0.7),
    marginTop: responsiveHeight(1),
  },

  sheetRowText: {
    color: theme.color.title,
    fontSize: responsiveFontSize(2.05),
    fontFamily: theme.fonts.fontMedium,
  },

  sheetBottomButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.button1,
    padding: 12,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: responsiveHeight(4),
  },
  sheetbuttonTextBottom: {
    color: theme.color.buttonText,
    fontSize: responsiveFontSize(2.25),
    fontFamily: theme.fonts.fontBold,
  },

  bottomConatainer: {
    width: '100%',
    backgroundColor: theme.color.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: theme.color.Add_Item_TopBorder_Width,
    borderTopColor: theme.color.subTitleLight,
    paddingHorizontal: 15,
    paddingTop: responsiveHeight(2),
    paddingBottom:
      Platform.OS === 'ios' ? responsiveHeight(4.5) : responsiveHeight(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '100%',
  },
  bottomRowWrapper1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '35%',
  },

  buttomIcon: {
    width: responsiveFontSize(3.5),
    height: responsiveFontSize(3.5),
    borderRadius: responsiveFontSize(3.5) / 2,
    backgroundColor: theme.color.button1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttomCountText: {
    fontSize: responsiveFontSize(2.15),
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.title,
    textTransform: 'capitalize',
    textAlign: 'center',
  },

  bottomRowWrapper2: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '58%',
    borderRadius: 8,
    padding: 12,
  },

  botoomButtonText: {
    fontSize: responsiveFontSize(2.1),
    fontFamily: theme.fonts.fontBold,
    color: theme.color.buttonText,
  },
});
