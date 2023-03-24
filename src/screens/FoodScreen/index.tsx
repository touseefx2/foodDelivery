import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "./styles";
import { observer } from "mobx-react";
import store from "../../store/index";
import utils from "../../utils/index";
import theme from "../../theme";
import Toast from "react-native-easy-toast";
import { responsiveHeight } from "react-native-responsive-dimensions";
import ShowVariation from "./components/ShowVariation";
import Bottom from "./components/Bottom";
import Header from "./components/Header";
import ProductAvailabilitySheet from "./components/ProductAvailabilitySheet";

export default observer(FoodScreen);
function FoodScreen({
  food,
  isFavouriteFood,
  closeFoodScreen,
  isEmptyVariants,
  onPressHeart,
}) {
  const rbSheet = useRef(null);
  const toast = useRef(null);

  const foodName = food.title || "";
  const foodDescription = food.description || "";
  const image = food.image
    ? { uri: food.image }
    : require("../../assets/images/burger/img.jpeg");
  const foodPrice = food.price;
  const baseVariationsData = food.base_variation.slice() || [];
  const additionalVariationsData = food.additional_variation.slice() || [];
  const { notAvailableOptions } = store.Food;
  const { cart, setCart, user } = store.User;
  const { isInternet } = store.General;

  const [numOfItems, setNumOfItems] = useState(1);
  const [baseVariants, setBaseVariants] = useState([]);
  const [additionalVariants, setAdditionalVariants] = useState([]);
  const [isRequiredFieldEmpty, setIsRequiredFieldEmpty] = useState(true);
  const [productOptions, setProductOptions] = useState(notAvailableOptions[0]);
  const [selectedProductOption, setSelectedProductOption] = useState(
    notAvailableOptions[0]
  );

  useEffect(() => {
    setTimeout(() => {
      attemptToSetVaitaints(baseVariationsData, "base");
      attemptToSetVaitaints(additionalVariationsData, "additional");
    }, 5);
  }, []);

  useEffect(() => {
    let isRequiredVaraintSelect = false;
    if (!isEmptyVariants) {
      let variant = [];
      let requiredVariant = getRequiredVariant(baseVariants);
      if (requiredVariant.length <= 0)
        requiredVariant = getRequiredVariant(additionalVariants);

      requiredVariant.forEach((item) => {
        const obj = { ...item };
        obj.isSelected = false;
        if (obj.details.length > 0) {
          const arr = obj.details.filter((item) => item.isSel);
          if (arr.length > 0) obj.isSelected = true;
          variant.push(obj);
        }
      });
      if (variant.length > 0) {
        for (let index = 0; index < variant.length; index++) {
          const item = variant[index];
          if (!item.isSelected) {
            isRequiredVaraintSelect = true;
            break;
          }
        }
      }
    }
    setIsRequiredFieldEmpty(isRequiredVaraintSelect);
  }, [baseVariants, additionalVariants]);

  const processVariants = (arr, check) => {
    const variants = arr.map((item) => {
      const obj = { ...item, viewmore: false };
      const details = item.details.map((detail) => {
        const detailObj = { ...detail, isSel: false, variant: item.name };
        if (check === "base") {
          detailObj.isRequire = detail.isRequired;
        }
        return detailObj;
      });
      return { ...obj, details };
    });

    if (check === "base")
      return { baseVariants: variants, additionalVariants: [] };
    else return { baseVariants: [], additionalVariants: variants };
  };

  const attemptToSetVaitaints = (arr, check) => {
    const { baseVariants, additionalVariants } = processVariants(arr, check);
    if (check == "base") setBaseVariants(baseVariants);
    else setAdditionalVariants(additionalVariants);
  };

  const getRequiredVariant = (arr) => {
    let variant = [];
    arr
      .filter(function (item) {
        return item.isRequired === true;
      })
      .forEach((item) => {
        variant.push(item);
      });
    return variant;
  };

  const onClickHeart = () => {
    if (isInternet) {
      if (!user) {
        toast?.current?.show("Please login to mark favourite", 500);
        return;
      }
      onPressHeart();
    } else toast?.current?.show("Please connect to the internet", 500);
  };

  return (
    <>
      <utils.CoverImagesSlider
        images={image}
        screen={"food"}
        isEmptyVariants={isEmptyVariants}
      />
      {!isEmptyVariants && (
        <Header
          goBack={closeFoodScreen}
          isFavouriteFood={isFavouriteFood}
          onPressHeart={onClickHeart}
        />
      )}

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingBottom: responsiveHeight(17),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <View style={{ width: "60%" }}>
            <Text style={styles.sectionTitle1}>
              {utils.functions.capitalizeTheFirstLetterOfEachWord(
                foodName.trim()
              )}
            </Text>
          </View>
          <View style={{ width: "35%" }}>
            <Text style={styles.sectionTitle2}>
              {baseVariants.length <= 0 ? "Rs. " : "from Rs. "}
              {foodPrice.toFixed()}
            </Text>
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionText}>{foodDescription.trim()}</Text>
        </View>

        {!isEmptyVariants && <View style={styles.separator} />}

        {!isEmptyVariants && (
          <ShowVariation
            baseVariants={baseVariants}
            additionalVariants={additionalVariants}
            setBaseVariants={setBaseVariants}
            setAdditionalVariants={setAdditionalVariants}
          />
        )}

        <ProductAvailabilitySheet
          notAvailableOptions={notAvailableOptions}
          productOptions={productOptions}
          selectedProductOption={selectedProductOption}
          setProductOptions={setProductOptions}
          setSelectedProductOption={setSelectedProductOption}
          isEmptyVariants={isEmptyVariants}
          rbSheet={rbSheet}
        />
      </ScrollView>

      <Bottom
        numOfItems={numOfItems}
        setnumOfItems={setNumOfItems}
        isRequiredFieldEmpty={isRequiredFieldEmpty}
        goBack={closeFoodScreen}
        cart={cart}
        setCart={setCart}
        productOptions={productOptions}
        baseVariants={baseVariants}
        additionalVariants={additionalVariants}
        food={food}
        isEmptyVariants={isEmptyVariants}
      />

      <Toast
        ref={toast}
        position="bottom"
        opacity={1}
        style={{ backgroundColor: theme.color.button1 }}
        textStyle={{ color: theme.color.buttonText }}
      />
    </>
  );
}
