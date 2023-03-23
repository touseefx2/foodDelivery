import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../styles';
import utils from '../../../utils/index';
import theme from '../../../theme';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default function Footer({
  isCoordinatesExistInPolygons,
  area,
  city,
  onClickConfirmLocation,
}) {
  const areaName = isCoordinatesExistInPolygons ? area.name : 'Oops!';
  const cityName = isCoordinatesExistInPolygons
    ? city.name
    : 'This location is outside of our service area.';

  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerSection1}>
        <View style={styles.locationIconConatiner}>
          <utils.vectorIcon.Entypo
            name="location-pin"
            color={theme.color.button1}
            size={responsiveFontSize(4.8)}
          />
        </View>
        <View style={styles.textAreaContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.textAreaTitle}>
            {areaName}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.textAreaSubTitle}>
            {cityName}
          </Text>
        </View>
      </View>

      {isCoordinatesExistInPolygons && (
        <TouchableOpacity
          onPress={onClickConfirmLocation}
          activeOpacity={0.6}
          style={styles.footerButtonContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.footerButtonText}>
            confirm location
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
