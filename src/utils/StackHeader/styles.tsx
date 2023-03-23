import theme from '../../theme/index';
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: responsiveHeight(7),
  },
  header1: {
    backgroundColor: theme.color.background,
    marginBottom: responsiveHeight(0.7),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 2,
    elevation: 7,
    borderBottomColor: theme.color.subTitleLight,
    borderBottomWidth: theme.color.HEADER_BottomBorder_Width,
  },
  back: {
    width: '10%',
    justifyContent: 'center',
  },
  titleContainer: {
    width: '88%',
    justifyContent: 'center',
  },
  title: {
    fontSize: responsiveFontSize(2.7),
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.title,
    textTransform: 'capitalize',
  },
});

export default styles;
