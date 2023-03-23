import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from '../styles';
import utils from '../../../utils/index';
import theme from '../../../theme';
import {Permisiions} from '../../../utils/Permissions';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default function Footer({
  isCoordinatesExistInPolygons,
  onClickConfirmLocation,
  setIsLocation,
  getCurrentLocation,
  currentLocation,
  goToLocation,
}) {
  const navigateCurrentLocation = () => {
    if (currentLocation)
      goToLocation(
        {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        },
        () => {},
      );
    if (!currentLocation)
      Permisiions.Location.requestLocationPermission(
        setIsLocation,
        getCurrentLocation,
      );
  };

  const renderCurrentLocationIndactor = () => {
    return (
      <TouchableOpacity
        style={styles.currentLocationButton}
        onPress={navigateCurrentLocation}>
        <utils.vectorIcon.MaterialIcons
          name="my-location"
          color={theme.color.buttonText}
          size={responsiveFontSize(3.5)}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      {renderCurrentLocationIndactor()}
      <TouchableOpacity
        style={styles.BottomView}
        onPress={onClickConfirmLocation}
        disabled={!isCoordinatesExistInPolygons}
        activeOpacity={0.8}>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={
            isCoordinatesExistInPolygons
              ? styles.section2Text
              : styles.section2DisbaleText
          }>
          {isCoordinatesExistInPolygons
            ? 'Save Address'
            : 'Oops! This location is outside of our service area'}
        </Text>
      </TouchableOpacity>
    </>
  );
}
