import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import theme from '../../theme/index';

const styles = StyleSheet.create({
  foodCard: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: responsiveHeight(13.8),
  },
  foodCardTxtConatiner: {
    width: '65%',
    height: '100%',
  },
  foodCardImgConatiner: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: theme.color.background,
    borderRadius: 8,
  },
  foodCardImg: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  ImageLoader: {
    height: '30%',
    width: '30%',
    resizeMode: 'contain',
  },
  foodCardTitle1: {
    fontSize: responsiveFontSize(2),
    fontFamily: theme.fonts.fontBold,
    color: theme.color.subTitle,
  },
  foodCardTitle2: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.subTitle,
    marginTop: responsiveHeight(0.2),
  },
  foodCardTitle3: {
    fontSize: responsiveFontSize(1.75),
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
  },
  foodCardTitle3cztmz: {
    fontSize: 10,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.button1,
  },
  fcBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  addcart: {
    width: '70%',
  },
  addcart2Container: {
    width: '50%',
    height: responsiveHeight(3.3),
    borderRadius: 7,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likecart: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  circleNum: {
    borderColor: theme.color.background,
    width: responsiveFontSize(2.7),
    height: responsiveFontSize(2.7),
    borderRadius: responsiveFontSize(2.7) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -2,
    top: -2,
    backgroundColor: theme.color.button1,
    elevation: 3,
  },
  circleNumText: {
    fontSize: responsiveFontSize(1.3),
    color: theme.color.buttonText,
    fontFamily: theme.fonts.fontBold,
  },
  separator: {
    width: '100%',
    alignSelf: 'center',
    height: responsiveHeight(0.25),
    backgroundColor: theme.color.subTitle,
    top: responsiveHeight(1.7),
    opacity: 0.1,
  },
  foodSheetWraper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  foodContainerStyle: {
    height: responsiveHeight(75),
    width: '100%',
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: theme.color.background,
    overFlow: 'hidden',
  },
  foodContainerStyle2: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
});

export default styles;
