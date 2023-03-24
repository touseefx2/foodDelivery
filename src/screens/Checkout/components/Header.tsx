import React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import theme from "../../../theme";
import { styles } from "../styles";
import utils from "../../../utils/index";
import { observer } from "mobx-react";
import store from "../../../store";
import { responsiveFontSize } from "react-native-responsive-dimensions";

export default observer(Header);
function Header({ props, goBack, indicatorStatus }) {
  const { clearCart } = store.User;
  const { isInternet } = store.General;

  const deleteCart = () => {
    clearCart();
    props.navigation.navigate("Home");
  };

  return (
    <>
      {!isInternet && <utils.InternetMessage />}
      <StatusBar
        translucent={false}
        backgroundColor={theme.color.background}
        barStyle={store.Color.statusBarText}
      />
      <View style={styles.header}>
        <View style={styles.header1}>
          <TouchableOpacity activeOpacity={0.6} onPress={goBack}>
            <utils.vectorIcon.AntDesign
              name="close"
              color={theme.color.subTitle}
              size={responsiveFontSize(2.65)}
            />
          </TouchableOpacity>

          <Text style={styles.headetTitle}>Cart</Text>

          <TouchableOpacity activeOpacity={0.6} onPress={deleteCart}>
            <utils.vectorIcon.AntDesign
              name="delete"
              color={theme.color.subTitle}
              size={responsiveFontSize(2.65)}
            />
          </TouchableOpacity>
        </View>
        <utils.StatusIndicatorCheckout
          data={["menu", "cart", "checkout"]}
          status={indicatorStatus}
        />
      </View>
    </>
  );
}
