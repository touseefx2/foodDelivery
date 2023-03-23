import theme from '../../theme/index';
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  variantSummaryContainer: {
    marginTop: responsiveHeight(0.3),
    width: '95%',
  },
  variantSummaryTitle: {
    textTransform: 'capitalize',
    fontFamily: theme.fonts.fontBold,
    fontSize: responsiveFontSize(1.4),
    color: theme.color.title,
  },
});

export default styles;
