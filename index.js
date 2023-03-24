import { AppRegistry, LogBox } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { configure } from "mobx";
import store from "./src/store/index";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";

requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Messaging Authorization Status:", authStatus);
  }
};
requestUserPermission();
PushNotification.createChannel(
  {
    channelId: "fdc2",
    channelName: "fdcname2",
    channelDescription: "A channel to categorise your notifications",
    playSound: true,
    soundName: "sound.mp3",
    importance: 4,
    vibrate: true,
  },
  (created) =>
    console.log(`PushNotification createChannel Returned '${created}'`)
);

messaging().onMessage(async (notification) => {
  console.log("ActiveState Notification  : ", notification);
  let data = notification.data ? notification.data : null;
  let topic = data?.topic || "";
  let title = notification.notification.title || "";
  let msg = notification.notification.body || "";

  if (topic !== "settings updated") {
    PushNotification.localNotification({
      channelId: "fdc2",
      message: msg,
      title: title,
    });

    if (store.User.user) store.Orders.getOrderById();
  } else store.Food.getSliderImagesOnly();

  if (topic == "promo") store.Promos.getPromoById();
});

messaging().setBackgroundMessageHandler(async (notification) => {
  console.log("BackgroundState Notification : ", notification);
  let data = notification.data ? notification.data : null;
  let topic = data?.topic || "";

  if (topic !== "settings updated") {
    if (store.User.user) store.Orders.getOrderById();
  } else store.Food.getSliderImagesOnly();

  if (topic == "promo") store.Promos.getPromoById();
});

configure({ useProxies: "never", enforceActions: "never" });
LogBox.ignoreAllLogs(true);
AppRegistry.registerComponent(appName, () => App);
