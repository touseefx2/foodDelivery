import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";
import { Permisiions } from "../../../utils/Permissions";
import { observer } from "mobx-react";
import store from "../../../store";

export default observer(BottomButton);
function BottomButton({
  isCart,
  setIsCart,
  total,
  rbSheet,
  scrollRef,
  setCurrentLocationErrorCount,
  placeOrder,
  getCurrentLocation,
}) {
  const { user, currentLocation } = store.User;
  const { setIsLocation } = store.General;

  const onPressBottomButton = () => {
    if (!isCart) {
      if (!user) {
        rbSheet?.current?.open();
        return;
      }
      setIsCart(true);
      scrollRef?.current?.scrollTo({ y: 0, animated: false });
      return;
    }

    if (isCart) {
      if (currentLocation) placeOrder("", currentLocation);
      else {
        setCurrentLocationErrorCount(0);
        Permisiions.Location.requestLocationPermission(
          setIsLocation,
          getCurrentLocation
        );
      }

      return;
    }
  };

  return (
    <View style={styles.BottomContainer}>
      <View style={styles.BottomContainerWrapper1}>
        <View style={{ width: "42%" }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.BottomContainerTitle}
          >
            Total{" "}
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.BottomContainerTitle2}
            >
              (incl. Tax)
            </Text>
          </Text>
        </View>
        <View style={{ width: "53%" }}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[styles.BottomContainerTitle, { textAlign: "right" }]}
          >
            Rs. {total}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressBottomButton}
        style={styles.bottomButton}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.bottomButtonText}
        >
          {!isCart ? " Review payment and address" : "Place Order"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
