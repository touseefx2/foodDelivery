import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  BackHandler,
} from "react-native";
import { observer } from "mobx-react";
import utils from "../../utils/index";
import styles from "./styles";
import store from "../../store/index";
import theme from "../../theme/index";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import auth from "@react-native-firebase/auth";
import Button from "./components/Button";
import Timer from "./components/Timer";
import { responsiveFontSize } from "react-native-responsive-dimensions";

function ErrorMessage(errorMessage) {
  const startIndex = errorMessage.indexOf("]") + 1;
  const endIndex = errorMessage.length - 1;
  return errorMessage.substr(startIndex, endIndex);
}

export default observer(OTP);
function OTP(props) {
  const CELL_COUNT = 6;
  const { resendOTPTime, isInternet } = store.General;
  const caliingScreen = props.route.params.screen || "";
  const phone = props.route.params.phone || "";
  const { attemptToLogin, loginLoader } = store.User;

  const [sendCodeLoader, setSendCodeLoader] = useState(false);
  const [verificationLoader, setVerificationLoader] = useState(false);
  const [sendCodeOnce, setSendCodeOnce] = useState(false);
  const [seconds, setSeconds] = useState(resendOTPTime);
  const [isFinish, setFinish] = useState(false);
  const [confirmResult, setConfirmResult] = useState(null);
  const [value, setValue] = useState("");
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonClick
    );
    return () => {
      subscription.remove();
    };
  }, [sendCodeLoader, verificationLoader, sendCodeOnce, isFinish]);

  useEffect(() => {
    SendOTPCode();
    const onAuthStateChangedUnsubscribe = auth().onAuthStateChanged(
      async (user) => {
        if (user) {
          setVerificationLoader(false);

          if (isInternet) {
            if (auth().currentUser) auth().currentUser.delete();
            attemptToLogin(
              phone,
              goToHome,
              goToSignup,
              goToCheckout,
              caliingScreen
            );
          } else Alert.alert("", "Please connect internet.");
        }
      }
    );
    return () => {
      onAuthStateChangedUnsubscribe();
    };
  }, []);

  function handleBackButtonClick() {
    if (!props.navigation.isFocused()) return false;

    if (
      !sendCodeLoader &&
      !verificationLoader &&
      ((sendCodeOnce && isFinish) || (!sendCodeOnce && !isFinish))
    )
      goBack();

    return true;
  }

  async function SendOTPCode() {
    if (isInternet) {
      setSendCodeLoader(true);
      setValue("");
      auth()
        .signInWithPhoneNumber(phone)
        .then((res) => {
          console.log("SendOtpCode res : ", res);
          setConfirmResult(res);
          setSendCodeOnce(true);
          setFinish(false);
          setSeconds(resendOTPTime);
          setSendCodeLoader(false);
        })
        .catch((error) => {
          console.log("SendOtpCode  error : ", error);
          setSendCodeLoader(false);
          setValue("");
          Alert.alert("Failed", ErrorMessage(error.message));
        });
    } else
      Alert.alert("Network Error", "Please check your internet connection");
  }

  async function verifyCode() {
    if (isInternet) {
      try {
        Keyboard.dismiss();
        setVerificationLoader(true);
        await confirmResult.confirm(value);
      } catch (error) {
        console.log("verifyCode error: ", error);
        setVerificationLoader(false);
        setValue("");
        let errorMessage = "";
        if (error.code == "auth/unknown") {
          errorMessage =
            "Cannot create PhoneAuthCredential without either verificationProof, sessionInfo, temporary proof, or enrollment ID !";
        } else if (error.code == "auth/invalid-verification-code") {
          errorMessage =
            "Invalid verification code, Please enter correct confirmation code !";
        } else if (error.code == "auth/session-expired") {
          errorMessage =
            "The sms code has expired or to many invalid code attempt. Please re-send the verification code to try again";
        } else if (error.code == "auth/network-request-failed") {
          errorMessage = "Network request failed , Please connect internet.";
        } else {
          errorMessage = ErrorMessage(error.message);
        }
        Alert.alert("Failed", errorMessage);
        return;
      }
    } else
      Alert.alert("Network Error", "Please check your internet connection");
  }

  const goBack = () => {
    props.navigation.goBack();
  };

  const goToHome = () => {
    props.navigation.navigate("Home");
  };

  const goToCheckout = () => {
    props.navigation.navigate("Checkout", { screen: caliingScreen });
  };

  const goToSignup = () => {
    props.navigation.navigate("Signup", {
      phone: phone,
      screen: caliingScreen,
    });
  };

  const renderCodeInputFields = () => {
    return (
      <View style={styles.codeContainer}>
        <CodeField
          ref={ref}
          {...prop}
          value={value}
          onChangeText={(text) => setValue(text.replace(/[^0-9]/, ""))}
          onEndEditing={() => {}}
          editable={
            sendCodeLoader || loginLoader || !sendCodeOnce ? false : true
          }
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              key={index}
              onLayout={getCellOnLayoutHandler(index)}
              style={[styles.cell, isFocused && styles.focusCell]}
            >
              <Text style={styles.cellText}>
                {symbol || (isFocused && <Cursor />)}
              </Text>
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {!sendCodeLoader &&
      !verificationLoader &&
      ((sendCodeOnce && isFinish) || (!sendCodeOnce && !isFinish)) ? (
        <utils.StackHeader props={props} title="otp" />
      ) : (
        <View style={styles.header} />
      )}

      <KeyboardAvoidingView style={{ flex: 1 }} enabled>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 15 }}>
            <Text style={styles.title}>Verify your mobile number</Text>
            <Text style={styles.subtitle}>
              You will receive an OTP on your provided number {phone}
            </Text>
            {renderCodeInputFields()}
            {!sendCodeLoader && sendCodeOnce && (
              <Timer
                isFinish={isFinish}
                seconds={seconds}
                setFinish={setFinish}
                SendOTPCode={SendOTPCode}
              />
            )}
            {(sendCodeLoader || verificationLoader) && (
              <ActivityIndicator
                style={styles.loader}
                color={theme.color.button1}
                size={responsiveFontSize(3.5)}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Button
        loginLoader={loginLoader}
        sendCodeLoader={sendCodeLoader}
        verificationLoader={verificationLoader}
        value={value}
        verifyCode={verifyCode}
      />
      <utils.Loader load={loginLoader} text={"Please wait"} />
    </SafeAreaView>
  );
}
