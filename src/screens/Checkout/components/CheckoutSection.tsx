import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import store from "../../../store";
import theme from "../../../theme";
import { styles } from "../styles";
import ShowItemSummary from "./ShowItemSummary";
import DeliveryInput from "./DeliveryInput";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { observer } from "mobx-react";

export default observer(CheckoutSection);
function CheckoutSection({
  subTotal,
  deliveryType,
  address,
  name,
  setName,
  phone,
  setPhone,
  isVerify,
  selectedLocation,
  PromoApply,
  setPromoApply,
  promoCode,
  setPromoCode,
  discountPrice,
  setDiscountPrice,
  subtotal,
  taxPercentage,
  deliveryCharges,
  taxPrice,
  specialInstructions,
  setSpecialInstructions,
  goToOrderLocation,
  toast,
}) {
  const { user, cart, location } = store.User;
  const { attempToCheckPromo } = store.Orders;

  const onClickPromoApply = () => {
    const body = {
      code: promoCode.trim(),
      city: location.city._id,
      customer: user?._id,
    };
    attempToCheckPromo(body, subTotal, setPromoApply, toast);
  };

  return (
    <>
      <View style={styles.mainSeccDelivery}>
        <Text style={styles.sectionsTitle}>
          Your {deliveryType?.name == "delivery" ? "Delivery " : "Pick up "}
          Details
        </Text>
        <DeliveryInput
          deliveryType={deliveryType}
          address={address}
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          isVerify={isVerify}
          selectedLocation={selectedLocation}
          goToOrderLocation={goToOrderLocation}
          toast={toast}
        />
      </View>

      <View style={styles.mainSeccDelivery}>
        <Text style={styles.sectionsTitle}>Payment method</Text>
        <Text style={styles.sectionsSubTitle}>Cash on Delivery</Text>
      </View>

      <View style={styles.mainSeccDelivery}>
        <Text style={styles.sectionsTitle}>Promo</Text>
        <View
          style={[
            styles.promoConatiner,
            !PromoApply && {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          {!PromoApply && (
            <>
              <TextInput
                editable={!user ? false : true}
                style={[
                  styles.promoInputConatiner,
                  Platform.OS == "ios" && { height: responsiveHeight(6.2) },
                ]}
                onChangeText={(text) => {
                  setPromoCode(text);
                }}
                value={promoCode}
                placeholderTextColor={theme.color.subTitleLight}
                placeholder={
                  !user
                    ? "Please login to apply promo code"
                    : "Enter promo here (if any)"
                }
              />

              <TouchableOpacity
                onPress={onClickPromoApply}
                activeOpacity={0.7}
                disabled={!user || promoCode == "" ? true : false}
                style={[
                  styles.promoButtonConatiner,
                  {
                    opacity:
                      (!user || promoCode == "") && store.Color.theme == "black"
                        ? 0.6
                        : 1,
                    backgroundColor:
                      !user || promoCode == ""
                        ? theme.color.backgroundLight
                        : theme.color.button1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.sectionsSubTitle,
                    { color: theme.color.buttonText, marginTop: 0 },
                  ]}
                >
                  Apply
                </Text>
              </TouchableOpacity>
            </>
          )}

          {PromoApply && (
            <>
              <View style={styles.promoApplyWrapper}>
                <Text
                  style={[
                    styles.sectionsSubTitle,
                    { width: "70%", marginTop: 0, textTransform: "none" },
                  ]}
                >
                  {PromoApply.code || PromoApply._id}
                </Text>

                <TouchableOpacity
                  style={{ width: "20%" }}
                  activeOpacity={0.7}
                  onPress={() => {
                    setPromoApply(null), setPromoCode("");
                    setDiscountPrice(0);
                  }}
                >
                  <Text style={styles.promoRemoveText}>(Remove)</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.promoApplyWrapper}>
                <Text
                  style={[
                    styles.sectionsSubTitle,
                    { width: "35%", marginTop: 0, textTransform: "none" },
                  ]}
                >
                  Discount ({PromoApply.percentage || 0}%)
                </Text>
                <View
                  style={{
                    width: "60%",
                  }}
                >
                  <Text style={styles.sectionsSubTitle2}>
                    Rs. {discountPrice}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
      </View>

      <View style={styles.mainSeccDelivery}>
        <Text style={styles.sectionsTitle}>Order Summary</Text>
        {cart.data.length > 0 && (
          <ShowItemSummary
            cart={cart}
            subtotal={subtotal}
            isPromoApply={PromoApply}
            discountPrice={discountPrice}
            taxPercentage={taxPercentage}
            deliveryType={deliveryType}
            deliveryCharges={deliveryCharges}
            taxPrice={taxPrice}
          />
        )}
      </View>

      <View style={styles.mainSeccDelivery}>
        <Text style={styles.sectionsTitle}>SPECIAL INSTRUCTION (OPTIONAL)</Text>

        <TextInput
          multiline
          style={styles.instructionInput}
          placeholderTextColor={theme.color.subTitleLight}
          placeholder="Add any comments, e.g. about allergies, or delivery instructions here."
          value={specialInstructions}
          onChangeText={(val) => {
            setSpecialInstructions(val);
          }}
        />
      </View>

      <View style={{ height: responsiveHeight(2) }} />
    </>
  );
}
