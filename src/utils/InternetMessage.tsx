import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import theme from '../theme/index';

export default function InternetMessage(props) {
  const color = props.color || theme.color.button1;

  return (
    <View style={[styles.errorView, {backgroundColor: color}]}>
      <Text style={styles.error}>No internet connection</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorView: {
    padding: 2,
  },
  error: {
    alignSelf: 'center',
    color: theme.color.buttonText,
    fontSize: responsiveFontSize(1.8),
    fontFamily: theme.fonts.fontBold,
  },
});
