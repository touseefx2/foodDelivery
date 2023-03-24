import React, { useEffect } from "react";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import { styles } from "./styles";
import { observer } from "mobx-react";
import { create } from "mobx-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import theme from "../../theme";
import * as Animatable from "react-native-animatable";
import store from "../../store/index";
import PushNotification from "react-native-push-notification";
import messaging from "@react-native-firebase/messaging";

const getToken = async () => {
  let tok = await messaging().getToken();
  store.User.addNotificationToken(tok);
};
Platform.OS === "android"
  ? PushNotification.configure({
      onRegister: function (token) {
        store.User.addNotificationToken(token.token);
      },
    })
  : getToken();

export default observer(Splash);
function Splash() {
  const { setIsLoading } = store.General;
  useEffect(() => {
    HydarteStore();
  }, []);
  const HydarteStore = async () => {
    const hydrate = create({ storage: AsyncStorage });
    await hydrate("General", store.General);
    await hydrate("User", store.User);
    await hydrate("Food", store.Food);
    await hydrate("Orders", store.Orders);
    setTimeout(() => {
      setIsLoading(false);
    }, 1700);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={theme.color.background}
        barStyle={store.Color.statusBarText}
      />

      <Animatable.Image
        style={styles.logo}
        duration={1700}
        easing="ease-out"
        animation={"zoomIn"}
        source={require("../../assets/images/logo/img.png")}
      />
    </SafeAreaView>
  );
}
