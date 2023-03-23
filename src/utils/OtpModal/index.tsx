import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native';
import theme from '../../theme/index';
import store from '../../store/index';
import Modal from 'react-native-modal';
import CountDown from 'react-native-countdown-component';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import auth from '@react-native-firebase/auth';
import NetInfo from '@react-native-community/netinfo';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import styles from './styles';

export default function OtpModal(props) {
  const CELL_COUNT = 6;
  const activeOpacity = 0.8;
  const isModal = props.isModal;
  const mobile = '+92' + props.phone || '';
  const {resendOTPTime} = store.General;

  const setisModal = isShow => {
    props.setisModal(isShow);
  };
  const setisVerify = (isVerify, phone) => {
    props.setisVerify(isVerify, phone);
  };

  const [loader, setloader] = useState(false);
  const [vLoader, setvLoader] = useState(false);
  const [sendCodeOnce, setsendCodeOnce] = useState(false);
  const [seconds, setSeconds] = useState(resendOTPTime);
  const [isFinish, setFinish] = useState(false);
  const [confirmResult, setConfirmResult] = useState(null);
  const [value, setValue] = useState('');
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});

  useEffect(() => {
    const onAuthStateChangedUnsubscribe = auth().onAuthStateChanged(
      async user => {
        if (user) {
          setvLoader(false);

          NetInfo.fetch().then(state => {
            if (state.isConnected) {
              if (auth().currentUser) {
                auth().currentUser.delete();
              }
              gotoNext();
            } else Alert.alert('', 'Please connect internet.');
          });
        }
      },
    );
    return () => {
      onAuthStateChangedUnsubscribe();
    };
  }, []);

  const closeModal = () => {
    if (!loader) setisModal(false);
  };

  async function SendOtpCode() {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setloader(true);
        setValue('');

        auth()
          .signInWithPhoneNumber(mobile)
          .then(res => {
            console.log('confirmation : ', res);
            setloader(false);
            setSeconds(resendOTPTime);
            setsendCodeOnce(true);
            setConfirmResult(res);
            setFinish(false);
          })
          .catch(error => {
            console.log('signInWithPhoneNumber  error : ', error);
            setloader(false);
            setValue('');

            var errorMessage = error.message;
            var si = errorMessage.indexOf(']') + 1;
            var ei = errorMessage.length - 1;
            const message = errorMessage.substr(si, ei);
            Alert.alert('Failed', message);
          });

        return;
      } else {
        Alert.alert('Network Error', 'Please check your internet connection');
      }
    });
  }

  async function verfyCode() {
    try {
      Keyboard.dismiss();
      setvLoader(true);
      await confirmResult.confirm(value);
    } catch (error) {
      console.log('Verifyication Code  error: ', error);
      setvLoader(false);
      setValue('');
      let errorMessage = '';
      if (error.code == 'auth/unknown') {
        errorMessage =
          'Cannot create PhoneAuthCredential without either verificationProof, sessionInfo, temporary proof, or enrollment ID !';
      } else if (error.code == 'auth/invalid-verification-code') {
        errorMessage =
          'Invalid verification code, Please enter correct confirmation code !';
      } else if (error.code == 'auth/session-expired') {
        errorMessage =
          'The sms code has expired or to many invalid code attempt. Please re-send the verification code to try again';
      } else if (error.code == 'auth/network-request-failed') {
        errorMessage = 'Network request failed , Please connect internet ! ';
      } else {
        var msg = error.message;
        var si = msg.indexOf(']') + 1;
        var ei = msg.length - 1;
        errorMessage = msg.substr(si, ei);
      }
      Alert.alert('Failed', errorMessage);
      return;
    }
  }

  const gotoNext = () => {
    setisVerify(true, mobile);
    closeModal();
  };

  const renderCodeInputFields = () => {
    return (
      <View style={styles.codeContainer}>
        <CodeField
          ref={ref}
          {...prop}
          value={value}
          onChangeText={v => setValue(v.replace(/[^0-9]/, ''))}
          onEndEditing={() => {}}
          editable={loader || vLoader || !sendCodeOnce ? false : true}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              key={index}
              onLayout={getCellOnLayoutHandler(index)}
              style={[styles.cell, isFocused && styles.focusCell]}>
              <Text style={styles.cellText}>
                {symbol || (isFocused && <Cursor />)}
              </Text>
            </View>
          )}
        />
      </View>
    );
  };

  const renderBottonButton1 = () => {
    const text = 'Get Code';
    const disable = loader;
    return (
      <TouchableOpacity
        disabled={disable}
        activeOpacity={activeOpacity}
        onPress={SendOtpCode}
        style={styles.Button}>
        <>
          {!loader ? (
            <Text style={styles.ButtonText}>{text}</Text>
          ) : (
            <ActivityIndicator
              size={responsiveFontSize(2.7)}
              color={theme.color.buttonText}
            />
          )}
        </>
      </TouchableOpacity>
    );
  };

  const renderBottonButton11 = () => {
    const text = 'Resend Code';
    const disable = loader;
    return (
      <TouchableOpacity
        disabled={disable}
        activeOpacity={activeOpacity}
        onPress={SendOtpCode}
        style={styles.Button}>
        {!loader ? (
          <Text style={styles.ButtonText}>{text}</Text>
        ) : (
          <ActivityIndicator
            size={responsiveFontSize(2.7)}
            color={theme.color.buttonText}
          />
        )}
      </TouchableOpacity>
    );
  };

  const renderBottonButton2 = () => {
    const disable = value.length < 6 || loader ? true : false;
    const text = 'Confirm Code';

    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        onPress={verfyCode}
        disabled={disable || vLoader}
        style={[
          styles.Button,
          {
            opacity: disable && store.Color.theme == 'black' ? 0.5 : 1,
            backgroundColor: disable
              ? theme.color.backgroundLight
              : theme.color.button1,
          },
        ]}>
        <>
          {!disable ? (
            <>
              {!vLoader ? (
                <Text style={styles.ButtonText}>{text}</Text>
              ) : (
                <ActivityIndicator
                  size={responsiveFontSize(2.7)}
                  color={theme.color.buttonText}
                />
              )}
            </>
          ) : (
            <>
              <Text style={styles.ButtonText}>{text}</Text>
            </>
          )}
        </>
      </TouchableOpacity>
    );
  };

  const renderBottonButton3 = () => {
    const text = 'Cancel';

    return (
      <TouchableOpacity
        disabled={loader}
        activeOpacity={activeOpacity}
        onPress={closeModal}
        style={styles.Buttonc}>
        <Text style={styles.ButtonTextc}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const renderTimer = () => {
    return (
      <TouchableOpacity disabled style={styles.Timer}>
        <>
          <CountDown
            size={14}
            until={seconds}
            onFinish={() => setFinish(true)}
            digitStyle={{backgroundColor: 'transparent'}}
            digitTxtStyle={styles.timerTitle}
            timeToShow={['S']}
            timeLabels={{s: null}}
            showSeparator
          />
        </>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Modal
        style={{padding: 0, margin: 0}}
        backdropOpacity={0.4}
        onRequestClose={() => {
          if (!loader) {
            if ((sendCodeOnce && isFinish) || !sendCodeOnce) setisModal(false);
          }
        }}
        isVisible={isModal}>
        <View style={styles.modalCont}>
          <KeyboardAvoidingView enabled>
            <View style={{paddingVertical: 15, paddingHorizontal: 10}}>
              <Text style={styles.title}>Verify your mobile number</Text>
              <Text style={styles.subtitle}>
                You will receive an OTP on your provided number {mobile}
              </Text>
              {renderCodeInputFields()}
              {!loader && sendCodeOnce && !isFinish && renderTimer()}
            </View>
          </KeyboardAvoidingView>
          <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              marginTop: responsiveHeight(2),
            }}>
            {renderBottonButton2()}

            {!sendCodeOnce && renderBottonButton1()}
            {sendCodeOnce && isFinish && renderBottonButton11()}
            {((sendCodeOnce && isFinish) || (!sendCodeOnce && !isFinish)) &&
              renderBottonButton3()}
          </View>
        </View>
      </Modal>
    </>
  );
}
