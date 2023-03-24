import React, { useState } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import { styles } from "./styles";
import { observer } from "mobx-react";
import store from "../../store/index";
import utils from "../../utils/index";
import OrderDetials from "./components/OrderDetials";
import Items from "./components/Items";
import Promo from "./components/Promo";
import Calculation from "./components/Calculation";

export default observer(OrdersDetails);
function OrdersDetails(props) {
  const data = props.route.params.data;
  const { sliderImages } = store.Food;
  const { resturantDetails } = store.User;
  const orderId = data.orderId;
  const createdAt = data.createdAt;
  const phone = sliderImages.phone ? "0" + sliderImages.phone : "";
  const promoCode = data.promoCode || "";
  const promoDiscountPercentage = data.promoDiscountPercentage || 0;
  const promoDiscountAmount = data.promoDiscountAmount || 0;
  const subTotal = data.bill || 0;
  const taxPercentage = data.taxpercent || 0;
  const taxPrice = data.tax || 0;
  const deliveryCharges = data.deliveryCharges || 0;
  const finalBill = data.finalBill.toFixed() || 0;
  const status = data.status?.toLowerCase() || "";
  const paymentMethod = data.paymentMethod || "";
  const products = data.products || [];
  const deliveryType = data.deliveryType || "";
  const address =
    deliveryType == "delivery" ? data.location.address : data.address;
  const estimateTime =
    deliveryType == "delivery"
      ? resturantDetails?.estimatedDeliveryTime || "10"
      : resturantDetails?.estimatedPickupTime || "10";
  const estimateIndication =
    deliveryType == "delivery"
      ? "Estimated delivery time"
      : "Estimated pick up time";

  const [isShowItems, setisShowItems] = useState(false);
  const [isShowPromo, setisShowPromo] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
        <utils.StackHeader props={props} title="Orders" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <OrderDetials
            status={status}
            orderId={orderId}
            createdAt={createdAt}
            estimateIndication={estimateIndication}
            estimateTime={estimateTime}
            deliveryType={deliveryType}
            phone={phone}
            address={address}
            paymentMethod={paymentMethod}
          />

          <Items
            products={products}
            isShowItems={isShowItems}
            setisShowItems={setisShowItems}
          />
          {promoCode != "" && (
            <Promo
              setisShowPromo={setisShowPromo}
              isShowPromo={isShowPromo}
              promoCode={promoCode}
              promoDiscountAmount={promoDiscountAmount}
              promoDiscountPercentage={promoDiscountPercentage}
            />
          )}

          <Calculation
            subTotal={subTotal}
            promoCode={promoCode}
            promoDiscountAmount={promoDiscountAmount}
            taxPercentage={taxPercentage}
            taxPrice={taxPrice}
            deliveryCharges={deliveryCharges}
            finalBill={finalBill}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
