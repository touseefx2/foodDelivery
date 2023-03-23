import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import utils from '../../utils/index';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default function MapDot({isInternet}) {
  return (
    <View style={styles.dotPosition}>
      {!isInternet && (
        <View style={styles.dotWarningMessage}>
          <Text style={styles.dotWarningMessageText}>
            No internet connection !
          </Text>
        </View>
      )}
      <View style={styles.dotContainer}>
        <View style={styles.dotPinLocation}>
          <utils.vectorIcon.MaterialIcons
            name="location-pin"
            color={'red'}
            size={responsiveFontSize(3.3)}
          />
        </View>
        <View style={styles.dot} />
      </View>
    </View>
  );
}
