import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../theme/index';

import {observer} from 'mobx-react';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

export default observer(StatusIndicatorCheckout);
function StatusIndicatorCheckout(props) {
  const data = props.data;
  const status = props.status.toLowerCase();
  let statusIndex = data.indexOf(status);

  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        const statusText = item.toLowerCase().trim();
        const backgroundColor =
          index <= statusIndex
            ? theme.color.button1
            : theme.color.backgroundLight;
        const textColor =
          index <= statusIndex ? theme.color.buttonText : theme.color.title;
        const lineColor =
          index <= statusIndex
            ? theme.color.button1
            : theme.color.backgroundLight;
        const textColor2 =
          index <= statusIndex + 1
            ? theme.color.subTitle
            : theme.color.subTitleLight;
        return (
          <View style={styles.view1}>
            <View
              style={[
                styles.separator,
                {
                  backgroundColor:
                    index == statusIndex + 1 ? theme.color.button1 : lineColor,
                },
              ]}
            />

            <View
              style={[
                styles.view2,
                {
                  backgroundColor:
                    index == statusIndex + 1
                      ? theme.color.button1
                      : backgroundColor,
                },
              ]}>
              <Text
                style={[
                  styles.indexText,
                  {
                    color:
                      index == statusIndex + 1
                        ? theme.color.buttonText
                        : textColor,
                  },
                ]}>
                {index + 1}
              </Text>
            </View>
            <Text style={[styles.text, {color: textColor2}]}>{statusText}</Text>

            <View
              style={[
                styles.separator1,
                {
                  backgroundColor: lineColor,
                },
              ]}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    marginTop: responsiveHeight(1.4),
  },
  view1: {
    width: '33.5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view2: {
    width: responsiveFontSize(2.75),
    height: responsiveFontSize(2.75),
    borderRadius: responsiveFontSize(2.75 / 2),
    marginBottom: responsiveHeight(0.7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    width: '43%',
    height: responsiveHeight(0.5),
    position: 'absolute',
    right: '56%',
    bottom: '70%',
  },
  indexText: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: theme.fonts.fontBold,
  },
  text: {
    fontSize: responsiveFontSize(1.4),
    fontFamily: theme.fonts.fontBold,
    textTransform: 'capitalize',
  },
  separator1: {
    width: '43%',
    height: responsiveHeight(0.5),
    position: 'absolute',
    left: '58%',
    bottom: '70%',
  },
});
