import React from 'react';
import {View, TouchableOpacity, Text, Alert} from 'react-native';
import styles from '../styles';
import utils from '../../../utils/index';
import theme from '../../../theme';
import RNGooglePlaces from 'react-native-google-places';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {Permisiions} from '../../../utils/Permissions';

export default function Header({
  mapRef,
  currentLocation,
  setIsLocation,
  goToLocation,
  getCurrentLocation,
  goBack,
}) {
  const onClickToGoogleSearch = () => {
    RNGooglePlaces.openAutocompleteModal(
      {
        initialQuery: '',
        country: 'PK',
        useOverlay: false,
      },
      ['location'],
    )
      .then(place => {
        console.log('RNGooglePlaces Res : ', place);
        if (place) {
          mapRef?.current?.animateToRegion({
            latitude: place?.location?.latitude || 0,
            longitude: place?.location?.longitude || 0,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          });
        }
      })
      .catch(error => {
        console.log('RNGooglePlaces error : ', error.message);
        if (
          error.message.includes(
            'You must enable Billing on the Google Cloud Project',
          )
        ) {
          Alert.alert('', 'Please enable billing account of google api key');
        }
      });
  };

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

  return (
    <View style={styles.headerContainer}>
      <Cross goBack={goBack} />
      <GoogleSearch goToGoogleSearch={onClickToGoogleSearch} />
      <CurrentLocationIndactor
        navigateCurrentLocation={navigateCurrentLocation}
      />
    </View>
  );
}

function Cross({goBack}) {
  return (
    <TouchableOpacity style={styles.crossButton} onPress={goBack}>
      <utils.vectorIcon.Entypo
        name="cross"
        color={theme.color.button1}
        size={responsiveFontSize(3.5)}
      />
    </TouchableOpacity>
  );
}

function GoogleSearch({goToGoogleSearch}) {
  return (
    <TouchableOpacity style={styles.googleSearchBar} onPress={goToGoogleSearch}>
      <utils.vectorIcon.FontAwesome5
        name="search-location"
        color={theme.color.button1}
        size={responsiveFontSize(2.7)}
      />
      <Text style={styles.googleSearchBarText}>Search By Google</Text>
    </TouchableOpacity>
  );
}

function CurrentLocationIndactor({navigateCurrentLocation}) {
  return (
    <TouchableOpacity
      style={styles.currentLocationButton}
      onPress={navigateCurrentLocation}>
      <utils.vectorIcon.MaterialIcons
        name="my-location"
        color={theme.color.button1}
        size={responsiveFontSize(3.5)}
      />
    </TouchableOpacity>
  );
}
