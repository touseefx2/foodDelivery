import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { styles } from "./styles";
import { observer } from "mobx-react";
import store from "../../store/index";
import utils from "../../utils/index";
import theme from "../../theme";
import { ActivityIndicator } from "react-native-paper";
import moment from "moment";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";

export default observer(Promo);
function Promo(props) {
  const { isInternet } = store.General;
  const { promos, loader, getPromoById } = store.Promos;
  const unsubscribeSetInterval = useRef(null);

  const [data, setdata] = useState([]);
  const [getDataOnce, setGetDataOnce] = useState(false);

  useEffect(() => {
    if (isInternet) getPromoById();
  }, [isInternet]);

  useEffect(() => {
    if (promos.length > 0) attempToSetPromoData(promos);
    else {
      setdata([]);
      setGetDataOnce(true);
    }
  }, [promos]);

  useEffect(() => {
    if (data.length > 0) {
      ClearInterval();
      unsubscribeSetInterval.current = setInterval(() => {
        attempToSetPromoData(data);
      }, 10000);
    } else ClearInterval();

    return () => ClearInterval();
  }, [data]);

  const attempToSetPromoData = (data) => {
    let promoArr = [];
    data.forEach((item) => {
      const status = utils.functions.checkDateStatus(
        item.startDate,
        item.expiryDate
      );
      if (status == "active") promoArr.push(item);
    });
    setdata(promoArr);
    setGetDataOnce(true);
  };

  const ClearInterval = () => {
    clearInterval(unsubscribeSetInterval.current);
    unsubscribeSetInterval.current = null;
  };

  const renderPromos = ({ item, index }) => {
    const title = item.name || "";
    const code = item._id;
    const discountPercentage = item.percentage || 0;
    const expireDate = item.expiryDate || "";
    const status = item.status || "";

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          props.navigation.navigate("PromoDetails", { data: item })
        }
        style={styles.promoTouchable}
      >
        <View style={{ width: "88%" }}>
          <View style={styles.row}>
            <View style={{ width: "22%" }}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                Name:
              </Text>
            </View>
            <View style={{ width: "76%" }}>
              <Text
                style={[styles.title2, { textTransform: "uppercase" }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {title}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={{ width: "22%" }}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                Code:
              </Text>
            </View>
            <View style={{ width: "76%" }}>
              <Text
                style={[styles.title2, { textTransform: "capitalize" }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {code}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={{ width: "22%" }}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                Discount:
              </Text>
            </View>
            <View style={{ width: "76%" }}>
              <Text
                style={styles.title2}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {discountPercentage}%
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={{ width: "22%" }}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                Status:
              </Text>
            </View>
            <View style={{ width: "76%" }}>
              <Text
                style={styles.title2}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {status}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={{ width: "22%" }}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                Valid till:
              </Text>
            </View>
            <View style={{ width: "76%" }}>
              <Text
                style={styles.title2}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {moment(new Date(expireDate)).format("D MMM Y")}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ width: "10%", alignItems: "flex-end" }}>
          <utils.vectorIcon.AntDesign
            name="right"
            color={theme.color.subTitle}
            size={responsiveFontSize(2.95)}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
        <utils.StackHeader props={props} title="Promo" />

        <FlatList
          contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderPromos}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          removeClippedSubviews={true}
          ItemSeparatorComponent={() => (
            <View style={{ height: responsiveHeight(1.4) }} />
          )}
          ListEmptyComponent={
            !loader &&
            getDataOnce && (
              <utils.EmptyData
                message={"Currently no promo are available here"}
                screen={"promo"}
              />
            )
          }
        />

        {loader && (
          <ActivityIndicator
            size={responsiveFontSize(4.5)}
            color={theme.color.button1}
            style={{ position: "absolute", top: "45%", alignSelf: "center" }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
