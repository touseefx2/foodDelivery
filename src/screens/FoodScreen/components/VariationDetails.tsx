import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../styles';
import utils from '../../../utils';
import theme from '../../../theme';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

export default function VariationDetails({
  data,
  isViewMore,
  VariationIndex,
  checkVariationType,
  isMultiSelection,
  showInitialMaxItem,
  baseVariants,
  setBaseVariants,
  additionalVariants,
  setAdditionalVariants,
}) {
  const onSelectItem = (selectedIndex, isSelected) => {
    let data;
    if (checkVariationType === 'base') data = [...baseVariants];
    else data = [...additionalVariants];
    const variationDetails = data[VariationIndex].details;
    const selectedDetail = variationDetails[selectedIndex];
    if (!isMultiSelection) {
      variationDetails.forEach((item, index) => {
        item.isSel = index === selectedIndex;
      });
    } else selectedDetail.isSel = !isSelected;

    if (checkVariationType === 'base') setBaseVariants(data);
    else setAdditionalVariants(data);
  };

  const onSelectViewMore = () => {
    if (checkVariationType == 'base') {
      const data = baseVariants.slice();
      data[VariationIndex].viewmore = true;
      setBaseVariants(data);
    } else {
      const data = additionalVariants.slice();
      data[VariationIndex].viewmore = true;
      setAdditionalVariants(data);
    }
  };

  const details = data.map((item, index, arr) => {
    const price = parseFloat(item.price) || 0;
    const priceText = price > 0 ? `Rs. ${price}` : 'Free';
    const isSelected = item?.isSel || false;

    if (index > showInitialMaxItem + 1 && !isViewMore) return null;
    else {
      return (
        <>
          {(index <= showInitialMaxItem ||
            (index > showInitialMaxItem && isViewMore)) && (
            <>
              <TouchableOpacity
                key={index}
                activeOpacity={0.5}
                style={[
                  styles.varaintContainer,
                  {
                    marginBottom:
                      index < arr.length - 1 ? responsiveHeight(0.7) : 0,
                  },
                ]}
                onPress={() => onSelectItem(index, isSelected)}>
                {!isMultiSelection && (
                  <utils.vectorIcon.FontAwesome
                    name={!isSelected ? 'circle-thin' : 'circle-o'}
                    size={responsiveFontSize(2.5)}
                    color={
                      !isSelected ? theme.color.subTitle : theme.color.button1
                    }
                  />
                )}

                {isMultiSelection && (
                  <utils.vectorIcon.Fontisto
                    name={!isSelected ? 'checkbox-passive' : 'checkbox-active'}
                    size={responsiveFontSize(2)}
                    color={
                      !isSelected ? theme.color.subTitle : theme.color.button1
                    }
                  />
                )}

                <View style={{width: '58%'}}>
                  <Text style={styles.variationText}>
                    {item?.name || '---'}
                  </Text>
                </View>

                <View style={{width: '30%'}}>
                  <Text style={[styles.variationText, {textAlign: 'right'}]}>
                    {priceText}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}

          {index > showInitialMaxItem && !isViewMore && (
            <>
              <TouchableOpacity
                key={index}
                activeOpacity={0.5}
                style={[
                  styles.varaintContainer,
                  {
                    marginBottom:
                      index < arr.length - 1 ? responsiveHeight(2.8) : 0,
                  },
                ]}
                onPress={onSelectViewMore}>
                <utils.vectorIcon.AntDesign
                  name={'down'}
                  size={responsiveFontSize(2.35)}
                  color={theme.color.button1}
                />

                <View style={{width: '58%'}}>
                  <Text
                    style={[
                      styles.variationText,
                      {color: theme.color.button1, textTransform: 'none'},
                    ]}>
                    View more ({arr.length - (showInitialMaxItem + 1)})
                  </Text>
                </View>

                <View
                  style={{
                    width: '30%',
                  }}
                />
              </TouchableOpacity>
            </>
          )}
        </>
      );
    }
  });

  return details;
}
