import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../theme/index';
import {observer} from 'mobx-react';
import utils from '.';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default observer(StatusIndicatorOrder);
function StatusIndicatorOrder({type, data, status}) {
  if (status === 'pending') status = 'order sent';

  if (status === 'confirmed') status = 'preparing food';

  if (type === 'delivery') {
    if (status === 'picked') status = 'picked up by rider';
  } else {
    if (status === 'foodready') status = 'food is ready';
  }
  if (status == 'delivered')
    status = type === 'delivery' ? 'delivered' : 'picked up';

  const statusIndex = data.indexOf(status);

  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        const statusText = item.toLowerCase();
        const backgroundColor =
          index < statusIndex + 1
            ? theme.color.button1
            : theme.color.backgroundLight;
        const textColor =
          index < statusIndex + 1 ? theme.color.buttonText : theme.color.title;
        const lineColor =
          index < statusIndex + 1
            ? theme.color.button1
            : theme.color.backgroundLight;
        const textColor2 =
          index < statusIndex + 1
            ? theme.color.button1
            : theme.color.subTitleLight;

        return (
          <>
            {index > 0 && (
              <View
                style={[
                  {
                    backgroundColor: lineColor,
                  },
                  styles.separator,
                ]}
              />
            )}
            <View style={styles.row}>
              <View
                style={[
                  styles.indexView,
                  {
                    backgroundColor: backgroundColor,
                  },
                ]}>
                <Text
                  style={[
                    styles.indexText,
                    {
                      color: textColor,
                    },
                  ]}>
                  {index + 1}
                </Text>
              </View>

              <View style={{width: '89%'}}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[
                    styles.statusText,
                    {
                      color: textColor2,
                    },
                  ]}>
                  {utils.functions.capitalizeFirstLetterOfWord(statusText)}
                </Text>
              </View>
            </View>
          </>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: responsiveHeight(1.4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  separator: {
    width: responsiveWidth(1),
    height: responsiveHeight(5.6),
    left: responsiveFontSize(3) / 2,
  },
  indexView: {
    width: responsiveFontSize(3.25),
    height: responsiveFontSize(3.25),
    borderRadius: responsiveFontSize(3.25) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexText: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: theme.fonts.fontMedium,
  },
  statusText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: theme.fonts.fontBold,
  },
});
