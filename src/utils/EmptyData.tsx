import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import theme from '../theme/index';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

export default function EmptyData({message, screen}) {
  return (
    <View
      style={[
        styles.emptySECTION,
        {
          marginTop:
            screen == 'orders' ||
            screen == 'promo' ||
            screen == 'search' ||
            screen == 'favourite'
              ? '40%'
              : '30%',
        },
      ]}>
      {screen !== 'search' && (
        <>
          <Image
            style={styles.emptyImg}
            source={require('../assets/images/empty/img.png')}
          />
          <Text style={styles.emptyText}>Sorry!</Text>
        </>
      )}

      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptySECTION: {
    alignSelf: 'center',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImg: {
    width: responsiveWidth(14),
    height: responsiveHeight(7),
    resizeMode: 'contain',
    opacity: 0.5,
    alignSelf: 'center',
  },
  emptyText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
    textAlign: 'center',
  },
});
