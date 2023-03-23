import theme from '../../theme';
import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
  header: {
    height: responsiveHeight(7),
  },
  title: {
    color: theme.color.title,
    fontSize: responsiveFontSize(3),
    marginTop: responsiveHeight(1.4),
    fontFamily: theme.fonts.fontNormal,
  },
  subtitle: {
    color: theme.color.subTitle,
    fontSize: responsiveFontSize(1.9),
    marginTop: responsiveHeight(1.4),
    fontFamily: theme.fonts.fontNormal,
    width: '100%',
    alignSelf: 'center',
  },

  codeContainer: {
    width: '95%',
    alignSelf: 'center',
    marginTop: responsiveHeight(5),
  },
  codeFieldRoot: {},

  cell: {
    width: responsiveWidth(12),
    height: responsiveFontSize(6),
    borderBottomWidth: 0.7,
    borderBottomColor: theme.color.subTitle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: responsiveFontSize(5),
    color: theme.color.title,
    fontFamily: theme.fonts.fontMedium,
  },
  focusCell: {
    borderColor: theme.color.button1,
  },

  Timer: {
    alignSelf: 'center',
    marginVertical: responsiveHeight(4.2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  TimerText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.title,
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
  },
  buttonText: {
    textAlign: 'center',
    color: theme.color.buttonText,
    fontSize: responsiveFontSize(2.3),
    fontFamily: theme.fonts.fontBold,
  },

  loader: {
    alignSelf: 'center',
    marginVertical: responsiveHeight(4.2),
  },
});

export default styles;
