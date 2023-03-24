import React, { useEffect, useState, useRef } from "react";
import { View, BackHandler, Alert } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { styles } from "./styles";
import { observer } from "mobx-react";
import store from "../../store/index";
import utils from "../../utils/index";
import theme from "../../theme";
import DynamicTabView from "react-native-dynamic-tab-view";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import Toast from "react-native-easy-toast";
import { ActivityIndicator } from "react-native-paper";
import { Permisiions } from "../../utils/Permissions";
import TitleSection from "./components/TitleSection";
import Header from "./components/Header";
import StatusBarShow from "./components/StatusBarShow";

export default observer(Home);
function Home(props) {
  const rbSheet = useRef(null);
  const toast = useRef(null);
  const {
    isInternet,
    GooglApiKey,
    tagLine,
    setAppName,
    setTagLine,
    setIsLocation,
  } = store.General;
  const {
    cart,
    clearCart,
    updateCart,
    user,
    currentLocation,
    CityAreaData,
    location,
    resturantDetails,
    setResturnatDetials,
    setCurrentLocation,
    getAllData,
  } = store.User;
  const { food, foodLoader, getDataOnce, sliderImages } = store.Food;

  const [distance, setDistance] = useState(0);
  const [getDistanceOnce, setGetDistanceOnce] = useState(true);
  const [isReferesh, setIsReferesh] = useState(true);

  useEffect(() => {
    Permisiions.Location.requestLocationPermission(
      setIsLocation,
      !currentLocation ? getCurrentLocation : () => {}
    );
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonClick
    );

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (isReferesh && !getDataOnce && isInternet) {
      onRefresh();
    }
  }, [isInternet, isReferesh, getDataOnce]);

  useEffect(() => {
    if (currentLocation && resturantDetails && isInternet && !getDistanceOnce) {
      fetchDistanceBetweenTwoPoints(
        currentLocation.coords,
        resturantDetails?.loc?.coords
      );
    }
  }, [currentLocation, resturantDetails, isInternet, getDistanceOnce]);

  useEffect(() => {
    if (sliderImages) {
      setResturnatDetials(sliderImages?.resturantDetails);
      setAppName(sliderImages?.appName);
      setTagLine(sliderImages?.tagLine);
    }
  }, [sliderImages]);

  useEffect(() => {
    if (getDataOnce) {
      const isCityExits = CityAreaData.find(
        (item) => item.city._id == location.city._id
      );

      if (isCityExits) {
        const areasList = isCityExits.areas || [];
        if (areasList.length > 0) {
          const isAreaExits = areasList.find(
            (item) => item._id == location.area._id
          );
          if (isAreaExits) return;
        }
      }
      store.User.setLocation(null);
    }
  }, [CityAreaData, getDataOnce]);

  useEffect(() => {
    if (user && !user.isActive) {
      Alert.alert(
        "",
        "Your account has been blocked. Please contact customer support",
        [
          {
            text: "OK",
            onPress: () =>
              store.User.Logout(() => {
                props.navigation.navigate("Home");
              }),
          },
        ]
      );
    }
  }, [user]);

  useEffect(() => {
    let totalBill = 0;
    let totalItems = 0;
    cart.data.forEach((item) => {
      totalBill = totalBill + parseFloat(item.bill);
      totalItems = totalItems + parseFloat(item.quantity);
    });
    updateCart(totalBill, totalItems);
  }, [cart]);

  function handleBackButtonClick() {
    if (!props.navigation.isFocused()) {
      return false;
    }

    Alert.alert("", "Are you sure you want to exit the app?", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          BackHandler.exitApp();
          clearCart();
        },
      },
    ]);
    return true;
  }

  const onRefresh = () => {
    if (isInternet) getAllData(() => {}, setGetDistanceOnce);
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        setCurrentLocation({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: theme.window.LATITUDE_DELTA,
            longitudeDelta: theme.window.LONGITUDE_DELTA,
          },
        });
      },
      (error) => {
        console.log("getCurrentLocation error : ", error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
      }
    );
  };

  const fetchDistanceBetweenTwoPoints = (p1, p2) => {
    var urlToFetchDistance =
      "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric?mode=driving&origins=" +
      p1.latitude +
      "," +
      p1.longitude +
      "&destinations=" +
      p2.latitude +
      "%2C" +
      p2.longitude +
      "&key=" +
      GooglApiKey;

    fetch(urlToFetchDistance)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("fetchDistanceBetweenTwoPoints Res ", res);
        if (res && res?.rows.length > 0 && res.rows[0].elements[0].distance) {
          const distanceInMeter = res.rows[0].elements[0].distance.value; //In meter
          const distanceInKm = distanceInMeter / 1000; //Meter to Km
          setDistance(distanceInKm);
        } else setDistance(0);

        setGetDistanceOnce(true);
      })
      .catch((err) => {
        console.log("fetchDistanceBetweenTwoPoints error: ", err);
      });
  };

  const goToChangeLocation = () => {
    props.navigation.navigate("Location", {
      screen: "home",
      setIsReferesh,
      setDistance,
    });
    setIsReferesh(false);
  };

  const renderTab = (data) => {
    if (data.name != "empty")
      return (
        <utils.FoodCard data={data} toast={toast} screen="home" separator={2} />
      );
    else
      return (
        <utils.EmptyData
          message="Currently no products are available here"
          screen={"home"}
        />
      );
  };

  const emptyMessage =
    !sliderImages || !resturantDetails
      ? "Currently no branch are available here"
      : "Currently no menu are available here";

  return (
    <View style={styles.container}>
      <StatusBarShow isInternet={isInternet} tagLine={tagLine} />
      <utils.CoverImagesSlider
        images={sliderImages ? sliderImages.appCover : []}
        screen={"home"}
        isEmptyVariants={false}
      />
      <Header
        props={props}
        goToChangeLocation={goToChangeLocation}
        rbSheet={rbSheet}
      />
      <TitleSection props={props} distance={distance} />

      {!foodLoader && food.length <= 0 && getDataOnce && (
        <utils.EmptyData message={emptyMessage} screen={"home"} />
      )}

      {food.length > 0 && (
        <DynamicTabView
          refreshing={foodLoader}
          onRefresh={onRefresh}
          data={food}
          defaultIndex={0}
          renderTab={renderTab}
          containerStyle={[
            styles.tabViewContainer,
            { paddingBottom: cart.data.length > 0 ? responsiveHeight(1) : 0 },
          ]}
          headerTextStyle={styles.tabViewHeaderTextTitle}
          headerBackgroundColor={theme.color.background}
          headerUnderlayColor={theme.color.button1}
        />
      )}

      {foodLoader && food.length <= 0 && (
        <ActivityIndicator
          size={responsiveFontSize(4)}
          color={theme.color.button1}
          style={styles.emptyLoader}
        />
      )}

      {cart.data.length > 0 && <utils.FooterCart nav={props.navigation} />}
      <utils.UserCheckModal
        props={props}
        rbSheet={rbSheet}
        screen="home"
        setIsCart={() => {}}
      />
      <Toast
        ref={toast}
        position="bottom"
        opacity={1}
        style={styles.toast}
        textStyle={{ color: theme.color.buttonText }}
      />
    </View>
  );
}
