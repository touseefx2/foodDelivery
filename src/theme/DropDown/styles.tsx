import {Platform, StyleSheet} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import theme from '../../theme';

const bordercolor = theme.color.subTitleLight;
const paddingHorizontal = 15;

export const styles = StyleSheet.create({
  Container: {
    width: '100%',
    borderColor: bordercolor,
    borderWidth: 0.7,
    alignSelf: 'center',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.color.background,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  searchBarContainer: {
    width: '100%',
    borderBottomWidth: 0.7,
    borderColor: bordercolor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: paddingHorizontal,
    paddingVertical: Platform.OS == 'ios' ? 12 : 0,
  },
  rowContainer: {
    width: '90%',
    paddingVertical: 13,
    paddingHorizontal: paddingHorizontal,
  },

  Text: {
    color: theme.color.title,
    fontSize: responsiveFontSize(1.85),
    fontFamily: theme.fonts.fontNormal,
    textTransform: 'capitalize',
  },

  emptyText: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: responsiveFontSize(1.75),
    color: theme.color.title,
    fontFamily: theme.fonts.fontMedium,
    opacity: 0.4,
    marginVertical: 15,
  },
  separator: {
    height: 0.7,
    backgroundColor: bordercolor,
    width: '100%',
  },
});
