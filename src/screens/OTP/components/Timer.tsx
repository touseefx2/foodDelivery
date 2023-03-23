import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import CountDown from 'react-native-countdown-component';
import styles from '../styles';
import theme from '../../../theme/index';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default function Timer({isFinish, seconds, setFinish, SendOTPCode}) {
  return (
    <TouchableOpacity
      disabled={!isFinish}
      onPress={SendOTPCode}
      activeOpacity={0.6}
      style={styles.Timer}>
      <Text
        style={[
          styles.TimerText,
          {
            color: isFinish ? theme.color.title : theme.color.subTitleLight,
            fontFamily: isFinish
              ? theme.fonts.fontMedium
              : theme.fonts.fontNormal,
          },
        ]}>
        Resend Code
      </Text>
      {!isFinish && (
        <>
          <Text
            style={[styles.TimerText, {color: theme.color.button1, left: 5}]}>
            (
          </Text>
          <CountDown
            size={responsiveFontSize(1.9)}
            until={seconds}
            onFinish={() => setFinish(true)}
            digitStyle={{backgroundColor: 'transparent'}}
            digitTxtStyle={[
              styles.TimerText,
              {color: theme.color.button1, fontFamily: theme.fonts.fontNormal},
            ]}
            timeToShow={['S']}
            timeLabels={{s: null}}
            showSeparator
          />
          <Text
            style={[styles.TimerText, {color: theme.color.button1, left: -5}]}>
            Sec )
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
