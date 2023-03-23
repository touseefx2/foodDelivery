import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import theme from '../../../theme';
import utils from '../../../utils';
import {styles} from '../styles';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import RBSheet from 'react-native-raw-bottom-sheet';

export default function ProductAvailabilitySheet({
  notAvailableOptions,
  productOptions,
  selectedProductOption,
  setProductOptions,
  setSelectedProductOption,
  isEmptyVariants,
  rbSheet,
}) {
  const [heightBottomSheet, setHeightBottomSheet] = useState(0);

  const renderBottomSheet = () => {
    const onClickApply = () => {
      setSelectedProductOption(productOptions);
      rbSheet?.current?.close();
    };

    const renderApplyButton = () => {
      return (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onClickApply}
          style={styles.sheetBottomButton}>
          <Text style={styles.sheetbuttonTextBottom}>Apply</Text>
        </TouchableOpacity>
      );
    };

    return (
      <>
        <RBSheet
          ref={rbSheet}
          closeOnPressBack={true}
          openDuration={250}
          onOpen={() => setProductOptions(selectedProductOption)}
          closeOnDragDown={true}
          closeOnPressMask={true}
          KeyboardAvoidingView={true}
          customStyles={{
            wrapper: {
              flex: 1,
              backgroundColor: isEmptyVariants
                ? 'rgba(0,0,0,0.4)'
                : 'rgba(0,0,0,0.7)',
            },
            container: {
              ...styles.sheetContainer,
              height:
                heightBottomSheet <= 0
                  ? undefined
                  : heightBottomSheet + responsiveHeight(7),
            },
            draggableIcon: styles.sheetIcon,
          }}>
          <>
            <View
              onLayout={event => {
                const height = event.nativeEvent.layout.height;
                setHeightBottomSheet(height);
              }}
              style={styles.sheetMain}>
              <Text style={styles.sheetTitle}>
                If this product is not available
              </Text>

              {notAvailableOptions.length > 0 &&
                notAvailableOptions.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.7}
                      onPress={() => {
                        setProductOptions(item);
                      }}
                      style={styles.sheetRow}>
                      <View style={{width: '10%'}}>
                        <utils.vectorIcon.FontAwesome5
                          name={
                            item.toLowerCase() == productOptions.toLowerCase()
                              ? 'dot-circle'
                              : 'circle'
                          }
                          color={theme.color.button1}
                          size={responsiveFontSize(2.65)}
                        />
                      </View>
                      <View style={{width: '89%'}}>
                        <Text style={styles.sheetRowText}>{item}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}

              {renderApplyButton()}
            </View>
          </>
        </RBSheet>
      </>
    );
  };

  return (
    <>
      <View style={{marginTop: responsiveHeight(isEmptyVariants ? 5 : 1.4)}}>
        <Text
          style={[styles.sectionTitle1, {fontSize: responsiveFontSize(2.3)}]}>
          If this product is not available
        </Text>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            rbSheet?.current?.open();
          }}
          style={styles.box}>
          <View style={{width: '80%'}}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.boxText}>
              {selectedProductOption}
            </Text>
          </View>

          <View
            style={{
              width: '15%',
              alignItems: 'flex-end',
            }}>
            <utils.vectorIcon.AntDesign
              name="right"
              color={theme.color.subTitle}
              size={responsiveFontSize(2.35)}
            />
          </View>
        </TouchableOpacity>
      </View>

      {renderBottomSheet()}
    </>
  );
}
