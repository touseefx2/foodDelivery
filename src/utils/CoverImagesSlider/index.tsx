import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import ImageSlider from 'react-native-image-slider';
import MaskedView from '@react-native-masked-view/masked-view';
import theme from '../../theme';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import Svg, {Path} from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import utils from '../index';

export default function CoverImagesSlider({images, screen, isEmptyVariants}) {
  const {Width} = theme.window;
  const imageAspectWidth = Width;
  const imageAspectHeight = responsiveHeight(44);
  const curveAdjustment = 10;
  const maskHeight = responsiveHeight(28);
  const scaleFactor = imageAspectWidth / imageAspectHeight;
  const scaledHeight = scaleFactor * maskHeight;
  const controlPointX = Width / 2.0;
  const controlPointY = scaledHeight + curveAdjustment;
  const curveCenterPointY = (controlPointY - maskHeight) / 2;

  const [isShowFullImageModal, setIsShowFullImageModal] = useState(false);
  const [fullImageUri, setFullImageUri] = useState('');

  const imageContainer = isEmptyVariants ? styles.imageConatiner : {};

  return (
    <View style={imageContainer}>
      <MaskedView
        style={[
          styles.mask,
          {
            height: controlPointY - curveCenterPointY,
          },
        ]}
        maskElement={
          <Svg height="100%" width="100%">
            <Path
              d={`M0 0 L${Width} 0 L${Width} ${maskHeight} Q${controlPointX} ${controlPointY} 0 ${maskHeight} Z`}
              fill={'#ffffff'}
            />
          </Svg>
        }>
        {images.length > 0 &&
          (screen == 'home' || screen == 'resturantDetials') && (
            <ImageSlider
              autoPlayWithInterval={2000}
              images={images}
              style={styles.slider}
              customSlide={({index, item, style}) => {
                return (
                  <View style={style} key={index}>
                    <FastImage
                      style={styles.fastImage}
                      //  for using Online Images
                      source={{
                        uri: item,
                        priority: FastImage.priority.high,
                      }}
                      // for using Local Images
                      // source={
                      //   index == 0
                      //     ? require('../../assets/images/cover/img1.jpg')
                      //     : index == 1
                      //     ? require('../../assets/images/cover/img2.jpg')
                      //     : require('../../assets/images/cover/img2.jpg')
                      // }
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                );
              }}
            />
          )}
        {(screen == 'promoDetails' || screen == 'food') && (
          <TouchableOpacity
            style={{flex: 1}}
            activeOpacity={0.9}
            onPress={() => {
              setFullImageUri(images);
              setIsShowFullImageModal(true);
            }}>
            <FastImage
              style={styles.fastImage}
              source={images}
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableOpacity>
        )}

        <utils.FullImage
          isVisible={isShowFullImageModal}
          setIsVisible={setIsShowFullImageModal}
          image={fullImageUri}
          setImage={setFullImageUri}
        />
      </MaskedView>
    </View>
  );
}
