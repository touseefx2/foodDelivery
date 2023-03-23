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

  mainSec: {
    backgroundColor: theme.color.background,
    marginBottom: responsiveHeight(0.7),
  },

  lineContainer: {
    paddingHorizontal: 12,
    paddingVertical: responsiveHeight(1.4),
  },

  sectionsTitle: {
    fontSize: responsiveFontSize(3.5),
    fontFamily: theme.fonts.fontBold,
    color: theme.color.title,
    textTransform: 'capitalize',
  },

  descriptionText: {
    fontSize: responsiveFontSize(2.1),
    color: theme.color.title,
    fontFamily: theme.fonts.fontMedium,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(0.4),
  },

  iconView: {
    width: '3%',
    justifyContent: 'center',
  },
  labelView: {
    width: '95%',
    justifyContent: 'center',
  },

  separator: {
    width: '100%',
    backgroundColor: 'silver',
    height: 0,
    alignSelf: 'center',
    marginVertical: responsiveHeight(1.4),
  },
});
