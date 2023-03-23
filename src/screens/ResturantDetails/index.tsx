import React, {useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  Alert,
  ScrollView,
  Linking,
} from 'react-native';
import {styles} from './styles';
import {observer} from 'mobx-react';
import store from '../../store/index';
import utils from '../../utils/index';
import theme from '../../theme';
import Toast from 'react-native-easy-toast';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default observer(ResturantDetails);
function ResturantDetails(props) {
  const toast = useRef(null);
  const {resturantDetails} = store.User;
  const {appName} = store.General;
  const {appCover} = store.Food.sliderImages;

  const address = resturantDetails?.loc.address || '';
  const opening_times = resturantDetails?.opening_times || [];

  const renderTitleSection = () => {
    const renderTimes = () => {
      const data = opening_times.map(item => {
        const dayName = item.day || '';
        const openTime = item.open || '';
        const closeTime = item.close || '';
        const time =
          openTime != '' && closeTime != '' ? openTime + ' - ' + closeTime : '';

        return (
          <View style={styles.row2}>
            <View style={{width: '45%'}}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.timeText}>
                {dayName}
              </Text>
            </View>

            <View style={{width: '45%'}}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.timeText, {textAlign: 'right'}]}>
                {time != '' ? time : 'Close'}
              </Text>
            </View>
          </View>
        );
      });

      return data;
    };

    const navigatetoGoogleMaps = () => {
      const label = resturantDetails.loc.address || '';
      const destination = resturantDetails.loc.coords;
      const latLng = `${destination.latitude},${destination.longitude}`;
      const scheme = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
      });
      const url = Platform.select({
        ios: `https://www.google.com/maps/?api=1&query=${label}&center=${latLng}`,
        android: `${scheme}${latLng}(${label})`,
      });

      Linking.canOpenURL(url)
        .then(supported => {
          console.log('GoogleMap support: ', supported);
          if (supported) return Linking.openURL(url);
          else {
            const browser_url =
              Platform.OS == 'ios'
                ? `https://www.google.de/maps/@${latLng}?q=${label}`
                : `https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=${latLng}`;
            return Linking.openURL(browser_url);
          }
        })
        .catch(err => {
          console.log('GoogleMap support error: ', err);
          Alert.alert('', err);
        });
    };

    return (
      <View style={styles.main}>
        <View style={styles.sep} />
        <Text style={styles.title}>{appName}</Text>
        <View style={styles.sep} />

        {address != '' && (
          <>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={navigatetoGoogleMaps}>
              <View style={styles.row}>
                <utils.vectorIcon.Ionicons
                  name="ios-location-outline"
                  color={theme.color.button1}
                  size={responsiveFontSize(2.95)}
                />
                <View style={{width: '92%'}}>
                  <Text style={styles.subTitle}>{address}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.sep} />
          </>
        )}

        {opening_times.length > 0 && (
          <>
            <View style={styles.row}>
              <utils.vectorIcon.Ionicons
                name="time-outline"
                color={theme.color.button1}
                size={responsiveFontSize(2.95)}
              />
              <View style={{width: '92%', paddingRight: 15}}>
                <Text style={styles.subTitle}>Opening times</Text>
                {renderTimes()}
              </View>
            </View>
            <View style={styles.sep} />
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <utils.CoverImagesSlider
        images={appCover || []}
        screen={'resturantDetials'}
        isEmptyVariants={false}
      />
      <utils.CoverImageBack props={props} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderTitleSection()}
      </ScrollView>

      <Toast ref={toast} position="bottom" />
    </View>
  );
}
