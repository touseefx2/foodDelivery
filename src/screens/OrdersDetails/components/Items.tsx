import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../styles';
import utils from '../../../utils';
import theme from '../../../theme';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

export default function Items({products, isShowItems, setisShowItems}) {
  const ShowItems = products => {
    const showItems = products.map((item, index, array) => {
      const ItemName = item.productName;
      const totalPrice = parseFloat(item.totalprice) || 0;
      const ItemDescription = item.productId.description || '---';
      const quantity = item.quantity;
      const variants = item.variants;

      return (
        <>
          <View
            style={[
              styles.itemContianer,
              {
                marginTop: index == 0 ? responsiveHeight(1.8) : 0,
              },
            ]}>
            <View
              style={{
                width: '77%',
              }}>
              <Text style={styles.sectionsTitle1}>
                {quantity} x {ItemName}
              </Text>
              <Text
                style={[
                  styles.sectionsTitle2,
                  {marginVertical: 2, textTransform: 'none'},
                ]}>
                {ItemDescription.trim()}
              </Text>
              {variants.length > 0 && (
                <utils.VariantSummary
                  variants={variants}
                  screen="orderDetails"
                />
              )}
            </View>
            <View
              style={{
                width: '20%',
              }}>
              <Text style={[styles.sectionsTitle1, {textAlign: 'right'}]}>
                {totalPrice.toFixed()}
              </Text>
            </View>
          </View>

          {index < array.length - 1 && (
            <View style={[styles.separator, {marginVertical: 7}]} />
          )}
        </>
      );
    });

    return showItems;
  };

  return (
    <View style={styles.mainSec}>
      <View style={{padding: 12}}>
        {products.length <= 0 && (
          <View style={styles.selectionContainer}>
            <Text style={styles.sectionsTitle}>Items</Text>
            <Text style={styles.sectionsTitlenull}>None</Text>
          </View>
        )}

        {products.length > 0 && (
          <TouchableOpacity
            onPress={() => setisShowItems(!isShowItems)}
            activeOpacity={0.5}
            style={styles.selectionContainer}>
            <Text style={styles.sectionsTitle}>Items</Text>
            <utils.vectorIcon.AntDesign
              name={!isShowItems ? 'down' : 'up'}
              color={theme.color.subTitle}
              size={responsiveFontSize(2.3)}
            />
          </TouchableOpacity>
        )}

        {products.length > 0 && isShowItems && ShowItems(products)}
      </View>
    </View>
  );
}
