import {StyleSheet} from 'react-native';
import theme from '../../theme/index';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
  searchBar: {
    backgroundColor: theme.color.backgroundLight,
  },
  searchInput: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.subTitle,
  },
});
