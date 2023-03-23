import React from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import theme from '../../../theme';
import {styles} from '../styles';

export default function PickupIndicationModal({
  isConfirm,
  setisConfirm,
  deliveryType,
  placeOrder,
  currentLocation,
}) {
  const activeOpacity = 0.8;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isConfirm}
      onRequestClose={() => {
        setisConfirm(false);
      }}>
      <View style={styles.pickupModal}>
        <View style={styles.pickupContainer}>
          <Text style={styles.pickupTitle}>This is a pick-up order</Text>

          <Text style={styles.pickupSubTitle}>
            You’ll have to pick it up from the restaurant by yourself.
          </Text>

          <View style={styles.pickupBottom}>
            <TouchableOpacity
              activeOpacity={activeOpacity}
              onPress={() => {
                setisConfirm(false);
              }}
              style={styles.pickupButton}>
              <Text style={styles.pickupButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={activeOpacity}
              onPress={() => {
                placeOrder('continue', currentLocation);
              }}
              style={[
                styles.pickupButton,
                {
                  backgroundColor: theme.color.button1,
                },
              ]}>
              <Text
                style={[
                  styles.pickupButtonText,
                  {color: theme.color.buttonText},
                ]}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
