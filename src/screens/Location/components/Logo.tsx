import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from '../styles';

export default function Logo({appName}) {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.logo}
        source={require('../../../assets/images/logo/img.png')}
      />
      <Text style={styles.title}>{appName}</Text>
    </View>
  );
}
