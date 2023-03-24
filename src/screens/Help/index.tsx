import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
  StatusBar,
} from "react-native";
import { styles } from "./styles";
import { observer } from "mobx-react";
import store from "../../store/index";
import utils from "../../utils/index";
import theme from "../../theme";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";

export default observer(Help);
function Help(props) {
  const { sliderImages } = store.Food;
  const { email, phone } = sliderImages;
  const { appName } = store.General;

  const onPressEmail = () => {
    Linking.openURL(`mailto:${email}`);
  };

  const onPressPhone = () => {
    Linking.openURL(`tel:0${phone}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor={theme.color.background}
        barStyle={store.Color.statusBarText}
      />
      <utils.StackHeader props={props} title="Contact us" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section1}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/logo/img.png")}
          />
          <Text style={styles.title}>{appName}</Text>

          <Text style={styles.title2}>Support Center</Text>

          <Text
            style={[
              styles.title2,
              {
                fontSize: responsiveFontSize(1.9),
                fontFamily: theme.fonts.fontNormal,
                marginTop: responsiveHeight(0.7),
              },
            ]}
          >
            For queries, please contact us at:
          </Text>

          {email && email != "" && (
            <TouchableOpacity activeOpacity={0.7} onPress={onPressEmail}>
              <Text style={styles.title3}>{email}</Text>
            </TouchableOpacity>
          )}

          {phone && phone != "" && (
            <TouchableOpacity activeOpacity={0.7} onPress={onPressPhone}>
              <Text
                style={[
                  styles.title3,
                  {
                    marginTop: 5,
                  },
                ]}
              >{`0${phone}`}</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
