import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../styles";
import theme from "../../../theme/index";
import store from "../../../store";

export default function Button({
  loginLoader,
  sendCodeLoader,
  verificationLoader,
  value,
  verifyCode,
}) {
  const isDisable =
    loginLoader || sendCodeLoader || verificationLoader || value.length < 6;

  return (
    <TouchableOpacity
      onPress={verifyCode}
      activeOpacity={0.7}
      disabled={isDisable}
      style={[
        styles.button,
        {
          opacity: isDisable && store.Color.theme == "black" ? 0.6 : 1,
          backgroundColor: !isDisable
            ? theme.color.button1
            : theme.color.backgroundLight,
        },
      ]}
    >
      <Text style={styles.buttonText}>Verify</Text>
    </TouchableOpacity>
  );
}
