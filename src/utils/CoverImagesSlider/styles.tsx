import {StyleSheet} from 'react-native';
import theme from '../../theme/index';

export const styles = StyleSheet.create({
  imageConatiner: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  mask: {
    backgroundColor: theme.color.button1,
    width: '100%',
  },
  slider: {
    backgroundColor: theme.color.background,
  },

  fastImage: {
    flex: 1,
  },
});
