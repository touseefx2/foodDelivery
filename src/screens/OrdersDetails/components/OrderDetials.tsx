import React from 'react';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import {styles} from '../styles';
import utils from '../../../utils';
import theme from '../../../theme';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

export default function OrderDetials({
  status,
  orderId,
  createdAt,
  estimateIndication,
  estimateTime,
  deliveryType,
  phone,
  address,
  paymentMethod,
}) {
  const onPressPhone = number => {
    if (number != '') Linking.openURL(`tel:${number}`);
  };

  const ContactRider = () => {
    const riderDetails = {
      name: 'rider 1',
      phone: '03075839836',
      location: 'islamabad',
    };

    return (
      <View style={styles.contactRiderView}>
        <View style={{width: '75%'}}>
          <Text style={styles.contacTitle}>Contact your rider</Text>
          <Text style={styles.contacSubTitle}>Call rider</Text>
        </View>

        <View style={styles.contactRow}>
          <TouchableOpacity
            onPress={() => onPressPhone(riderDetails.phone)}
            activeOpacity={0.7}
            style={styles.phoneView}>
            <utils.vectorIcon.FontAwesome
              name="phone"
              color={theme.color.button1}
              size={responsiveFontSize(3)}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainSec}>
      <View style={{padding: 12}}>
        {status !== 'delivered' && status !== 'cancelled' && (
          <>
            <Text style={styles.mainSecText}>{estimateIndication}</Text>
            <Text style={styles.mainSecText2}>{estimateTime} min</Text>
            <Image
              style={styles.iconImg}
              source={require('../../../assets/images/delivery/img.png')}
            />
          </>
        )}

        {status == 'cancelled' ? (
          <Text style={styles.statusText}>{status}</Text>
        ) : (
          <>
            <utils.StatusIndicatorOrder
              type={deliveryType}
              data={[
                'order sent',
                'preparing food',
                deliveryType == 'delivery'
                  ? 'picked up by rider'
                  : 'food is ready',
                deliveryType == 'delivery' ? 'delivered' : 'picked up',
              ]}
              status={status}
            />

            {deliveryType == 'delivery' && status == 'picked' && ContactRider()}
          </>
        )}
      </View>
      <View style={styles.separator} />
      <View style={{padding: 12}}>
        <Text style={styles.sectionsTitle}>helpline</Text>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => onPressPhone(phone)}
          style={styles.helplineIcon}>
          <utils.vectorIcon.Feather
            name="phone-call"
            color={theme.color.button1}
            size={responsiveFontSize(3.2)}
          />
          <Text style={[styles.sectionsTitle1, {marginLeft: 12}]}>{phone}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <View style={{padding: 12}}>
        <Text style={styles.sectionsTitle}>Order details</Text>
        <View
          style={[
            styles.optionView,
            {
              marginTop: responsiveHeight(1.8),
            },
          ]}>
          <Text style={styles.sectionsTitle1}>order number</Text>

          <View style={styles.rightContainer}>
            <Text style={styles.sectionsTitle2}>{orderId}</Text>
          </View>
        </View>

        <View style={styles.optionView}>
          <Text style={styles.sectionsTitle1}>date</Text>

          <View style={styles.rightContainer}>
            <Text style={styles.sectionsTitle2}>
              {utils.functions.formateDateTime(createdAt)}
            </Text>
          </View>
        </View>

        <View style={styles.optionView}>
          <Text style={styles.sectionsTitle1}>address</Text>

          <View style={styles.rightContainer}>
            <Text style={styles.sectionsTitle2}>{address.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.optionView}>
          <Text style={styles.sectionsTitle1}>payment method</Text>

          <View style={styles.rightContainer}>
            <Text style={styles.sectionsTitle2}>{paymentMethod}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
