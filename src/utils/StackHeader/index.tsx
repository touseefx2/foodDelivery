import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import utils from '../index';
import theme from '../../theme';
import {observer} from 'mobx-react';
import store from '../../store';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default observer(StackHeader);
function StackHeader({props, title}) {
  const {isInternet} = store.General;

  const isTitle =
    title == 'setting' ||
    title == 'login' ||
    title == 'otp' ||
    title == 'signup'
      ? false
      : true;

  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <>
      {!isInternet && <utils.InternetMessage />}
      <View style={[styles.header, isTitle && styles.header1]}>
        <TouchableOpacity
          style={styles.back}
          activeOpacity={0.6}
          onPress={goBack}>
          <utils.vectorIcon.Ionicons
            name="chevron-back"
            color={theme.color.subTitle}
            size={responsiveFontSize(3.5)}
          />
        </TouchableOpacity>
        {isTitle && (
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              {title}
            </Text>
          </View>
        )}
      </View>
    </>
  );
}
