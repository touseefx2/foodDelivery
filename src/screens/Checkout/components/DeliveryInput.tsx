import React from "react";
import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  Linking,
  TextInput,
} from "react-native";
import theme from "../../../theme";
import { styles } from "../styles";
import utils from "../../../utils/index";
import store from "../../../store";
import { observer } from "mobx-react";
import { Permisiions } from "../../../utils/Permissions";
import NetInfo from "@react-native-community/netinfo";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";

export default observer(DeliveryInput);
function DeliveryInput({
  deliveryType,
  address,
  name,
  setName,
  phone,
  setPhone,
  isVerify,
  selectedLocation,
  goToOrderLocation,
  toast,
}) {
  const { appName, setIsLocation } = store.General;
  const { user, resturantDetails } = store.User;
  const addressText = appName + " " + resturantDetails?.loc.address;

  const selectLocation = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        Permisiions.Location.requestLocationPermission(
          setIsLocation,
          goToOrderLocation
        );
      } else {
        toast?.current?.show("Please connect internet");
      }
    });
  };

  const navigatetoGoogleMaps = () => {
    const latLng = `${resturantDetails?.loc?.coords?.latitude},${resturantDetails?.loc?.coords?.longitude}`;
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const url = Platform.select({
      ios: `https://www.google.com/maps/?api=1&query=${addressText}&center=${latLng}`,
      android: `${scheme}${latLng}(${addressText})`,
    });

    Linking.canOpenURL(url)
      .then((supported) => {
        return Linking.openURL(url);
      })
      .catch((err) => {
        console.log("OpenGoogleMap Error:", err);
      });
  };

  return (
    <>
      {user ? (
        <>
          <Text style={styles.sectionsSubTitle}>{name}</Text>

          <Text style={styles.sectionsSubTitle}>+92{phone}</Text>
        </>
      ) : (
        <>
          {/* name input */}

          <TextInput
            editable={user ? false : true}
            style={[
              styles.inputConatiner,
              Platform.OS == "ios" && { height: responsiveHeight(6.2) },
            ]}
            placeholderTextColor={theme.color.subTitleLight}
            placeholder="Enter your name"
            value={name}
            onChangeText={(val) => {
              setName(val);
            }}
          />

          {/* input mobile */}
          <View
            style={[
              styles.inputConatiner,
              {
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <Image
              source={require("../../../assets/images/flag/pakistan.png")}
              style={styles.CountryLogo}
            />

            <Text style={[styles.sectionsSubTitle, { marginTop: 0 }]}>+92</Text>

            <TextInput
              style={styles.mobileInput}
              maxLength={10}
              placeholderTextColor={theme.color.subTitleLight}
              keyboardType="phone-pad"
              placeholder="3123456789"
              value={phone}
              onChangeText={(val) => {
                setPhone(val.replace(/[^0-9]/, ""));
              }}
            />

            {isVerify ? (
              <utils.vectorIcon.AntDesign
                name="checkcircle"
                color={theme.color.button1}
                size={responsiveFontSize(2.35)}
              />
            ) : (
              <View style={{ width: responsiveFontSize(2.35) }} />
            )}
          </View>
        </>
      )}

      {deliveryType.name.toLowerCase().trim() == "delivery" ? (
        <>
          {/* map image */}
          <View>
            <Image
              style={styles.mapimg}
              source={require("../../../assets/images/map/img.png")}
            />
            <utils.vectorIcon.Ionicons
              style={styles.mapPin}
              name="md-location"
              color={theme.color.button1}
              size={responsiveFontSize(2.95)}
            />
          </View>
          {/* adress and change button */}
          <View style={styles.deliveryInputContainer}>
            <View style={{ width: "75%" }}>
              <Text
                style={[
                  styles.sectionsSubTitle,
                  {
                    marginTop: 0,
                    textTransform: "none",
                  },
                ]}
              >
                {address != ""
                  ? address + ", " + selectedLocation.address
                  : "Select your delivery address"}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={selectLocation}
              style={styles.deliverButtonContainer}
            >
              <Text
                style={[
                  styles.sectionsSubTitle,
                  {
                    color: theme.color.buttonText,
                    fontFamily: theme.fonts.fontBold,
                    marginTop: 0,
                  },
                ]}
              >
                {address == "" ? "Select" : "Change"}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          {/* map image */}
          <View>
            <Text style={styles.sectionsMediumTitle}>Pickup Location</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={navigatetoGoogleMaps}
            >
              <Image
                style={[styles.mapimg, { marginTop: responsiveHeight(1.4) }]}
                source={require("../../../assets/images/map/img.png")}
              />
              <utils.vectorIcon.Ionicons
                style={styles.mapPin}
                name="md-location"
                color={theme.color.button1}
                size={responsiveFontSize(2.95)}
              />

              <utils.vectorIcon.FontAwesome5
                style={styles.navigate}
                name="directions"
                color={theme.color.button1}
                size={responsiveFontSize(3.35)}
              />
            </TouchableOpacity>
          </View>
          {/* adress*/}
          <Text style={styles.sectionsSubTitle}>{addressText}</Text>
        </>
      )}
    </>
  );
}
