import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  Platform,
} from 'react-native';
import styles from '../styles';
import utils from '../../../utils/index';
import theme from '../../../theme';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

export default function Header({
  closeMap,
  address,
  setAddress,
  city,
  area,
  isCoordinatesExistInPolygons,
  location,
  goToLocation,
}) {
  const regionName =
    utils.functions.capitalizeTheFirstLetterOfEachWord(area.name.trim()) +
    ', ' +
    utils.functions.capitalizeTheFirstLetterOfEachWord(city.name.trim());

  const rendercross = () => {
    return (
      <TouchableOpacity style={styles.crossButton} onPress={closeMap}>
        <utils.vectorIcon.Ionicons
          name="chevron-back"
          color={theme.color.button1}
          size={responsiveFontSize(3.2)}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.headerPosition}>
      {rendercross()}
      <View style={{marginTop: responsiveHeight(1.4)}}>
        <Text style={styles.fieldText}>ADDRESS</Text>

        <TextInput
          style={[
            styles.input,
            Platform.OS == 'ios' && {height: responsiveHeight(6.2)},
          ]}
          placeholderTextColor={theme.color.subTitle}
          placeholder="Enter your complete street address"
          value={address}
          onChangeText={val => {
            setAddress(val);
          }}
        />
        <Text style={styles.fieldText}>REGION</Text>

        <View style={styles.adressWrapper}>
          <View style={{width: '85%'}}>
            <Text style={styles.adressTitle}>{regionName}</Text>
          </View>
          <TouchableOpacity
            disabled={isCoordinatesExistInPolygons}
            activeOpacity={0.7}
            onPress={() =>
              goToLocation(
                {
                  latitude: location.coords.lat,
                  longitude: location.coords.long,
                },
                () => {},
              )
            }
            style={{
              width: '10%',
              alignItems: 'flex-end',
            }}>
            {!isCoordinatesExistInPolygons && (
              <Image
                source={require('../../../assets/images/navigate/img.png')}
                style={styles.navigate}
              />
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.disableText}>
          To change your area, please do it from the main menu screen.
        </Text>
      </View>
    </View>
  );
}
