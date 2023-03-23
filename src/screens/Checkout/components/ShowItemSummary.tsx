import React from 'react';
import {View, Text} from 'react-native';
import theme from '../../../theme';
import {styles} from '../styles';
import utils from '../../../utils';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

export default function ShowItemSummary({
  cart,
  subtotal,
  isPromoApply,
  discountPrice,
  taxPercentage,
  deliveryType,
  deliveryCharges,
  taxPrice,
}) {
  const itemSummary = cart.data.map((item, index, arr) => {
    const ItemName = item.productName || '';
    const totalPrice = parseFloat(item.bill) || 0;
    const ItemDesc = item.description || '---';
    const quantity = item.quantity;
    const variants = item.variants;

    return (
      <>
        <View
          style={[
            styles.summaryRow,
            index == 0 && {marginTop: responsiveHeight(1.4)},
          ]}>
          <View style={{width: '77%'}}>
            <Text style={styles.summaryTitle}>
              {quantity} x{'  '} {ItemName}
            </Text>
            <Text style={styles.summarySubTitle}>{ItemDesc}</Text>
            {variants.length > 0 && (
              <utils.VariantSummary
                variants={variants}
                screen="showitemsummary"
              />
            )}
          </View>
          <View style={{width: '20%'}}>
            <Text style={[styles.summaryTitle, {textAlign: 'right'}]}>
              {totalPrice.toFixed()}
            </Text>
          </View>
        </View>

        {index < arr.length - 1 && <View style={styles.summaryItemSep} />}
        {index == arr.length - 1 && <View style={styles.summarySep} />}
        {index == arr.length - 1 && (
          <>
            <View style={styles.calcuationWrapper}>
              <View style={{width: '35%'}}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[
                    styles.summaryTitle,
                    {fontSize: responsiveFontSize(1.75)},
                  ]}>
                  Subtotal
                </Text>
              </View>
              <View style={{width: '60%'}}>
                <Text
                  style={[
                    styles.summaryTitle,
                    {textAlign: 'right', fontSize: responsiveFontSize(1.65)},
                  ]}>
                  Rs. {subtotal}
                </Text>
              </View>
            </View>
            {isPromoApply && (
              <View style={styles.summaryRow}>
                <View style={{width: '35%'}}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.summaryTitle}>
                    promo discount
                  </Text>
                </View>
                <View style={{width: '60%'}}>
                  <Text style={[styles.summaryTitle, {textAlign: 'right'}]}>
                    - Rs. {discountPrice}
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.summaryRow}>
              <View style={{width: '35%'}}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.summaryTitle}>
                  Tax ({taxPercentage}%)
                </Text>
              </View>
              <View style={{width: '60%'}}>
                <Text style={[styles.summaryTitle, {textAlign: 'right'}]}>
                  Rs. {taxPrice}
                </Text>
              </View>
            </View>
            {deliveryType.name == 'delivery' && (
              <View style={styles.summaryRow}>
                <View style={{width: '35%'}}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.summaryTitle}>
                    Delivery Charges
                  </Text>
                </View>
                <View style={{width: '60%'}}>
                  <Text style={[styles.summaryTitle, {textAlign: 'right'}]}>
                    Rs. {deliveryCharges}
                  </Text>
                </View>
              </View>
            )}
          </>
        )}
      </>
    );
  });

  return itemSummary;
}
