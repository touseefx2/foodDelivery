import React from 'react';
import {View, TouchableOpacity, Platform} from 'react-native';
import {styles} from './../styles';
import store from '../../../store/index';
import utils from '../../../utils/index';
import theme from '../../../theme';
import {observer} from 'mobx-react';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

export default observer(Header);
function Header({props, goToChangeLocation, rbSheet}) {
  const {user} = store.User;
  const {isInternet, tagLine} = store.General;

  const goToSearch = () => {
    props.navigation.navigate('Search');
  };

  const goToHelp = () => {
    props.navigation.navigate('Help');
  };

  const goToSetting = () => {
    if (!user) {
      rbSheet?.current?.open();
      return;
    }
    props.navigation.navigate('Setting');
  };

  const activeOpacity = 0.7;
  return (
    <View
      style={[
        styles.headerContainer,
        Platform.OS === 'ios' &&
          (!isInternet || tagLine != '') && {
            top: theme.window.APPBAR_HEIGHT,
          },
      ]}>
      {!isInternet && <utils.InternetMessage color={'red'} />}
      {tagLine != '' && (
        <utils.TagLine isInternet={isInternet} tagLine={tagLine} />
      )}

      <View
        style={[
          styles.header,
          {
            marginTop: responsiveHeight(tagLine != '' || !isInternet ? 1 : 6),
          },
        ]}>
        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={goToChangeLocation}
          style={[styles.icon, {marginLeft: 0}]}>
          <utils.vectorIcon.Entypo
            name="chevron-down"
            color={theme.color.button1}
            size={responsiveFontSize(3.2)}
          />
        </TouchableOpacity>

        <View style={styles.headerRightSection}>
          <TouchableOpacity
            onPress={goToSearch}
            activeOpacity={activeOpacity}
            style={styles.icon}>
            <utils.vectorIcon.AntDesign
              name="search1"
              color={theme.color.button1}
              size={responsiveFontSize(2.8)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={goToHelp}
            activeOpacity={activeOpacity}
            style={styles.icon}>
            <utils.vectorIcon.Feather
              name="help-circle"
              color={theme.color.button1}
              size={responsiveFontSize(2.8)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={goToSetting}
            activeOpacity={activeOpacity}
            style={styles.icon}>
            <utils.vectorIcon.AntDesign
              name="user"
              color={theme.color.button1}
              size={responsiveFontSize(2.8)}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
