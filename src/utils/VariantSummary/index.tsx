import React from 'react';
import {View, Text} from 'react-native';
import theme from '../../theme';
import styles from './styles';
import utils from '../../utils';

export default function VariantSummary({variants, screen}) {
  let finalArr = [];
  const valueArr = variants.map(item => {
    return item.variant;
  });
  const uniqueArray = valueArr.filter(function (item, position) {
    return valueArr.indexOf(item) == position;
  });
  uniqueArray.map(element => {
    let value = '';
    if (variants.length > 0) {
      variants.filter(function (item) {
        const name = screen == 'orderDetails' ? item.value : item.name;
        if (item.variant.toLowerCase() === element.toLowerCase())
          value = value + name + ', ';
      });
    }
    finalArr.push({variant: element, value: value.replace(/,\s*$/, '')});
  });

  const variantSummary = finalArr.map(item => {
    const baseVariant = item.variant;
    const value = utils.functions.capitalizeFirstLetterOfWord(
      item.value.trim(),
    );
    return (
      <View style={styles.variantSummaryContainer}>
        <Text style={[styles.variantSummaryTitle]}>
          {baseVariant}:{' '}
          <Text
            style={[
              styles.variantSummaryTitle,
              {color: theme.color.subTitleLight},
            ]}>
            {value}
          </Text>
        </Text>
      </View>
    );
  });

  return variantSummary;
}
