import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import theme from '../../theme/index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
    paddingBottom: theme.window.APPBAR_HEIGHT,
  },
  main: {
    paddingHorizontal: 15,
  },
  sep: {
    height: 15,
  },
  title: {
    fontSize: responsiveFontSize(2.95),
    fontFamily: theme.fonts.fontBold,
    color: theme.color.title,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subTitle: {
    fontSize: responsiveFontSize(2),
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(0.7),
  },
  timeText: {
    fontSize: responsiveFontSize(1.9),
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
    textTransform: 'capitalize',
  },
});
