import React from 'react';
import {View, Text} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {styles} from '../styles';

export default function Calculation({
  subTotal,
  promoCode,
  promoDiscountAmount,
  taxPercentage,
  taxPrice,
  deliveryCharges,
  finalBill,
}) {
  return (
    <View style={styles.mainSec}>
      <View style={{padding: 12}}>
        <View style={styles.itemContianer}>
          <Text style={styles.sectionsTitle}>Subtotal</Text>
          <View
            style={{
              alignItems: 'flex-end',
              width: '60%',
            }}>
            <Text style={styles.sectionsTitle}>{subTotal}</Text>
          </View>
        </View>
        <View style={{marginTop: responsiveHeight(1.8)}} />
        {promoCode != '' && (
          <View style={styles.itemContianer}>
            <Text style={styles.sectionsTitle1}>promo discount</Text>
            <View style={styles.rightContainer}>
              <Text style={styles.sectionsTitle2}>- {promoDiscountAmount}</Text>
            </View>
          </View>
        )}
        <View style={styles.itemContianer}>
          <Text style={styles.sectionsTitle1}>Tax ({taxPercentage}%)</Text>
          <View style={styles.rightContainer}>
            <Text style={styles.sectionsTitle2}>{taxPrice}</Text>
          </View>
        </View>

        {deliveryCharges > 0 && (
          <View style={styles.itemContianer}>
            <Text style={styles.sectionsTitle1}>Delivery charges</Text>
            <View style={styles.rightContainer}>
              <Text style={styles.sectionsTitle2}>{deliveryCharges}</Text>
            </View>
          </View>
        )}
        <View style={styles.itemContianer}>
          <Text style={styles.sectionsTitle1}>Total (inc. Tax)</Text>
          <View style={styles.rightContainer}>
            <Text style={styles.sectionsTitle2}>{finalBill}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
