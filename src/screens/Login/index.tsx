import React, { useState, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Keyboard,
  StatusBar,
} from "react-native";
import { styles } from "./styles";
import { observer } from "mobx-react";
import store from "../../store/index";
import utils from "../../utils/index";
import theme from "../../theme";
import Toast from "react-native-easy-toast";
import NetInfo from "@react-native-community/netinfo";
import { responsiveHeight } from "react-native-responsive-dimensions";

export default observer(Login);
function Login(props) {
  const toast = useRef(null);
  const toastduration = 700;
  const callingScreen = props.route.params.screen || "";
  const { loader } = store.User;
  const [phone, setphone] = useState("");

  const Login = () => {
    Keyboard.dismiss();
    if (phone.trim() == "") {
      toast?.current?.show("Please enter your phone number");
      return;
    }

    if (!utils.regularExpression.phone.test(phone)) {
      toast?.current?.show("Your phone number is inavlid");
      return;
    }

    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        props.navigation.navigate("OTP", {
          screen: callingScreen,
          phone: "+92" + phone,
        });
      } else {
        toast?.current?.show("Please connect internet", toastduration);
      }
    });
  };

  const renderBottomButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={Login}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor={theme.color.background}
        barStyle={store.Color.statusBarText}
      />
      <utils.Loader text={"Please wait"} load={loader} />
      <utils.StackHeader props={props} title="login" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          <utils.vectorIcon.FontAwesome5
            name="phone-square-alt"
            color={theme.color.button1}
            size={responsiveHeight(7)}
          />

          <Text style={styles.title}>Continue with phone number</Text>

          <View style={styles.MobileInputContainer}>
            <Image
              source={require("../../assets/images/flag/pakistan.png")}
              style={styles.CountryLogo}
            />

            <Text style={styles.input}>+92</Text>

            <TextInput
              style={[styles.input, { width: "80%" }]}
              maxLength={10}
              placeholderTextColor={theme.color.subTitleLight}
              keyboardType="phone-pad"
              placeholder="3123456789"
              value={phone}
              onChangeText={(val) => {
                setphone(val.replace(/[^0-9]/, ""));
              }}
            />
          </View>
        </View>
      </ScrollView>

      {renderBottomButton()}
      <Toast
        ref={toast}
        position="bottom"
        opacity={0.9}
        style={{ backgroundColor: theme.color.button1 }}
        textStyle={{ color: theme.color.buttonText }}
      />
    </SafeAreaView>
  );
}
