import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import utils from '../index';
import theme from '../../theme';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default function CoverImageBack({props}) {
  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.back}
        activeOpacity={0.6}
        onPress={goBack}>
        <utils.vectorIcon.Ionicons
          name="chevron-back"
          color={theme.color.button1}
          size={responsiveFontSize(3)}
        />
      </TouchableOpacity>
    </View>
  );
}
