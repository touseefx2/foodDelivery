import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import store from "../../../store/index";
import { observer } from "mobx-react";
import utils from "../../../utils";
import { styles } from "../styles";

export default observer(TitleSection);
function TitleSection({ props, distance }) {
  const { location, resturantDetails } = store.User;
  const { appName } = store.General;
  const { sliderImages } = store.Food;
  const walletSign = sliderImages?.rs || "$$";
  let estimateTime = "0 min delivery";
  if (
    resturantDetails?.estimatedDeliveryTime ||
    resturantDetails?.estimatedPickupTime
  )
    estimateTime =
      resturantDetails?.estimatedDeliveryTime + " min delivery" ||
      resturantDetails?.estimatedPickupTime + " min pickup";

  const goToResturantDetails = () => {
    props.navigation.navigate("ResturantDetails");
  };

  return (
    <View style={styles.titleContainer}>
      <View style={styles.titleSection1}>
        <View style={{ width: "75%" }}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.mainTitle}>
            {appName +
              " " +
              utils.functions.capitalizeTheFirstLetterOfEachWord(
                location?.area.name.trim()
              ) || ""}
          </Text>
        </View>

        {resturantDetails && (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={goToResturantDetails}
            style={styles.mainTitle2Container}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.mainTitle2}
            >
              More info
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.titleSection2}>
        <Text style={styles.mainSubtitle}>
          {parseFloat(distance.toString()).toFixed(1)} km
        </Text>
        <View style={styles.line} />
        <Text style={styles.mainSubtitle}>{walletSign}</Text>
        <View style={styles.line} />
        <Text style={styles.mainSubtitle}>{estimateTime}</Text>
      </View>
    </View>
  );
}
