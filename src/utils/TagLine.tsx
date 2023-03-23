import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import theme from '../theme/index';
import utils from './index';
import * as Animatable from 'react-native-animatable';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default function TagLine(props) {
  const [isTaglineShow, setisTaglineShow] = useState(false);

  return (
    <>
      <utils.TagLineModal
        isTaglineShow={isTaglineShow}
        setisTaglineShow={(value: boolean) => setisTaglineShow(value)}
        title={props.tagLine}
      />

      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          setisTaglineShow(true);
        }}
        activeOpacity={0.9}>
        <Animatable.Text
          delay={0}
          duration={5500}
          easing="ease-out"
          animation="zoomIn"
          iterationCount={'infinite'}
          iterationDelay={0}
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.title}>
          {props.tagLine}
        </Animatable.Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.color.Home_Alert_Background_Color,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  title: {
    color: theme.color.Home_Alert_Text_Color,
    fontSize: responsiveFontSize(1.8),
    fontFamily: theme.fonts.fontBold,
  },
});
