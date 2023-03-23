import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import theme from '../../theme/index';

export const styles = StyleSheet.create({
  BottomButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.button1,
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonTextBottom: {
    color: theme.color.buttonText,
    fontSize: responsiveFontSize(2.05),
    fontFamily: theme.fonts.fontBold,
  },

  BottomButton2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: theme.color.background,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.color.button1,
  },

  titleText2: {
    fontSize: responsiveFontSize(1.85),
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
    alignSelf: 'center',
    marginVertical: 10,
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
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  sheetDragIcon: {
    backgroundColor: theme.color.backgroundLight,
  },
  sheetMainConatiner: {paddingTop: responsiveHeight(1.9)},
  sheetTitle: {
    fontFamily: theme.fonts.fontBold,
    color: theme.color.title,
    fontSize: responsiveFontSize(2.5),
  },
  sheetBottom: {
    marginTop: responsiveHeight(4.2),
  },
});
