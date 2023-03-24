import React, { useEffect, useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Keyboard,
  StatusBar,
  BackHandler,
} from "react-native";
import styles from "./styles";
import { observer } from "mobx-react";
import store from "../../store/index";
import utils from "../../utils/index";
import Toast from "react-native-easy-toast";
import NetInfo from "@react-native-community/netinfo";
import { isPointInPolygon, getCenterOfBounds } from "geolib";
import Cross from "./components/Cross";
import Logo from "./components/Logo";
import Main from "./components/Main";
import theme from "../../theme";
import Geolocation from "react-native-geolocation-service";
import { Permisiions } from "../../utils/Permissions";

export default observer(Location);
function Location(props) {
  const toast = useRef(null);
  const callingScreen = props?.route?.params?.screen || "";
  const { isInternet, isLocation, setIsLocation, appName } = store.General;
  const { setgetDataOnce, setFood, setsliderImages } = store.Food;
  const {
    polygons,
    CityAreaData,
    currentLocation,
    getCitiesandAreas,
    getAllData,
    setLocation,
    setPolygons,
    setCurrentLocation,
    clearCart,
    location,
    setResturnatDetials,
  } = store.User;

  const [loader, setLoader] = useState(false);
  const [isDropDownCity, setIsDropDownCity] = useState(false);
  const [isDropDownArea, setIsDropDownArea] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [cityList, setCityList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [getDataOnce, setGetDataOnce] = useState(false);

  useEffect(() => {
    Permisiions.Location.requestLocationPermission(setIsLocation, () => {});
  }, []);

  useEffect(() => {
    if (isInternet) {
      if (callingScreen != "home") getAllData(setGetDataOnce, () => {});
      else getCitiesandAreas(setGetDataOnce);
    }
  }, [isInternet]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonClick
    );
    return () => {
      subscription.remove();
    };
  }, [callingScreen]);

  useEffect(() => {
    if (
      isLocation &&
      isInternet &&
      cityList.length > 0 &&
      selectedCity == null
    ) {
      getCurrentLocation();
    }
  }, [isLocation, isInternet, cityList, selectedCity]);

  useEffect(() => {
    if (getDataOnce && CityAreaData.length > 0) {
      let cityList = [];
      let polygonsList = [];
      CityAreaData.map((item) => {
        if (item.city) {
          cityList.push(item.city);
        }
        if (item.areas && item.areas.length > 0) {
          item.areas.map((item2) => {
            if (item2.latlngs && item2.latlngs.length > 0) {
              const coordinatesPoints = item2.latlngs.map(({ lat, lng }) => ({
                latitude: parseFloat(lat),
                longitude: parseFloat(lng),
              }));

              polygonsList.push({
                _id: item2._id,
                area: item2,
                latlngs: coordinatesPoints,
                city: item.city,
              });
            }
          });
        }
      });
      setCityList(cityList);
      setPolygons(polygonsList);
    }
    if (getDataOnce && CityAreaData.length <= 0) {
      setCityList([]);
      setAreaList([]);
      setPolygons([]);
      setSelectedCity(null);
      setSelectedArea(null);
      setSelectedLocation(null);
    }
  }, [CityAreaData, getDataOnce]);

  function handleBackButtonClick() {
    if (!props.navigation.isFocused()) {
      return false;
    }
    if (callingScreen != "home") {
      BackHandler.exitApp();
      return;
    }

    goBack();

    return true;
  }

  const getCurrentLocation = () => {
    setLoader(true);
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
        isCurrentLocationExistInPolygons({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log("getCurrentLocation error : ", error.message);
        setLoader(false);
        setCityInList("first", null);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
      }
    );
  };

  const setCityInList = (check, city) => {
    setLoader(false);
    const isFirst = check == "first" ? true : false;
    const areaLists = CityAreaData.find(function (item) {
      if (isFirst) return item.city._id === cityList[0]._id;
      else return item.city._id === city._id;
    });
    setAreaList(areaLists.areas);
    const selCity = isFirst ? cityList[0] : city;
    if (isFirst) getCenterCoordinatesOfPolygons(areaLists.areas[0], selCity);
    else isCurrentLocationExistInAreaPolygon(areaLists.areas[0], selCity);
  };

  const getCenterCoordinatesOfPolygons = (area, city) => {
    const coordsPoints = area.latlngs.map(({ lat, lng }) => ({
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
    }));
    const coords = getCenterOfBounds(coordsPoints);
    if (coords) {
      setSelectedLocation({
        city: city,
        area: area,
        coords: {
          lat: coords.latitude,
          long: coords.longitude,
        },
      });
    }
    setSelectedCity(city);
    setSelectedArea(area);
  };

  const isCurrentLocationExistInPolygons = (currentLocationPoints) => {
    let isPointExist = false;
    if (polygons.length > 0 && CityAreaData.length > 0) {
      for (let index = 0; index < polygons.length; index++) {
        const element = polygons[index];
        isPointExist = isPointInPolygon(currentLocationPoints, element.latlngs);
        if (isPointExist) {
          isPointExist = true;
          setLoader(false);
          setSelectedLocation({
            city: element.city,
            area: element.area,
            coords: {
              lat: currentLocationPoints.latitude,
              long: currentLocationPoints.longitude,
            },
          });
          setSelectedCity(element.city);
          setSelectedArea(element.area);
          const areaLists = CityAreaData.find(function (item) {
            return item.city._id === element.city._id;
          });
          setAreaList(areaLists.areas);
          break;
        }
      }
      console.log("ISPointInPolygon: ", isPointExist);
      if (!isPointExist) {
        setCityInList("first", null);
        return;
      }
    } else {
      setLoader(false);
    }
  };

  const isCurrentLocationExistInAreaPolygon = (area, city) => {
    if (!currentLocation) {
      getCenterCoordinatesOfPolygons(area, city);
      return;
    }

    const point = {
      latitude: currentLocation?.coords.latitude,
      longitude: currentLocation?.coords.longitude,
    };
    const isPointExist = isPointInPolygon(point, area.latlngs);
    console.log("ISPointInAreaPolygon: ", isPointExist);
    if (isPointExist) {
      setSelectedArea(area);
      setSelectedCity(city);
      setSelectedLocation({
        city: city,
        area: area,
        coords: {
          lat: point.latitude,
          long: point.longitude,
        },
      });
    } else {
      getCenterCoordinatesOfPolygons(area, city);
    }
  };

  const closeAllDropDown = () => {
    Keyboard.dismiss();
    setIsDropDownArea(null);
    setIsDropDownCity(null);
  };

  const goBack = () => {
    closeAllDropDown();
    props.navigation.goBack();
  };

  const locateOnMap = () => {
    closeAllDropDown();
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        if (selectedCity != null)
          props.navigation.navigate("Map", {
            city: selectedCity,
            area: selectedArea,
            selectedLocation: selectedLocation,
            setSelectedLocation: setSelectedLocation,
            setcity: setSelectedCity,
            setarea: setSelectedArea,
          });
        else toast?.current?.show("Please select city", 1000);
      } else {
        toast?.current?.show("Please connect internet", 1000);
      }
    });
  };

  const onClickConfirm = () => {
    closeAllDropDown();
    if (selectedCity == null) {
      toast?.current?.show("Please select city", 1000);
      return;
    }
    if (selectedArea == null) {
      toast?.current?.show("Please select area", 1000);
      return;
    }

    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        setgetDataOnce(false);
        setFood([]);
        setsliderImages(null);
        setResturnatDetials(null);
        clearCart();
        setLocation(selectedLocation);
        if (callingScreen == "home") {
          props.route.params.setIsReferesh(true);
          props.route.params.setDistance(0);
          props.navigation.goBack();
        }
      } else {
        toast?.current?.show("Please connect internet", 1000);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor={theme.color.background}
        barStyle={store.Color.statusBarText}
      />
      <utils.Loader load={loader} text="Please wait" />
      {!isInternet && <utils.InternetMessage />}
      <Cross goBack={goBack} location={location} />
      <ScrollView>
        <Logo appName={appName} />
        <Main
          closeAllDropDown={closeAllDropDown}
          isDropDownCity={isDropDownCity}
          setIsDropDownCity={setIsDropDownCity}
          selectedCity={selectedCity}
          isDropDownArea={isDropDownArea}
          setIsDropDownArea={setIsDropDownArea}
          selectedArea={selectedArea}
          onClickConfirm={onClickConfirm}
          locateOnMap={locateOnMap}
          cityList={cityList}
          areaList={areaList}
          isCurrentLocationExistInAreaPolygon={
            isCurrentLocationExistInAreaPolygon
          }
          setCityInList={setCityInList}
          toast={toast}
        />
      </ScrollView>
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
