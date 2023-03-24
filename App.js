import React from "react";
import { useEffect } from "react";
import { AppState } from "react-native";
import stack from "./src/navigation/index";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GlobalFont from "react-native-global-font";
import theme from "./src/theme";
import screens from "./src/screens/index";
import DeviceInfo from "react-native-device-info";
import ConnectivityManager from "react-native-connectivity-status";
import NetInfo from "@react-native-community/netinfo";
import store from "./src/store/index";
import { Provider } from "mobx-react";
import { observer } from "mobx-react";

export default observer(App);
function App() {
  const Stack = createNativeStackNavigator();
  const {
    setIsInternet,
    setIsLocation,
    setApiLevel,
    setAppBuildNumber,
    setAppVersionNumber,
    setAppState,
    isLoading,
  } = store.General;
  const { location } = store.User;

  useEffect(() => {
    GlobalFont.applyGlobal(theme.fonts.fontNormal);
    const unsubscribeNetinfo = NetInfo.addEventListener((state) => {
      setIsInternet(state.isConnected);
    });
    const unsubscribeAppState = AppState.addEventListener(
      "change",
      (appState) => {
        setAppState(appState);
      }
    );
    const unsubscribeConnectivityStatusSubscription =
      ConnectivityManager.addStatusListener(({ eventType, status }) => {
        switch (eventType) {
          case "location":
            setIsLocation(status);
            break;
        }
      });
    setApiLevel(DeviceInfo.getApiLevel());
    setAppBuildNumber(DeviceInfo.getBuildNumber());
    setAppVersionNumber(DeviceInfo.getVersion());

    return () => {
      unsubscribeConnectivityStatusSubscription.remove();
      unsubscribeNetinfo();
      unsubscribeAppState.remove();
    };
  }, []);

  return (
    <Provider {...store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoading && (
            <Stack.Screen name="Splash" component={screens.Splash} />
          )}

          {!isLoading && !location && (
            <Stack.Screen name="Locations" component={stack.LocationStack} />
          )}

          {!isLoading && location && (
            <Stack.Screen name="HomeStack" component={stack.HomeStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
