import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./styles";
import theme from "../../theme";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import NetInfo from "@react-native-community/netinfo";
import utils from "../../utils";
import ProgressiveFastImage from "@freakycoder/react-native-progressive-fast-image";
import store from "../../store";
import { observer } from "mobx-react";
import FoodScreen from "../../screens/FoodScreen";

export default observer(FoodCard);
function FoodCard({ data, toast, screen, separator }) {
  const product_id = data._id;
  const baseVariation = data.base_variation || [];
  const additionalVariation = data.additional_variation || [];
  const { cart, user, favouriteFoodList, setFavouriteFoodList } = store.User;

  const [isFoodScreen, setIsFoodScreen] = useState(false);

  const foodName = data.title || "";
  const details = data.description || "---";
  const rupees = data.price || 0;
  const imgLoader = require("../../assets/images/imgLoader/img.gif");
  const foodImage =
    data?.image != ""
      ? { uri: data.image }
      : require("../../assets/images/burger/img.jpeg");
  const isFavouriteFood = favouriteFoodList.some(
    (item) => item._id === product_id
  );
  const isEmptyVariants =
    baseVariation.length <= 0 && additionalVariation.length <= 0;
  let numOfItem = 0;
  cart.data.forEach((item) => {
    if (item.productId === data._id) {
      numOfItem += item.quantity;
    }
  });

  const openFoodScreen = () => {
    setIsFoodScreen(true);
  };

  const closeFoodScreen = () => {
    setIsFoodScreen(false);
  };

  const onPressHeart = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        if (!user) {
          toast?.current?.show("Please login to mark favourite", 500);
          return;
        }
        const favouriteArr = favouriteFoodList.slice();
        if (!isFavouriteFood) favouriteArr.push(data);
        else {
          const index = favouriteArr.findIndex(
            (item) => item._id === product_id
          );
          if (index >= 0) favouriteArr.splice(index, 1);
        }
        setFavouriteFoodList(favouriteArr);
      } else toast?.current?.show("Please connect to the internet", 500);
    });
  };

  const renderFoodSheet = () => {
    return (
      <Modal
        transparent
        visible={isFoodScreen}
        onRequestClose={closeFoodScreen}
      >
        <StatusBar
          animated={false}
          translucent={screen == "home" && isEmptyVariants ? true : false}
          backgroundColor={theme.color.button1}
          barStyle={store.Color.statusBarText}
        />
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={closeFoodScreen}
          style={styles.foodSheetWraper}
        >
          <TouchableWithoutFeedback>
            <View
              style={
                isEmptyVariants
                  ? styles.foodContainerStyle
                  : styles.foodContainerStyle2
              }
            >
              <FoodScreen
                food={data}
                isFavouriteFood={isFavouriteFood}
                closeFoodScreen={closeFoodScreen}
                isEmptyVariants={isEmptyVariants}
                onPressHeart={onPressHeart}
              />
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={openFoodScreen}
        style={[
          styles.foodCard,
          {
            marginTop: responsiveHeight(separator),
          },
        ]}
      >
        <View style={styles.foodCardTxtConatiner}>
          <Text
            style={styles.foodCardTitle1}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {utils.functions.capitalizeTheFirstLetterOfEachWord(
              foodName.trim()
            )}
          </Text>
          <Text
            style={styles.foodCardTitle2}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {details}
          </Text>

          <View style={styles.fcBottom}>
            <View style={styles.addcart}>
              <Text
                style={styles.foodCardTitle3}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {baseVariation.length <= 0 ? "Rs. " : "from Rs. "}
                {rupees.toFixed()}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.4}
              onPress={onPressHeart}
              style={styles.likecart}
            >
              <utils.vectorIcon.AntDesign
                name={!isFavouriteFood ? "hearto" : "heart"}
                color={theme.color.button1}
                size={responsiveFontSize(2.7)}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.foodCardImgConatiner}>
          <ProgressiveFastImage
            source={foodImage}
            style={styles.foodCardImg}
            loadingSource={imgLoader}
            loadingImageStyle={styles.ImageLoader}
            thumbnailSource={require("../../assets/images/imgLoad/img.jpeg")}
          />
        </View>

        {numOfItem > 0 && (
          <View style={styles.circleNum}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.circleNumText}
            >
              {numOfItem <= 99 ? numOfItem : "99+"}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.separator} />
      {renderFoodSheet()}
    </>
  );
}
