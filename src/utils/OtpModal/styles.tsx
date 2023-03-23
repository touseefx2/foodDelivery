import theme from '../../theme/index';
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  modalCont: {
    borderRadius: 7,
    backgroundColor: theme.color.background,
    width: responsiveWidth(80),
    alignSelf: 'center',
    borderColor: theme.color.subTitleLight,
    borderWidth: theme.color.HEADER_BottomBorder_Width,
  },

  title: {
    color: theme.color.title,
    fontSize: responsiveFontSize(2.4),
    fontFamily: theme.fonts.fontMedium,
  },
  subtitle: {
    color: theme.color.title,
    fontSize: responsiveFontSize(1.8),
    marginTop: responsiveHeight(1.4),
    fontFamily: theme.fonts.fontNormal,
  },

  Header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },

  Button: {
    backgroundColor: theme.color.button1,
    borderRadius: 7,
    padding: 7,
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',

    alignItems: 'center',
    marginTop: responsiveHeight(1.4),
  },

  ButtonText: {
    color: theme.color.buttonText,
    fontSize: responsiveFontSize(2.15),
    fontFamily: theme.fonts.fontBold,
  },

  Buttonc: {
    backgroundColor: theme.color.background,
    borderRadius: 7,
    padding: 7,
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',

    alignItems: 'center',
    marginTop: responsiveHeight(1.4),
    borderWidth: 0.7,
    borderColor: theme.color.button1,
  },

  ButtonTextc: {
    color: theme.color.button1,
    fontSize: responsiveFontSize(2.15),
    fontFamily: theme.fonts.fontBold,
  },

  Timer: {
    alignSelf: 'center',
    marginTop: responsiveHeight(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerTitle: {
    color: theme.color.button1,
    fontSize: responsiveFontSize(1.8),
    fontFamily: theme.fonts.fontMedium,
  },
  codeContainer: {
    width: '100%',
    alignSelf: 'center',
    marginTop: responsiveHeight(0.7),
  },
  codeFieldRoot: {},

  cell: {
    width: responsiveWidth(10.5),
    height: responsiveFontSize(4),
    borderBottomWidth: 0.7,
    borderBottomColor: theme.color.subTitle,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(1.4),
  },
  cellText: {
    fontSize: responsiveFontSize(3),
    color: theme.color.title,
    fontFamily: theme.fonts.fontMedium,
  },
  focusCell: {
    borderColor: theme.color.button1,
  },
});

export default styles;
