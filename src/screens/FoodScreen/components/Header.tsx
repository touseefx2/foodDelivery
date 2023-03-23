import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import theme from '../../../theme';
import {styles} from './../styles';
import utils from '../../../utils';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default function Header({goBack, isFavouriteFood, onPressHeart}) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.icon}
        activeOpacity={0.7}
        onPress={goBack}>
        <utils.vectorIcon.Ionicons
          name="ios-chevron-back-sharp"
          color={theme.color.button1}
          size={responsiveFontSize(3)}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPressHeart}
        style={styles.icon}>
        <utils.vectorIcon.AntDesign
          name={!isFavouriteFood ? 'hearto' : 'heart'}
          color={theme.color.button1}
          size={responsiveFontSize(2.5)}
        />
      </TouchableOpacity>
    </View>
  );
}
