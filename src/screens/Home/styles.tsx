import {StyleSheet, Platform} from 'react-native';
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
    paddingBottom: Platform.OS === 'ios' ? responsiveHeight(3) : 0,
  },
  headerContainer: {
    position: 'absolute',
    width: '100%',
  },
  header: {
    width: '100%',
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerRightSection: {
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title1: {
    fontSize: 13,
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.subTitle,
    marginRight: 5,
  },
  title2: {
    fontSize: 15,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.title,

    textTransform: 'capitalize',
  },
  icon: {
    width: responsiveFontSize(4),
    height: responsiveFontSize(4),
    borderRadius: responsiveFontSize(4) / 2,
    backgroundColor: theme.color.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageGif: {
    width: responsiveWidth(100),
    height: responsiveHeight(22),
    resizeMode: 'cover',
  },
  emptyLoader: {
    alignSelf: 'center',
    position: 'absolute',
    top: '60%',
  },

  image: {
    flex: 1,
    resizeMode: 'stretch',
  },

  BottomButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.button1,
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  buttonTextBottom: {
    color: theme.color.buttonText,
    fontSize: 16,
    fontFamily: theme.fonts.fontBold,
  },
  LinearGradient: {
    height: '100%',
    width: '100%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BottomButton2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: theme.color.background,
    borderRadius: 10,
    alignSelf: 'center',
    elevation: 0,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.color.button1,
  },
  LinearGradient2: {
    height: '100%',
    width: '100%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleText2: {
    fontSize: 14,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
    alignSelf: 'center',
    marginVertical: 10,
  },
  titleText3: {
    fontSize: 14,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
    alignSelf: 'center',
  },
  tabViewContainer: {
    backgroundColor: theme.color.background,
    overflow: 'hidden',
  },
  tabViewHeaderTextTitle: {
    color: theme.color.title,
    fontFamily: theme.fonts.fontMedium,
    fontSize: responsiveFontSize(1.8),
  },
  toast: {
    backgroundColor: theme.color.button1,
  },
  sheetWraper: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: theme.color.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sheetDragIcon: {
    backgroundColor: theme.color.backgroundLight,
  },
  sheetMainConatiner: {
    marginHorizontal: 15,
  },
  sheetTitle: {
    fontFamily: theme.fonts.fontBold,
    color: theme.color.title,
    fontSize: 18,
  },
  sheetBottom: {
    marginTop: 30,
  },
  line: {
    width: 1,
    height: '60%',
    backgroundColor: theme.color.subTitle,
    marginHorizontal: 12,
  },
  titleContainer: {
    paddingHorizontal: 12,
    marginTop: responsiveHeight(1.4),
    marginBottom: responsiveHeight(0.7),
  },
  titleSection1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: responsiveFontSize(2.3),
    fontFamily: theme.fonts.fontBold,
    color: theme.color.title,
  },
  mainTitle2Container: {
    width: '22%',
  },
  mainTitle2: {
    fontSize: responsiveFontSize(1.65),
    fontFamily: theme.fonts.fontBold,
    color: theme.color.button1,
    textAlign: 'right',
  },

  titleSection2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(1.1),
  },
  mainSubtitle: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: theme.fonts.fontBold,
    color: theme.color.subTitle,
  },
});
