import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import utils from '../../../utils/index';
import theme from '../../../theme';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import styles from '../styles';

export default function Cross({goBack, location}) {
  return (
    <View style={styles.cross}>
      {location && (
        <TouchableOpacity activeOpacity={0.6} onPress={goBack}>
          <utils.vectorIcon.Ionicons
            name="close-sharp"
            color={theme.color.subTitleLight}
            size={responsiveFontSize(3.9)}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
