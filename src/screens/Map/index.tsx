import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import styles from "./styles";
import { observer } from "mobx-react";
import store from "../../store/index";
import theme from "../../theme";
import Toast from "react-native-easy-toast";
import { isPointInPolygon } from "geolib";
import Geolocation from "react-native-geolocation-service";
import Footer from "./components/Footer";
import Header from "./components/Header";
import utils from "../../utils";

export default observer(Map);
interface Props {
  route: any;
}
function Map(props: Props) {
  let mapRef = useRef(null);
  const toast = useRef(null);

  const { LATITUDE_DELTA, LONGITUDE_DELTA } = theme.window;
  const { isInternet, setIsLocation } = store.General;
  const { currentLocation, setCurrentLocation, polygons } = store.User;
  const [coordinates, setCoordinates] = useState(
    props.route.params.selectedLocation?.coords || null
  );
  const [isCoordinatesExistInPolygons, setIsCoordinatesExistInPolygons] =
    useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [isRegionEnable, setIsRegionEnable] = useState(false);
  const [city, setCity] = useState(props.route.params.city || null);
  const [area, setArea] = useState(props.route.params.area || null);
  useEffect(() => {
    if (isMapReady && coordinates)
      goToLocation(
        {
          latitude: coordinates?.lat,
          longitude: coordinates?.long,
        },
        setIsCoordinatesExistInPolygons
      );
  }, [isMapReady]);

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
        console.log("getCurrentLocation  error : ", error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
      }
    );
  };

  const checkIsRegionPointsExistInPolygons = (point) => {
    if (polygons.length > 0) {
      for (let index = 0; index < polygons.length; index++) {
        const item = polygons[index];
        if (item.latlngs.length > 0) {
          const isPointExist = isPointInPolygon(point, item.latlngs);
          if (isPointExist) {
            setIsCoordinatesExistInPolygons(true);
            setCoordinates(point);
            setCity(item.city);
            setArea(item.area);
            break;
          }
          setIsCoordinatesExistInPolygons(false);
        }
      }
    }
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const onClickConfirmLocation = () => {
    props.route.params.setSelectedLocation({
      area: area,
      city: city,
      coords: { lat: coordinates.latitude, long: coordinates.longitude },
    });
    props.route.params.setcity(city);
    props.route.params.setarea(area);
    goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor={theme.color.background}
        barStyle={store.Color.statusBarText}
      />
      <utils.MapShow
        currentLocation={currentLocation}
        mapRef={mapRef}
        polygons={polygons}
        isRegionEnable={isRegionEnable}
        setIsMapReady={setIsMapReady}
        checkIsRegionPointsExistInPolygons={checkIsRegionPointsExistInPolygons}
      />
      <Header
        mapRef={mapRef}
        currentLocation={currentLocation}
        setIsLocation={setIsLocation}
        goToLocation={goToLocation}
        getCurrentLocation={getCurrentLocation}
        goBack={goBack}
      />
      <Footer
        isCoordinatesExistInPolygons={isCoordinatesExistInPolygons}
        city={city}
        area={area}
        onClickConfirmLocation={onClickConfirmLocation}
      />
      <utils.MapDot isInternet={isInternet} />
      <Toast
        ref={toast}
        position="center"
        opacity={0.9}
        style={{ backgroundColor: theme.color.button1 }}
        textStyle={{ color: theme.color.buttonText }}
      />
    </SafeAreaView>
  );
}
