import {StyleSheet} from 'react-native';
import theme from '../../theme/index';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
  container2: {
    flex: 1,
    backgroundColor: theme.color.backgroundLight,
  },
  promoTouchable: {
    width: '100%',
    backgroundColor: theme.color.background,
    elevation: 3,
    padding: 10,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.title,
    textTransform: 'capitalize',
  },
  title2: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.subTitle,
    textTransform: 'capitalize',
  },
});
