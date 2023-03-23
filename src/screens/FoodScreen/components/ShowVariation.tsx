import React from 'react';
import {View, Text} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {styles} from './../styles';
import VariationDetails from './VariationDetails';

export default function ShowVariation({
  baseVariants,
  setBaseVariants,
  additionalVariants,
  setAdditionalVariants,
}) {
  const showInitialMaxItem = 4;

  const Variation = (data, checkVariationType) => {
    const showVariations = data.map((item, index) => {
      const data = item.details || [];
      const name = item.name || '----';
      const isMultiSelection = item.multi_selection || false;
      const isViewMore = item.viewmore || false;

      if (data.length > 0) {
        return (
          <View key={index}>
            <View
              style={[styles.titleSection, {marginTop: responsiveHeight(1.9)}]}>
              <View style={{width: '75%'}}>
                <Text
                  style={[
                    styles.sectionTitle1,
                    {fontSize: responsiveFontSize(2)},
                  ]}>
                  {name}
                </Text>
                <Text style={styles.sectionSubTitle1}>
                  {!isMultiSelection ? 'Select one' : 'Select multiple options'}
                </Text>
              </View>
              <View style={styles.chooseButton}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.chooseButtonText}>
                  {item.isRequired ? 'Required' : 'Optional'}
                </Text>
              </View>
            </View>

            <View style={styles.selectionContainer}>
              <VariationDetails
                data={data}
                isViewMore={isViewMore}
                VariationIndex={index}
                checkVariationType={checkVariationType}
                isMultiSelection={isMultiSelection}
                showInitialMaxItem={showInitialMaxItem}
                baseVariants={baseVariants}
                setBaseVariants={setBaseVariants}
                additionalVariants={additionalVariants}
                setAdditionalVariants={setAdditionalVariants}
              />
            </View>
          </View>
        );
      } else return null;
    });
    return showVariations;
  };

  return (
    <>
      {baseVariants.length > 0 && Variation(baseVariants, 'base')}
      {additionalVariants.length > 0 &&
        Variation(additionalVariants, 'additional')}
    </>
  );
}
