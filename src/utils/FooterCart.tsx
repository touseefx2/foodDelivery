import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import theme from '../theme/index';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import store from '../store/index';
import {observer} from 'mobx-react';

export default observer(FooterCart);
function FooterCart(props) {
  const {cart} = store.User;
  const {totalitems, totalbill} = cart;
  const nav = props.nav;

  const onPress = () => {
    nav.navigate('Checkout', {openSheet: props.openSheet});
  };

  return (
    <>
      <View style={styles.foodCard}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPress}
          style={styles.wrapper}>
          <View style={{width: '24%'}}>
            <View style={styles.section1}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.t1}>
                {totalitems <= 99 ? totalitems : '99+'}
              </Text>
            </View>
          </View>

          <View style={styles.section2}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.t4}>
              View your cart
            </Text>
          </View>

          <View style={styles.section3}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.t4}>
              Rs. {totalbill}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  foodCard: {
    width: '100%',
    backgroundColor: theme.color.Home_FooterCart_Background_Color,
    borderTopColor: theme.color.subTitleLight,
    borderTopWidth: theme.color.Home_FooterCart_TopBorder_Width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowColor: '#000',
    elevation: 24,
  },

  wrapper: {
    paddingVertical: 8,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: theme.color.Home_FooterCart_Sub_Background_Color,
    borderRadius: 10,
  },

  section1: {
    borderColor: theme.color.Home_FooterCart_Icon_Border_Color,
    width: responsiveFontSize(3.7),
    height: responsiveFontSize(3.7),
    borderRadius: responsiveFontSize(3.7) / 2,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section2: {
    width: '42%',
  },
  section3: {
    width: '30%',
  },

  t1: {
    fontSize: responsiveFontSize(1.6),
    color: theme.color.Home_FooterCart_Text_Color,
    fontFamily: theme.fonts.fontBold,
  },

  t4: {
    fontSize: responsiveFontSize(1.9),
    color: theme.color.Home_FooterCart_Text_Color,
    fontFamily: theme.fonts.fontBold,
    textAlign: 'right',
  },
});
