import {Alert, Linking, Platform, PermissionsAndroid} from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from 'react-native-geolocation-service';

const androidLocationEnablerDialogBox = (setIsLocation, getCurrentLocation) => {
  RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
    interval: 10000,
    fastInterval: 5000,
  })
    .then(() => {
      setIsLocation(true);
      getCurrentLocation();
    })
    .catch(err => {
      console.log('androidLocationEnablerDialogBox error : ', err);
    });
};

const hasPermissionIOS = async (setIsLocation, getCurrentLocation) => {
  const isGranted = await Geolocation.requestAuthorization('whenInUse');
  console.log('hasPermissionIOS Res : ', isGranted);
  if (isGranted === 'granted') {
    setIsLocation(true);
    getCurrentLocation();
    return;
  }
  setIsLocation(false);

  if (isGranted === 'disabled') openLocationSetting();
};

const hasPermissionAndroid = async (setIsLocation, getCurrentLocation) => {
  const isGranted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  console.log('hasPermissionAndroid Res : ', isGranted);
  if (isGranted === PermissionsAndroid.RESULTS.GRANTED) {
    androidLocationEnablerDialogBox(setIsLocation, getCurrentLocation);
    return;
  }
  setIsLocation(false);

  if (isGranted === 'never_ask_again') openLocationSetting();
};

function requestLocationPermission(setIsLocation, getCurrentLocation) {
  if (Platform.OS === 'ios') {
    console.log('Requesting iOS Permissions');
    setIsLocation(false);
    hasPermissionIOS(setIsLocation, getCurrentLocation);
    return;
  }
  if (Platform.OS === 'android') {
    console.log('Requesting Android Permissions');
    hasPermissionAndroid(setIsLocation, getCurrentLocation);
  }
}

const openLocationSetting = () => {
  Alert.alert(
    ``,
    `Turn on Location Services to allow application to determine your location.`,
    [
      {
        text: 'Go to Settings',
        onPress: () => {
          Linking.openSettings().catch(() => {
            Alert.alert('Unable to open settings');
          });
        },
      },
      {text: "Don't Use Location", onPress: () => {}},
    ],
  );
};

export const Location = {
  requestLocationPermission,
};
