import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import theme from '../../../theme';
import {styles} from '../styles';
import utils from '../../../utils/index';
import ShowItem from './ShowItem';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

export default function CartSection({
  cart,
  deliveryType,
  estimatedTime,
  subtotal,
  taxPercentage,
  taxPrice,
  deliveryCharges,
  imgLoader,
  updateSpecificObjectInCart,
  goBack,
}) {
  return (
    <>
      <View style={styles.mainDeliveryBox}>
        <Image
          style={styles.deliveryBoxImg}
          source={require('../../../assets/images/delivery/img.png')}
        />
        <View style={{width: '80%'}}>
          <Text
            style={styles.deliveryBoxTitle1}
            numberOfLines={1}
            ellipsizeMode="tail">
            Estimated{' '}
            {deliveryType?.name == 'delivery' ? 'delivery' : 'picked-up'}
          </Text>
          <Text
            style={styles.deliveryBoxTitle2}
            numberOfLines={1}
            ellipsizeMode="tail">
            Now ({estimatedTime} min)
          </Text>
        </View>
      </View>

      <View style={styles.cartItemMainSec}>
        {cart.data.length > 0 && (
          <ShowItem
            cart={cart}
            imgLoader={imgLoader}
            updateSpecificObjectInCart={updateSpecificObjectInCart}
          />
        )}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={goBack}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <utils.vectorIcon.Entypo
            name="plus"
            color={theme.color.button1}
            size={responsiveFontSize(1.75)}
          />
          <Text style={styles.moreText}>Add more items</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.mainSec, {marginBottom: responsiveHeight(4)}]}>
        <View style={styles.mainWrap1}>
          <View style={{width: '35%'}}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={styles.mainWrapTitle}>
              Subtotal
            </Text>
          </View>
          <View style={{width: '60%'}}>
            <Text style={[styles.mainWrapTitle, {textAlign: 'right'}]}>
              Rs. {subtotal}
            </Text>
          </View>
        </View>
        <View style={styles.mainWrap2}>
          <View style={{width: '35%'}}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.mainWrapTitle2}>
              Tax ({taxPercentage}%)
            </Text>
          </View>
          <View style={{width: '60%'}}>
            <Text style={[styles.mainWrapTitle2, {textAlign: 'right'}]}>
              Rs. {taxPrice}
            </Text>
          </View>
        </View>
        {deliveryType?.name == 'delivery' && (
          <View style={styles.mainWrap2}>
            <View style={{width: '35%'}}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.mainWrapTitle2}>
                Delivery Charges
              </Text>
            </View>
            <View style={{width: '60%'}}>
              <Text style={[styles.mainWrapTitle2, {textAlign: 'right'}]}>
                Rs. {deliveryCharges}
              </Text>
            </View>
          </View>
        )}
      </View>
    </>
  );
}
