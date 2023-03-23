import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import theme from '../../../theme';
import {styles} from '../styles';
import utils from '../../../utils/index';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default function DeliveryTypes({
  deliveryTypesData,
  setDeliveryTypesData,
}) {
  const onSelectType = type => {
    const arr = deliveryTypesData.map(item => ({
      ...item,
      isSel: type.toLowerCase() == item.name.toLowerCase(),
    }));
    setDeliveryTypesData(arr);
  };

  return (
    <View style={styles.typeCard}>
      <View style={styles.typeWrap}>
        <FlatList
          data={deliveryTypesData}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.typeRow}
              onPress={() => {
                onSelectType(item.name);
              }}>
              <utils.vectorIcon.MaterialIcons
                name={
                  !item.isSel
                    ? 'radio-button-unchecked'
                    : 'radio-button-checked'
                }
                color={theme.color.button1}
                size={responsiveFontSize(2.35)}
              />

              <Text style={styles.typeTitle}>
                {item.name.trim().toLowerCase() == 'delivery'
                  ? 'door step delivery'
                  : item.name.toLowerCase() == 'pickup'
                  ? 'pickup from store'
                  : item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
