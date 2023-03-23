import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Keyboard,
  StatusBar,
  Platform,
} from 'react-native';
import {styles} from './styles';
import {observer} from 'mobx-react';
import store from '../../store/index';
import utils from '../../utils/index';
import theme from '../../theme';
import Toast from 'react-native-easy-toast';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import {Image as ImageCompressor} from 'react-native-compressor';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

export default observer(Signup);
function Signup(props) {
  const toast = useRef(null);
  const callingScreen = props.route.params.screen || '';
  const phone = props.route.params.phone.slice(3);
  const {registerLoader, location, attemptToRegister, notificationToken} =
    store.User;
  const {apiLevel, isInternet} = store.General;

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');

  const [isShowFullImageModal, setIsShowFullImageModal] = useState(false);
  const [fullImageUri, setFullImageUri] = useState('');

  const goToHome = () => {
    props.navigation.navigate('Home');
  };

  const goToCheckout = () => {
    props.navigation.navigate('Checkout');
  };

  const multipleImagePicker = async (check: string) => {
    Keyboard.dismiss();
    try {
      const res = await MultipleImagePicker.openPicker({
        mediaType: 'image',
        isPreview: false,
        singleSelectedMode: true,
      });
      if (res) {
        const {path, fileName, mime} = res;
        ImageCompressor.compress(
          Platform.OS == 'android' && parseInt(apiLevel) < 29
            ? 'file://' + path
            : path,
          {
            compressionMethod: 'auto',
          },
        )
          .then(async res => {
            if (check == 'profile') {
              setImage({
                uri: res,
                type: mime,
                fileName: fileName,
              });
            }
          })
          .catch(err => {
            console.log('ImageCompressor error : ', err);
          });
      }
    } catch (error) {
      console.log('multileImagePicker error : ', error);
    }
  };

  const onClickRegister = () => {
    Keyboard.dismiss();

    if (name.trim() == '') {
      toast?.current?.show('Please enter your name');
      return;
    }

    if (!utils.regularExpression.name.test(name.trim())) {
      toast?.current?.show('Name is inavlid');
      return;
    }

    if (isInternet) {
      attemptToRegister(
        {
          username: name.trim(),
          mobile: '+92' + phone,
          image: image,
          role: 'customer',
          city: location?.city?._id,
          registrationToken: notificationToken,
        },
        goToHome,
        goToCheckout,
        callingScreen,
      );
    } else toast?.current?.show('Please connect internet', 1000);
  };

  const onclickProfile = (check: string) => {
    Keyboard.dismiss();
    if (check == 'viewProfile') {
      setFullImageUri({uri: image.uri});
      setIsShowFullImageModal(true);
      return;
    }
    multipleImagePicker(check);
  };

  const renderBottomButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={registerLoader}
        onPress={onClickRegister}
        style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor={theme.color.background}
        barStyle={store.Color.statusBarText}
      />

      <utils.StackHeader props={props} title="signup" />
      <utils.Loader text={'Please wait'} load={registerLoader} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          <View style={styles.Profile}>
            <View style={styles.ProfileImageContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                disabled={!image ? true : false}
                onPress={() => {
                  onclickProfile('viewProfile');
                }}>
                {!image ? (
                  <utils.vectorIcon.FontAwesome
                    name="user"
                    color={theme.color.buttonText}
                    size={responsiveFontSize(5)}
                  />
                ) : (
                  <Image
                    style={styles.ProfileImage}
                    source={{uri: image?.uri || ''}}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  onclickProfile('profile');
                }}
                style={styles.ImageUploadConatiner}>
                <utils.vectorIcon.Ionicons
                  name="ios-camera"
                  color={theme.color.title}
                  size={responsiveFontSize(2.3)}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.title}>Let’s create your account!</Text>

          <View style={styles.MobileInputContainer}>
            <Image
              source={require('../../assets/images/flag/pakistan.png')}
              style={styles.CountryLogo}
            />

            <Text style={styles.mobileInput}>+92</Text>

            <TextInput
              editable={false}
              style={[styles.mobileInput, {width: '80%'}]}
              maxLength={10}
              placeholderTextColor={theme.color.subTitleLight}
              keyboardType="phone-pad"
              value={phone}
            />
          </View>

          <TextInput
            style={[
              styles.input,
              Platform.OS == 'ios' && {height: responsiveHeight(6.2)},
            ]}
            placeholderTextColor={theme.color.subTitleLight}
            placeholder="Enter your name"
            value={name}
            onChangeText={val => {
              setName(val);
            }}
          />
        </View>
      </ScrollView>

      {renderBottomButton()}

      <utils.FullImage
        isVisible={isShowFullImageModal}
        setIsVisible={setIsShowFullImageModal}
        image={fullImageUri}
        setImage={setFullImageUri}
      />

      <Toast
        ref={toast}
        position="bottom"
        opacity={1}
        style={{backgroundColor: theme.color.button1}}
        textStyle={{color: theme.color.buttonText}}
      />
    </SafeAreaView>
  );
}
