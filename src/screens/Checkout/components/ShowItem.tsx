import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import utils from '../../../utils';
import theme from '../../../theme';
import {styles} from '../styles';
import ProgressiveFastImage from '@freakycoder/react-native-progressive-fast-image';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

export default function ShowItem({
  cart,
  imgLoader,
  updateSpecificObjectInCart,
}) {
  const renderItem = cart.data.map((item, index) => {
    const itemName = item.productName;
    const totalPrice = item.bill;
    const itemDescription = item.description;
    const quantity = item.quantity;
    const variants = item.variants;
    const imageSrc =
      item?.image != ''
        ? {uri: item.image}
        : require('../../../assets/images/burger/img.jpeg');

    return (
      <>
        <View style={styles.cartItemsCard}>
          <View style={styles.cartImgConatiner}>
            <ProgressiveFastImage
              source={imageSrc}
              style={styles.cartImg}
              loadingSource={imgLoader}
              loadingImageStyle={styles.cartImageLoader}
              thumbnailSource={require('../../../assets/images/imgLoad/img.jpeg')}
            />
          </View>

          <View style={{width: '70%'}}>
            <Text style={styles.itemTitle}>{itemName}</Text>

            <Text
              style={[
                styles.itemTitle,
                {
                  color: theme.color.subTitleLight,
                  marginTop: responsiveHeight(0.3),
                },
              ]}>
              {itemDescription}
            </Text>
            {variants.length > 0 && (
              <utils.VariantSummary variants={variants} screen="showitem" />
            )}

            <View style={styles.itemBottom}>
              <View style={styles.itemBottomWraper1}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => updateSpecificObjectInCart(index, 'subtract')}>
                  <utils.vectorIcon.AntDesign
                    name="minussquare"
                    color={theme.color.button1}
                    size={responsiveFontSize(3.1)}
                  />
                </TouchableOpacity>

                <View style={styles.itemNum}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.numTitle}>
                    {quantity}
                  </Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => updateSpecificObjectInCart(index, 'add')}>
                  <utils.vectorIcon.AntDesign
                    name="plussquare"
                    color={theme.color.button1}
                    size={responsiveFontSize(3.1)}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.itemBottomWraper2}>
                <Text style={[styles.numTitle, {textAlign: 'right'}]}>
                  Rs. {totalPrice}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.itemSeparator} />
      </>
    );
  });

  return renderItem;
}
