import {Platform, StyleSheet} from 'react-native';
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

  header: {
    width: '100%',
    backgroundColor: theme.color.background,
    paddingVertical: responsiveHeight(1.4),
    marginBottom: responsiveHeight(0.7),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 2,
    elevation: 7,
    borderBottomColor: theme.color.subTitleLight,
    borderBottomWidth: theme.color.HEADER_BottomBorder_Width,
  },
  header1: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  headetTitle: {
    fontSize: responsiveFontSize(2.15),
    fontFamily: theme.fonts.fontBold,
    color: theme.color.title,
    textAlign: 'center',
    textTransform: 'capitalize',
  },

  mainDeliveryBox: {
    backgroundColor: theme.color.background,
    marginVertical: responsiveHeight(1.4),
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderColor: theme.color.subTitleLight,
    borderWidth: theme.color.HEADER_BottomBorder_Width,
  },

  deliveryBoxImg: {
    width: responsiveFontSize(6.8),
    height: responsiveFontSize(6.8),
  },

  deliveryBoxTitle1: {
    fontFamily: theme.fonts.fontBold,
    fontSize: responsiveFontSize(1.65),
    color: theme.color.subTitleLight,
  },

  deliveryBoxTitle2: {
    fontFamily: theme.fonts.fontBold,
    fontSize: responsiveFontSize(1.85),
    color: theme.color.title,
    marginTop: responsiveHeight(0.4),
  },

  cartItemMainSec: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: responsiveHeight(1.4),
  },

  cartItemsCard: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },

  cartImgConatiner: {
    width: responsiveFontSize(10.5),
    height: responsiveFontSize(10.5),
    backgroundColor: theme.color.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  cartImg: {
    width: responsiveFontSize(10.5),
    height: responsiveFontSize(10.5),
    borderRadius: 8,
    resizeMode: 'cover',
  },

  cartImageLoader: {
    height: '30%',
    width: '30%',
    resizeMode: 'contain',
  },

  itemTitle: {
    fontFamily: theme.fonts.fontBold,
    fontSize: responsiveFontSize(1.65),
    color: theme.color.title,
  },

  itemBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(1),
  },

  itemBottomWraper1: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemNum: {
    width: '30%',
  },

  numTitle: {
    fontSize: responsiveFontSize(1.65),
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.title,
    textAlign: 'center',
  },

  itemBottomWraper2: {
    width: '45%',
  },

  itemSeparator: {
    width: '100%',
    backgroundColor: theme.color.subTitleLight,
    height: responsiveHeight(0.1),
    marginVertical: responsiveHeight(1.9),
    alignSelf: 'center',
    opacity: 0.3,
  },

  moreText: {
    fontFamily: theme.fonts.fontBold,
    fontSize: responsiveFontSize(1.75),
    color: theme.color.button1,
    marginLeft: 5,
  },

  mainSec: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: responsiveHeight(1.4),
  },

  mainWrap1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  mainWrapTitle: {
    fontSize: responsiveFontSize(2.15),
    fontFamily: theme.fonts.fontBold,
    color: theme.color.subTitle,
    textTransform: 'capitalize',
  },

  mainWrap2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(0.7),
  },

  mainWrapTitle2: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: theme.fonts.fontBold,
    color: theme.color.subTitle,
    textTransform: 'capitalize',
  },

  typeCard: {
    width: '100%',
    backgroundColor: theme.color.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: responsiveHeight(1.6),
    marginBottom: responsiveHeight(0.2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 8,
    borderTopColor: theme.color.subTitleLight,
    borderTopWidth: theme.color.Checkout_FooterType_TopBorder_Width,
  },
  typeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    flexShrink: 1,
    flexWrap: 'wrap',
  },

  typeRow: {
    flexDirection: 'row',
    marginBottom: responsiveHeight(1.4),
    width: '46%',
  },

  typeTitle: {
    fontSize: responsiveFontSize(1.75),
    fontFamily: theme.fonts.fontBold,
    color: theme.color.subTitle,
    textTransform: 'capitalize',
    marginLeft: 7,
  },

  BottomContainer: {
    width: '100%',
    backgroundColor: theme.color.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsiveHeight(1.8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 12,
    borderTopColor: theme.color.subTitleLight,
    borderTopWidth: theme.color.Checkout_FooterCart_TopBorder_Width,
  },
  BottomContainerWrapper1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginBottom: responsiveHeight(1),
  },

  BottomContainerTitle: {
    fontSize: responsiveFontSize(2.15),
    fontFamily: theme.fonts.fontBold,
    color: theme.color.subTitle,
    textTransform: 'capitalize',
  },
  BottomContainerTitle2: {
    fontSize: responsiveFontSize(1.5),
    fontFamily: theme.fonts.fontBold,
    color: theme.color.subTitleLight,
    textTransform: 'capitalize',
  },

  bottomButton: {
    padding: 12,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: theme.color.button1,
    borderRadius: 10,
  },

  bottomButtonText: {
    fontSize: responsiveFontSize(2),
    color: theme.color.buttonText,
    fontFamily: theme.fonts.fontBold,
  },

  pickupModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickupContainer: {
    borderRadius: 15,
    backgroundColor: theme.color.background,
    padding: 15,
    alignSelf: 'center',
    borderColor: theme.color.subTitleLight,
    borderWidth: theme.color.HEADER_BottomBorder_Width + 0.5,
    width: '80%',
  },
  pickupTitle: {
    color: theme.color.title,
    fontSize: responsiveFontSize(2.4),
    fontFamily: theme.fonts.fontBold,
  },
  pickupSubTitle: {
    color: theme.color.subTitle,
    fontSize: responsiveFontSize(2.03),
    width: '95%',
    fontFamily: theme.fonts.fontNormal,
    marginTop: responsiveHeight(3),
  },
  pickupBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(3),
  },

  pickupButton: {
    width: '45%',
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.color.button1,
    backgroundColor: theme.color.background,
    borderWidth: 0.7,
  },

  pickupButtonText: {
    color: theme.color.button1,
    fontSize: responsiveFontSize(2),
    fontFamily: theme.fonts.fontBold,
  },

  mainSeccDelivery: {
    backgroundColor: theme.color.background,
    marginVertical: responsiveHeight(1.4),
    width: '90%',
    alignSelf: 'center',
    padding: responsiveHeight(1.4),
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderColor: theme.color.subTitleLight,
    borderWidth: theme.color.HEADER_BottomBorder_Width,
  },

  sectionsTitle: {
    fontSize: responsiveFontSize(2.15),
    fontFamily: theme.fonts.fontBold,
    color: theme.color.subTitle,
    textTransform: 'capitalize',
  },

  sectionsMediumTitle: {
    marginTop: responsiveHeight(1.4),
    fontSize: responsiveFontSize(1.9),
    color: theme.color.subTitle,
    fontFamily: theme.fonts.fontBold,
    textTransform: 'capitalize',
  },

  sectionsSubTitle: {
    fontSize: responsiveFontSize(1.6),
    color: theme.color.subTitle,
    fontFamily: theme.fonts.fontMedium,
    textTransform: 'capitalize',
    marginTop: responsiveHeight(0.7),
  },

  deliveryInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(1.9),
  },
  deliverButtonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: theme.color.button1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mapimg: {
    width: '100%',
    height: responsiveHeight(12),
    marginTop: responsiveHeight(1.4),
    borderRadius: 8,
  },

  mapPin: {
    position: 'absolute',
    top: responsiveHeight(5.8),
    right: responsiveHeight(12),
  },

  navigate: {
    position: 'absolute',
    bottom: responsiveHeight(0.7),
    right: responsiveHeight(0.7),
  },

  inputConatiner: {
    borderColor: theme.color.subTitleLight,
    marginTop: responsiveHeight(0.7),
    borderRadius: 4,
    fontSize: responsiveFontSize(1.6),
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
    paddingHorizontal: 7,
    width: '100%',
    borderBottomWidth: 0.5,
    backgroundColor: theme.color.background,
  },
  mobileInput: {
    width: '71%',
    color: theme.color.subTitle,
    fontSize: responsiveFontSize(1.6),
    fontFamily: theme.fonts.fontMedium,
    backgroundColor: theme.color.background,
  },

  CountryLogo: {
    height: responsiveHeight(6.2),
    width: responsiveWidth(7.8),
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },

  promoConatiner: {
    marginTop: responsiveHeight(1.4),
  },

  promoInputConatiner: {
    width: '75%',
    paddingHorizontal: 7,
    backgroundColor: theme.color.background,
    color: theme.color.subTitle,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: theme.color.subTitleLight,
    fontSize: responsiveFontSize(1.6),
    fontFamily: theme.fonts.fontMedium,
  },

  promoButtom: {
    width: '22%',
    alignItems: 'flex-end',
  },

  promoButtonConatiner: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  promoApplyWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  promoRemoveText: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: theme.fonts.fontBold,
    color: theme.color.button1,
    textTransform: 'capitalize',
    textAlign: 'right',
  },

  sectionsSubTitle2: {
    fontSize: responsiveFontSize(1.6),
    color: theme.color.title,
    fontFamily: theme.fonts.fontMedium,
    textTransform: 'capitalize',
    textAlign: 'right',
  },

  summaryRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },

  summaryTitle: {
    fontFamily: theme.fonts.fontBold,
    fontSize: responsiveFontSize(1.6),
    color: theme.color.subTitle,
    textTransform: 'capitalize',
  },
  summarySubTitle: {
    fontFamily: theme.fonts.fontNormal,
    fontSize: responsiveFontSize(1.5),
    color: theme.color.subTitle,
  },

  summaryItemSep: {
    width: '100%',
    backgroundColor: theme.color.subTitleLight,
    height: 0,
    marginVertical: responsiveHeight(0.7),
    alignSelf: 'center',
  },
  summarySep: {
    width: '100%',
    backgroundColor: theme.color.subTitleLight,
    height: 0.6,
    marginVertical: responsiveHeight(1.9),
    alignSelf: 'center',
    opacity: 0.4,
  },

  calcuationWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  instructionInput: {
    marginTop: responsiveHeight(1.4),
    backgroundColor: theme.color.background,
    fontSize: responsiveFontSize(1.75),
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.subTitle,
  },
});
