import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Modal,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';
import vectorIcon from './vectorIcon';
import theme from '../theme/index';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

export default function FullImage({isVisible, setIsVisible, image, setImage}) {
  const [isImageLoad, setIsImageLoad] = useState(false);

  const closeModal = () => {
    setIsVisible(false);
    setImage('');
    setIsImageLoad(false);
  };

  return (
    <Modal transparent visible={isVisible} onRequestClose={closeModal}>
      <StatusBar
        animated={false}
        transculent={false}
        backgroundColor="black"
        barStyle={'light-content'}
      />

      <View style={styles.fullImageModalContainer}>
        <Image
          onLoadStart={() => setIsImageLoad(false)}
          onLoad={() => {
            setIsImageLoad(true);
          }}
          resizeMode="contain"
          style={styles.fullImageModalImage}
          source={image}
        />

        {!isImageLoad && (
          <ActivityIndicator
            size={responsiveFontSize(4.5)}
            color={'blue'}
            style={styles.fullImageModalLoader}
          />
        )}

        <TouchableOpacity
          onPress={closeModal}
          style={styles.fullImageModalCross}>
          <vectorIcon.Entypo
            name="cross"
            color="white"
            size={responsiveFontSize(4.5)}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const backgroundColor = 'black';
const styles = StyleSheet.create({
  fullImageModalContainer: {flex: 1, backgroundColor: backgroundColor},
  fullImageModalCross: {
    backgroundColor: backgroundColor,
    width: responsiveFontSize(5),
    height: responsiveFontSize(5),
    borderRadius: responsiveFontSize(5) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top:
      Platform.OS == 'ios'
        ? theme.window.APPBAR_HEIGHT + responsiveHeight(1.6)
        : responsiveHeight(1.6),
    left: 12,
  },
  fullImageModalLoader: {
    top: '50%',
    left: '50%',
    right: '50%',
    bottom: '50%',
    position: 'absolute',
  },
  fullImageModalImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
});
