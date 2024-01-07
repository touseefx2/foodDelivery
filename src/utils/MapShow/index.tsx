import React from "react";
import theme from "../../theme";
import MapView, { PROVIDER_GOOGLE, Polygon } from "react-native-maps";
import { toJS } from "mobx";
import { Marker } from "react-native-maps";
import utils from "../../utils/index";
import { styles } from "./styles";
import { responsiveFontSize } from "react-native-responsive-dimensions";

export default function MapShow({
  currentLocation,
  mapRef,
  polygons,
  isRegionEnable,
  setIsMapReady,
  checkIsRegionPointsExistInPolygons,
}) {
  const onRegionChangeComplete = (points) => {
    if (isRegionEnable) {
      checkIsRegionPointsExistInPolygons({
        latitude: points.latitude,
        longitude: points.longitude,
      });
    }
  };

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      ref={mapRef}
      initialRegion={{
        latitude: 33.64186666892545,
        longitude: 73.03620575372447,
        latitudeDelta: theme.window.LATITUDE_DELTA,
        longitudeDelta: theme.window.LONGITUDE_DELTA,
      }}
      showsBuildings={true}
      zoomEnabled={true}
      showsCompass={false}
      onMapReady={() => {
        setIsMapReady(true);
      }}
      onRegionChangeComplete={onRegionChangeComplete}
    >
      {polygons.length > 0 &&
        polygons.map((item) => (
          <Polygon
            key={item._id}
            coordinates={toJS(item.latlngs)}
            fillColor="rgba(0,0,0,0.1)"
            strokeColor="silver"
          />
        ))}
      {currentLocation && (
        <CurrentPositionMarker currentLocation={currentLocation} />
      )}
    </MapView>
  );
}

function CurrentPositionMarker({ currentLocation }) {
  return (
    <Marker
      identifier="current location"
      coordinate={currentLocation?.coords}
      pinColor={theme.color.button1}
    >
      <utils.vectorIcon.Ionicons
        name="md-navigate-circle"
        color={theme.color.button1}
        size={responsiveFontSize(2.95)}
      />
    </Marker>
  );
}
