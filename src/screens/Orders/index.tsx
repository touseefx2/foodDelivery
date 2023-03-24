import React, { useEffect } from "react";
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
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";

export default observer(Orders);
function Orders(props) {
  const { isInternet } = store.General;
  const { orders, loader, getOrderById } = store.Orders;

  useEffect(() => {
    if (isInternet) getOrderById();
  }, [isInternet]);

  const renderShowOrder = ({ item, index }) => {
    const orderId = item.orderId || "";
    let itemsName = "";
    const totalBill = parseFloat(item.finalBill) || 0;
    const createdAt = item.createdAt;

    if (item.products.length > 0) {
      item.products.map((element) => {
        itemsName =
          itemsName +
          utils.functions.capitalizeTheFirstLetterOfEachWord(
            element.productName.trim()
          ) +
          ", ";
      });
      itemsName = itemsName.replace(/,\s*$/, "");
    }

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          props.navigation.navigate("OrdersDetails", { data: item });
        }}
        style={styles.box}
      >
        <View style={{ width: "88%" }}>
          <View style={styles.row}>
            <View style={{ width: "20%" }}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                Order #{" "}
              </Text>
            </View>
            <View style={{ width: "79%" }}>
              <Text
                style={[styles.title2, { textTransform: "uppercase" }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {orderId}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={{ width: "20%" }}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                Items:
              </Text>
            </View>
            <View style={{ width: "79%" }}>
              <Text
                style={[styles.title2, { textTransform: "none" }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {itemsName == "" ? "None" : itemsName}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={{ width: "20%" }}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                Total:
              </Text>
            </View>
            <View style={{ width: "79%" }}>
              <Text
                style={styles.title2}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Rs. {totalBill.toFixed()}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={{ width: "20%" }}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                Date:
              </Text>
            </View>
            <View style={{ width: "79%" }}>
              <Text
                style={[styles.title2, { textTransform: "none" }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {utils.functions.formateDateTime(createdAt)}
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
        <utils.StackHeader props={props} title="Orders" />

        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingVertical: responsiveHeight(2),
          }}
          showsVerticalScrollIndicator={false}
          data={orders}
          renderItem={renderShowOrder}
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
            !loader && (
              <utils.EmptyData
                message={"Currently no orders are available here"}
                screen={"orders"}
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
