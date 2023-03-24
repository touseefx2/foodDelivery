import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./../styles";
import theme from "../../../theme";
import utils from "../../../utils";
import store from "../../../store";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import ProductAvailabilitySheet from "./ProductAvailabilitySheet";

export default function Bottom({
  numOfItems,
  setnumOfItems,
  isRequiredFieldEmpty,
  goBack,
  cart,
  setCart,
  productOptions,
  baseVariants,
  additionalVariants,
  food,
  isEmptyVariants,
}) {
  const productId = food._id;
  const checkIsObjectEqual = (object1, object2) => {
    let isSameProduct = true;
    const object1Variants = object1.variants;
    object1.variants = [];
    object1.firstBill = 0;
    object1.bill = 0;
    object1.quantity = 0;
    const object2Variants = object2.variants;
    object2.variants = [];
    object2.firstBill = 0;
    object2.bill = 0;
    object2.quantity = 0;

    for (let key in object1) {
      if (!(key in object2)) isSameProduct = false;
      if (object1[key] !== object2[key]) isSameProduct = false;
    }

    if (object1Variants.length <= 0 && object2Variants.length <= 0) {
      isSameProduct = true;
    } else if (object1Variants.length != object2Variants.length) {
      isSameProduct = false;
    } else if (object1Variants.length == object2Variants.length) {
      const t1 = object1Variants.map((item) => {
        return Object.entries(item).sort().toString();
      });
      const t2 = object2Variants.map((item) => {
        return Object.entries(item).sort().toString();
      });

      isSameProduct = t1.every((item) => {
        return t2.includes(item);
      });
    }

    return isSameProduct;
  };

  const increaseQuantityOfSameProductInCart = (cartArr, objIndex) => {
    cartArr.data[objIndex].ifNotAvailable = productOptions.toLowerCase();
    const quantity = cartArr.data[objIndex].quantity + numOfItems;
    cartArr.data[objIndex].quantity = quantity;
    cartArr.data[objIndex].bill = quantity * cartArr.data[objIndex].firstBill;
    setCart(cartArr);
    goBack();
  };

  const addProductInCart = (check) => {
    const cartArr = { ...cart };
    let variantsList = [];
    let isRequired = false;
    let bill = 0;
    let obj = null;
    let data = null;
    let isSameProduct = false;
    let image = food.image || "";
    let matchIndex = -1;

    if (baseVariants.length > 0 && baseVariants[0].details.length > 0) {
      baseVariants[0].details
        .filter(function (item) {
          return item.isSel;
        })
        .forEach((element) => {
          if (element.isRequire == true) isRequired = true;
          const obj = { ...element };
          delete obj.isSel;
          variantsList.push(obj);
        });
    }

    additionalVariants.forEach((element) => {
      if (element.details.length > 0) {
        element.details
          .filter(function (item) {
            return item.isSel;
          })
          .forEach((item2) => {
            const obj = { ...item2 };
            delete obj.isSel;
            variantsList.push(obj);
          });
      }
    });

    variantsList.forEach((item) => {
      bill = bill + parseFloat(item.price);
    });

    const initailBill = bill;
    bill = isRequired ? bill * numOfItems : (bill + food.price) * numOfItems;
    const firstBill = isRequired
      ? initailBill * 1
      : (initailBill + food.price) * 1;
    obj = {
      uid: cartArr.data.length + 1,
      productId: productId,
      productName: food.title || "",
      description: food.description || "---",
      quantity: numOfItems,
      price: food.price,
      bill: bill,
      firstBill: firstBill,
      variants: variantsList,
      ifNotAvailable: productOptions.toLowerCase(),
    };

    const arr = cartArr.data.filter(function (item, index) {
      if (item.productId === productId) matchIndex = index;
      return item.productId === productId;
    });

    if (arr.length > 0) {
      if (check == "withVariant") {
        for (let index = 0; index < arr.length; index++) {
          const item = arr[index];
          data = item;
          const object1 = { ...item };
          const object2 = { ...obj };
          isSameProduct = checkIsObjectEqual(object1, object2);
          if (isSameProduct) {
            const objIndex = cartArr.data.findIndex((element) => {
              return element.uid === item.uid;
            });
            matchIndex = objIndex;
            break;
          }
        }

        if (isSameProduct) {
          increaseQuantityOfSameProductInCart(cartArr, matchIndex);
          return;
        } else image = data.image || "";
      } else {
        if (matchIndex > -1) {
          increaseQuantityOfSameProductInCart(cartArr, matchIndex);
          return;
        }
      }
    }

    obj.image = image;
    onAddItemsInCart(cartArr, obj);
  };

  const onAddItemsInCart = (cartArr, obj) => {
    cartArr.data.push(obj);
    setCart(cartArr);
    goBack();
  };

  return (
    <View style={styles.bottomConatainer}>
      <View style={styles.bottomRow}>
        <View style={styles.bottomRowWrapper1}>
          <TouchableOpacity
            style={[
              styles.buttomIcon,
              {
                backgroundColor:
                  numOfItems <= 1
                    ? theme.color.backgroundLight
                    : theme.color.button1,
              },
            ]}
            activeOpacity={0.6}
            disabled={numOfItems <= 1 ? true : false}
            onPress={() => {
              let c = numOfItems;
              --c;
              setnumOfItems(c);
            }}
          >
            <utils.vectorIcon.AntDesign
              name="minus"
              color={theme.color.buttonText}
              size={responsiveFontSize(2.95)}
            />
          </TouchableOpacity>
          <View style={{ width: "30%" }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.buttomCountText}
            >
              {numOfItems}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.buttomIcon}
            activeOpacity={0.6}
            onPress={() => {
              let c = numOfItems;
              ++c;
              setnumOfItems(c);
            }}
          >
            <utils.vectorIcon.AntDesign
              name="plus"
              color={theme.color.buttonText}
              size={responsiveFontSize(2.95)}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          disabled={isRequiredFieldEmpty}
          onPress={() =>
            addProductInCart(
              !isEmptyVariants ? "withVariant" : "withoutVariant"
            )
          }
          style={[
            styles.bottomRowWrapper2,
            {
              opacity:
                isRequiredFieldEmpty && store.Color.theme == "black" ? 0.6 : 1,
              backgroundColor: !isRequiredFieldEmpty
                ? theme.color.button1
                : theme.color.backgroundLight,
            },
          ]}
        >
          <Text style={styles.botoomButtonText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
