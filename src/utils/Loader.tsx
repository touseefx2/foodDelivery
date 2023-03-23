import React from 'react';
import {View, Modal, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import theme from '../theme/index';

export default function Loader(props) {
  let text = props.text || '';

  return (
    <Modal animationType="fade" transparent={true} visible={props.load}>
      <View style={styles.container}>
        <View style={styles.loaderView}>
          <ActivityIndicator
            size={responsiveFontSize(6.5)}
            color={theme.color.button1}
          />
          {text != '' && <Text style={styles.text}>{text}</Text>}
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60,
  },
  loaderView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: theme.color.background,
    padding: 15,
    borderColor: theme.color.subTitleLight,
    borderWidth: theme.color.Loader_Border_Width,
  },
  text: {
    color: theme.color.title,
    marginTop: responsiveHeight(1.4),
    fontSize: responsiveFontSize(2.1),
    fontFamily: theme.fonts.fontNormal,
  },
});
