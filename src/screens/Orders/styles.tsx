import {StyleSheet} from 'react-native';
import theme from '../../theme/index';
import {
  responsiveFontSize,
  responsiveHeight,
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

  box: {
    width: '100%',
    backgroundColor: theme.color.background,
    padding: 10,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(0.3),
  },

  title: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.title,
  },

  title2: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
    textTransform: 'capitalize',
  },
});
