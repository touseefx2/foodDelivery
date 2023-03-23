import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Keyboard,
  StatusBar,
} from 'react-native';
import {styles} from './styles';
import {observer} from 'mobx-react';
import store from '../../store/index';
import utils from '../../utils/index';
import theme from '../../theme';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default observer(Setting);
function Setting(props) {
  const {user, Logout} = store.User;

  const userName = user.username || '';
  const phone = user.mobile || '';
  const imageSrc =
    user?.image != ''
      ? {uri: user.image}
      : require('../../assets/images/profile/profileimage.png');

  const [isImageLoad, setIsImageLoad] = useState(false);
  const [isShowFullImageModal, setIsShowFullImageModal] = useState(false);
  const [fullImageUri, setFullImageUri] = useState('');

  const goHome = () => {
    props.navigation.navigate('Home');
  };

  const onclickImage = () => {
    Keyboard.dismiss();
    setFullImageUri(imageSrc);
    setIsShowFullImageModal(true);
  };

  const activeOpacity = 0.7;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor={
          !isShowFullImageModal ? theme.color.background : '#2b2b2b'
        }
        barStyle={
          !isShowFullImageModal ? store.Color.statusBarText : 'light-content'
        }
      />
      <utils.StackHeader props={props} title="setting" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section1}>
          <View style={styles.imageView}>
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={user?.image != '' ? false : true}
              onPress={onclickImage}>
              <Image
                onLoadStart={() => {
                  setIsImageLoad(false);
                }}
                onLoad={() => {
                  setIsImageLoad(true);
                }}
                style={styles.image}
                source={imageSrc}
              />
              {!isImageLoad && (
                <ActivityIndicator
                  size={responsiveFontSize(3)}
                  color={theme.color.button1}
                  style={{
                    top: responsiveFontSize(12 / 3),
                    position: 'absolute',
                    alignSelf: 'center',
                  }}
                />
              )}
            </TouchableOpacity>
          </View>

          <View style={{width: '69%'}}>
            <Text
              style={styles.nameTitle}
              numberOfLines={1}
              ellipsizeMode="tail">
              {userName}
            </Text>
            <Text
              style={styles.phoneTitle}
              numberOfLines={1}
              ellipsizeMode="tail">
              +{phone}
            </Text>
          </View>
        </View>

        <View style={styles.section2}>
          <Text style={styles.sectionTitle}>Personal</Text>
        </View>

        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={() => props.navigation.navigate('OrderStack')}
          style={styles.buttonRow}>
          <View style={styles.row90Percent}>
            <utils.vectorIcon.MaterialCommunityIcons
              name="microsoft-xbox-controller-menu"
              color={theme.color.subTitle}
              size={responsiveFontSize(2.95)}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.buttonText}>
              My Orders
            </Text>
          </View>
          <utils.vectorIcon.AntDesign
            name="right"
            color={theme.color.subTitle}
            size={responsiveFontSize(2.7)}
          />
        </TouchableOpacity>
        <View style={styles.separator} />

        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={() => {
            props.navigation.navigate('Favourite');
          }}
          style={styles.buttonRow}>
          <View style={styles.row90Percent}>
            <utils.vectorIcon.Ionicons
              name="heart-circle-sharp"
              color={theme.color.subTitle}
              size={responsiveFontSize(2.95)}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.buttonText}>
              My Favourites
            </Text>
          </View>
          <utils.vectorIcon.AntDesign
            name="right"
            color={theme.color.subTitle}
            size={responsiveFontSize(2.7)}
          />
        </TouchableOpacity>
        <View style={styles.separator} />

        <View style={styles.section3}>
          <Text style={styles.sectionTitle}>General</Text>
        </View>

        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={() => props.navigation.navigate('PromoStack')}
          style={styles.buttonRow}>
          <View style={styles.row90Percent}>
            <utils.vectorIcon.MaterialIcons
              name="money-off"
              color={theme.color.subTitle}
              size={responsiveFontSize(2.95)}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.buttonText}>
              Promos
            </Text>
          </View>
          <utils.vectorIcon.AntDesign
            name="right"
            color={theme.color.subTitle}
            size={responsiveFontSize(2.7)}
          />
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={() => Logout(goHome)}
          style={styles.buttonRow}>
          <View style={styles.row90Percent}>
            <utils.vectorIcon.MaterialCommunityIcons
              name="logout"
              color={theme.color.subTitle}
              size={responsiveFontSize(2.95)}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.buttonText}>
              Logout
            </Text>
          </View>
          <utils.vectorIcon.AntDesign
            name="right"
            color={theme.color.subTitle}
            size={responsiveFontSize(2.7)}
          />
        </TouchableOpacity>

        <View style={[styles.separator, {height: 0}]} />
      </ScrollView>

      <utils.FullImage
        isVisible={isShowFullImageModal}
        setIsVisible={setIsShowFullImageModal}
        image={fullImageUri}
        setImage={setFullImageUri}
      />
    </SafeAreaView>
  );
}
