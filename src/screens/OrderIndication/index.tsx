import React, {useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
  Image,
  ScrollView,
} from 'react-native';
import {observer} from 'mobx-react';
import styles from './styles';
import theme from '../../theme';
import store from '../../store';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import * as Animatable from 'react-native-animatable';

export default observer(OrderIndicationt);

function OrderIndicationt(props) {
  const {data} = props.route.params;
  const orderId = data?.orderId || '123';
  const {user} = store.User;
  const message = !user
    ? `Your order has been placed successfully.\n\nYour order number is ${orderId}.\n\nOur team will contact you shortly to confirm your order.\n\nPlease stay connected.`
    : `Your order has been placed successfully.\n\nYour order number is ${orderId}.\n\nYou can view your order status in order history.`;

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => {
      subscription.remove();
    };
  }, []);

  function handleBackButtonClick() {
    if (!props.navigation.isFocused()) {
      return false;
    }
    goToHome();
    return true;
  }

  const goToHome = () => {
    props.navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar
        translucent={false}
        backgroundColor={theme.color.background}
        barStyle={store.Color.statusBarText}
      />

      <View style={styles.Body}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/logo/success.gif')}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{width: '100%', marginTop: responsiveHeight(3)}}>
            <Animatable.Text
              duration={3000}
              easing="ease-out"
              animation="shake"
              style={styles.title}>
              Thank you!
            </Animatable.Text>
          </View>

          <View style={{width: '100%', marginTop: responsiveHeight(5)}}>
            <Text style={styles.Description}>{message}</Text>
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.ContinueButton} onPress={goToHome}>
          <Text style={styles.ContinueButtonText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
