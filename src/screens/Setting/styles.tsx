import {StyleSheet, Platform} from 'react-native';
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

  section1: {
    marginTop: responsiveHeight(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  imageView: {
    width: responsiveFontSize(12),
    height: responsiveFontSize(12),
    borderRadius: responsiveFontSize(12 / 2),
    borderWidth: 0.5,
    borderColor: theme.color.subTitleLight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.background,
  },
  image: {
    width: responsiveFontSize(11.9),
    height: responsiveFontSize(11.9),
    borderRadius: responsiveFontSize(11.9 / 2),
    resizeMode: 'cover',
  },
  nameTitle: {
    fontSize: responsiveFontSize(2.6),
    color: theme.color.subTitle,
    fontFamily: theme.fonts.fontBold,
    textTransform: 'capitalize',
  },
  phoneTitle: {
    fontSize: responsiveFontSize(2.1),
    color: theme.color.subTitleLight,
    fontFamily: theme.fonts.fontMedium,
  },

  sectionTitle: {
    fontSize: responsiveFontSize(2.7),
    color: theme.color.subTitle,
    fontFamily: theme.fonts.fontBold,
  },

  section2: {
    marginTop: responsiveHeight(4.8),
    paddingHorizontal: 12,
    marginBottom: responsiveHeight(2.8),
  },

  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },

  row90Percent: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: responsiveFontSize(2),
    color: theme.color.title,
    fontFamily: theme.fonts.fontMedium,
    width: '89%',
  },
  separator: {
    width: '100%',
    backgroundColor: 'silver',
    height: responsiveHeight(0.1),
    marginVertical: responsiveHeight(2.1),
    alignSelf: 'center',
  },

  section3: {
    marginTop: responsiveHeight(1.4),
    paddingHorizontal: 12,
    marginBottom: responsiveHeight(2.8),
  },
});
