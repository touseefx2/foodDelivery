import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../styles';
import utils from '../../../utils';
import theme from '../../../theme';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

export default function Promo({
  setisShowPromo,
  isShowPromo,
  promoCode,
  promoDiscountAmount,
  promoDiscountPercentage,
}) {
  return (
    <View style={styles.mainSec}>
      <View style={{padding: 12}}>
        <TouchableOpacity
          onPress={() => setisShowPromo(!isShowPromo)}
          activeOpacity={0.5}
          style={styles.selectionContainer}>
          <Text style={styles.sectionsTitle}>Promo</Text>
          <utils.vectorIcon.AntDesign
            name={!isShowPromo ? 'down' : 'up'}
            color={theme.color.subTitle}
            size={responsiveFontSize(2.3)}
          />
        </TouchableOpacity>
        {isShowPromo && (
          <View>
            <View
              style={[
                styles.itemContianer,
                {
                  marginTop: responsiveHeight(1.8),
                },
              ]}>
              <Text style={styles.sectionsTitle1}>code</Text>

              <View style={styles.rightContainer}>
                <Text style={styles.sectionsTitle2}>{promoCode}</Text>
              </View>
            </View>

            <View style={styles.itemContianer}>
              <Text style={styles.sectionsTitle1}>discount</Text>

              <View style={styles.rightContainer}>
                <Text style={styles.sectionsTitle2}>
                  {promoDiscountPercentage} %
                </Text>
              </View>
            </View>

            <View style={styles.itemContianer}>
              <Text style={styles.sectionsTitle1}>Amount</Text>

              <View style={styles.rightContainer}>
                <Text style={styles.sectionsTitle2}>
                  Rs. {promoDiscountAmount}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
