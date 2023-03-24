import React, { useState } from "react";
import { View, TouchableOpacity, Text, StatusBar } from "react-native";
import { styles } from "./styles";
import theme from "../../theme";
import { responsiveHeight } from "react-native-responsive-dimensions";
import RBSheet from "react-native-raw-bottom-sheet";
import store from "../../store";

export default function UserCheckModal({ props, rbSheet, screen, setIsCart }) {
  const [heightBottomSheet, setHeightBottomSheet] = useState(0);

  const goToLogin = () => {
    rbSheet?.current?.close();
    props.navigation.navigate("Login", { screen: screen });
  };

  const goToGuest = () => {
    rbSheet?.current?.close();
    if (screen == "home") props.navigation.goBack();
    else setIsCart(true);
  };

  const renderLoginButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={goToLogin}
        style={styles.BottomButton}
      >
        <Text style={styles.buttonTextBottom}>Continue with phone number</Text>
      </TouchableOpacity>
    );
  };

  const renderGuestButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={goToGuest}
        style={styles.BottomButton2}
      >
        <Text style={[styles.buttonTextBottom, { color: theme.color.button1 }]}>
          Continue as Guest
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <RBSheet
      ref={rbSheet}
      closeOnPressBack={true}
      openDuration={250}
      closeOnDragDown={true}
      closeOnPressMask={true}
      KeyboardAvoidingView={true}
      customStyles={{
        wrapper: styles.sheetWraper,
        container: {
          ...styles.sheetContainer,
          height:
            heightBottomSheet <= 0
              ? undefined
              : heightBottomSheet + responsiveHeight(7),
        },
        draggableIcon: styles.sheetDragIcon,
      }}
    >
      <StatusBar
        animated={false}
        translucent={screen == "home" ? true : false}
        backgroundColor={
          screen == "home" ? theme.color.button1 : theme.color.background
        }
        barStyle={store.Color.statusBarText}
      />

      <View
        onLayout={(event) => {
          const height = event.nativeEvent.layout.height;
          setHeightBottomSheet(height);
        }}
        style={styles.sheetMainConatiner}
      >
        <Text style={styles.sheetTitle}>Sign up or log in</Text>

        <View style={styles.sheetBottom}>
          {renderLoginButton()}
          <Text style={styles.titleText2}>or</Text>
          {renderGuestButton()}
        </View>
      </View>
    </RBSheet>
  );
}
