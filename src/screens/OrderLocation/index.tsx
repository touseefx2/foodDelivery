import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, Alert, Keyboard } from "react-native";
import styles from "./styles";
import { observer } from "mobx-react";
import store from "../../store/index";
import utils from "../../utils/index";
import theme from "../../theme";
import Toast from "react-native-easy-toast";
import { isPointInPolygon } from "geolib";
import Geolocation from "react-native-geolocation-service";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default observer(OrderLocation);

function OrderLocation(props) {
  const toast = useRef(null);
  const mapRef = useRef(null);
  const { LONGITUDE_DELTA, LATITUDE_DELTA } = theme.window;
  const { isInternet, setIsLocation } = store.General;
  const { currentLocation, setCurrentLocation, location, polygons } =
    store.User;
  const selectedLocation = props.route.params.selectedLocation;
  const city = location?.city;
  const area = location?.area;
  const polygon = polygons.filter((item) => item.area._id == area._id) || [];

  const [isRegionEnable, setIsRegionEnable] = useState(false);
  const [isCoordinatesExistInPolygons, setIsCoordinatesExistInPolygons] =
    useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [address, setAddress] = useState(props.route.params.address);
  const [coords, setCoords] = useState({
    latitude: selectedLocation?.latitude || location?.coords.lat,
    longitude: selectedLocation?.longitude || location?.coords.long,
  });

  useEffect(() => {
    if (isMapReady) goToLocation(coords, setIsCoordinatesExistInPolygons);
  }, [isMapReady]);

  const closeMap = () => {
    props.navigation.goBack();
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        setCurrentLocation({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        });
        goToLocation(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          () => {}
        );
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

  const goToLocation = (points, setCoordinatesExistInPolygons) => {
    points.latitudeDelta = LATITUDE_DELTA * Number(30 / 1000);
    points.longitudeDelta = LONGITUDE_DELTA * Number(30 / 1000);
    mapRef?.current?.animateToRegion(points, 400);
    setCoordinatesExistInPolygons(true);
    if (!isRegionEnable) {
      setTimeout(() => {
        setIsRegionEnable(true);
      }, 800);
    }
  };

  const checkIsRegionPointsExistInPolygons = (point) => {
    if (polygon.length > 0) {
      for (let index = 0; index < polygon.length; index++) {
        const item = polygon[index];
        if (item.latlngs.length > 0) {
          const isPointExist = isPointInPolygon(point, item.latlngs);
          if (isPointExist) {
            setIsCoordinatesExistInPolygons(true);
            setCoords(point);
            break;
          }
          setIsCoordinatesExistInPolygons(false);
        }
      }
    }
  };

  const onClickConfirmLocation = () => {
    Keyboard.dismiss();
    if (address.trim() == "") {
      Alert.alert("", "Please enter your complete street address");
      return;
    }
    props.route.params.setSelectedLocation({
      latitude: coords.latitude,
      longitude: coords.longitude,
      address: area.name + ", " + city.name,
    });
    props.route.params.setAddress(address.trim());
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <utils.MapShow
        currentLocation={currentLocation}
        mapRef={mapRef}
        polygons={polygon}
        isRegionEnable={isRegionEnable}
        setIsMapReady={setIsMapReady}
        checkIsRegionPointsExistInPolygons={checkIsRegionPointsExistInPolygons}
      />
      <Header
        closeMap={closeMap}
        address={address}
        setAddress={setAddress}
        city={city}
        area={area}
        isCoordinatesExistInPolygons={isCoordinatesExistInPolygons}
        location={location}
        goToLocation={goToLocation}
      />
      <Footer
        isCoordinatesExistInPolygons={isCoordinatesExistInPolygons}
        onClickConfirmLocation={onClickConfirmLocation}
        setIsLocation={setIsLocation}
        getCurrentLocation={getCurrentLocation}
        currentLocation={currentLocation}
        goToLocation={goToLocation}
      />
      <utils.MapDot isInternet={isInternet} />
      <Toast ref={toast} position="center" opacity={0.8} />
    </SafeAreaView>
  );
}
