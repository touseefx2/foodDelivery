import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Alert,
  Keyboard,
  BackHandler,
  KeyboardAvoidingView,
} from 'react-native';
import {styles} from './styles';
import {observer} from 'mobx-react';
import store from '../../store/index';
import utils from '../../utils/index';
import theme from '../../theme';
import Toast from 'react-native-easy-toast';
import Geolocation from 'react-native-geolocation-service';
import PickupIndicationModal from './components/PickupIndicationModal';
import BottomButton from './components/BottomButton';
import Header from './components/Header';
import DeliveryTypes from './components/DeliveryTypes';
import CartSection from './components/CartSection';
import CheckoutSection from './components/CheckoutSection';

export default observer(Checkout);

function Checkout(props) {
  const imgLoaderSrc = require('../../assets/images/imgLoader/img.gif');
  const rbSheet = useRef(null);
  const scrollRef = useRef(null);
  const toast = useRef(null);
  const {isInternet} = store.General;
  const {sliderImages} = store.Food;

  const {attempToPlaceOrder, placeOrderLoader} = store.Orders;
  const {
    currentLocation,
    user,
    cart,
    setCurrentLocation,
    updateSpecificObjectInCart,
    location,
    notificationToken,
    resturantDetails,
  } = store.User;
  const subTotal = cart.totalbill;
  const totalItems = cart.totalitems;

  const [isOTPModal, setIsOTPModal] = useState(false);
  const [getCurrentLocationLoader, setGetCurrentLocationLoader] =
    useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [verifyPhoneNum, setVerifyPhoneNum] = useState('');
  const [isVerify, setIsVerify] = useState(false);
  const [address, setAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isCart, setIsCart] = useState(false);
  const [indicatorStatus, setIndicatorStatus] = useState('menu');
  const [CurrentLocationErrorCount, setCurrentLocationErrorCount] = useState(0);
  const [isPickupIndicationModal, setIsPickupIndicationModal] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [PromoApply, setPromoApply] = useState(null);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [total, settotal] = useState(0);
  const [deliveryType, setDeliveryType] = useState(null);
  const [deliveryTypesData, setDeliveryTypesData] = useState(
    resturantDetails.deliveryType || [],
  );

  useEffect(() => {
    if (!isCart) setIndicatorStatus('menu');
    if (isCart) setIndicatorStatus('cart');
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => {
      subscription.remove();
    };
  }, [isCart]);

  useEffect(() => {
    if (deliveryTypesData.length > 0)
      setDeliveryType(deliveryTypesData.find(item => item.isSel));
  }, [deliveryTypesData]);

  useEffect(() => {
    if (sliderImages && deliveryType) {
      setEstimatedTime(
        deliveryType?.name == 'delivery'
          ? resturantDetails.estimatedDeliveryTime
          : resturantDetails.estimatedPickupTime,
      );
      setDeliveryCharges(
        deliveryType?.name == 'delivery'
          ? parseFloat(resturantDetails?.deliveryCharges || 0)
          : 0,
      );
      setTaxPercentage(parseFloat(resturantDetails?.tax || 0));
    }
  }, [sliderImages, deliveryType]);

  useEffect(() => {
    const val = PromoApply ? subTotal - discountPrice : subTotal;
    const taxPrice = (taxPercentage / 100) * val;
    setTaxPrice(parseFloat(taxPrice.toFixed()));
  }, [taxPercentage, discountPrice, PromoApply, subTotal]);

  useEffect(() => {
    if (PromoApply) {
      const value = parseFloat(
        (PromoApply.percentage / 100) * subTotal,
      ).toFixed();
      setDiscountPrice(value);
    }
  }, [PromoApply, subTotal]);

  useEffect(() => {
    const value = subTotal + deliveryCharges + taxPrice;
    settotal(value - discountPrice);
  }, [taxPrice, deliveryCharges, subTotal, discountPrice]);

  useEffect(() => {
    if (user) {
      setName(user?.username || '');
      setPhone(user?.mobile?.toString().slice(2) || '');
    }
  }, [user]);

  useEffect(() => {
    if (cart.data.length <= 0) goBack();
  }, [cart]);

  useEffect(() => {
    if (
      phone != '' &&
      verifyPhoneNum != '' &&
      '+92' + phone == verifyPhoneNum
    ) {
      setIsVerify(true);
      return;
    }
    setIsVerify(false);
  }, [phone, verifyPhoneNum]);

  function handleBackButtonClick() {
    if (!props.navigation.isFocused()) {
      return false;
    }

    if (!isCart) goBack();

    if (isCart) {
      setIsCart(false);
      setPromoCode('');
      setPromoApply(null);
      setDiscountPrice(0);
      setCurrentLocationErrorCount(0);
      setSpecialInstructions('');
      if (!user) {
        setVerifyPhoneNum('');
        setIsVerify(false);
        setName('');
        setPhone('');
      }
    }

    return true;
  }

  const goBack = () => {
    props.navigation.goBack();
  };

  const getCurrentLocation = () => {
    setGetCurrentLocationLoader(true);
    Geolocation.getCurrentPosition(
      async position => {
        setGetCurrentLocationLoader(false);
        setCurrentLocationErrorCount(0);
        const points = {
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: theme.window.LATITUDE_DELTA,
            longitudeDelta: theme.window.LONGITUDE_DELTA,
          },
        };
        setCurrentLocation(points);
        placeOrder('', points);
      },
      error => {
        setGetCurrentLocationLoader(false);
        console.log('getCurrentLocation error: ', error.message);
        if (error.code == 3) {
          if (CurrentLocationErrorCount >= 2) {
            Alert.alert('', 'Current Location not get, please try again');
            return;
          }
          if (!currentLocation) {
            getCurrentLocation();
            setCurrentLocationErrorCount(prevState => prevState + 1);
          }
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
      },
    );
  };

  const goToOrderLocation = () => {
    props.navigation.navigate('OrderLocation', {
      selectedLocation,
      address,
      setAddress,
      setSelectedLocation,
    });
  };

  const placeOrder = (check, currentLocation) => {
    Keyboard.dismiss();
    const isDelivery = deliveryType?.name.trim().toLowerCase() === 'delivery';
    const isPickup = deliveryType?.name.trim().toLowerCase() === 'pickup';
    const isNameValid =
      name.trim() && utils.regularExpression.name.test(name.trim());
    const isPhoneValid = phone && utils.regularExpression.phone.test(phone);
    const isAddressValid = isDelivery && address;
    const productIds = [];
    const productsList = [];
    if (!isNameValid) {
      toast?.current?.show('Please enter a valid name');
      return;
    }
    if (!isPhoneValid) {
      toast?.current?.show('Please enter a valid phone number');
      return;
    }
    if (!isAddressValid && isDelivery) {
      toast?.current?.show('Please select a delivery address');
      return;
    }

    cart.data.forEach(item => {
      const variants = item.variants.map(variant => {
        const {name, ...rest} = variant;
        return {...rest, value: name};
      });
      productIds.push(item.productId);
      productsList.push({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        totalprice: item.bill,
        variants,
      });
    });

    const order = {
      area: location.area._id,
      username: name.trim(),
      usermobile: `+92${phone}`,
      usertype: user ? 'customer' : 'guest',
      instructions: specialInstructions,
      paymentMethod: 'cash',
      city: location.city._id,
      address: isDelivery
        ? address
        : `${location.area.name}, ${location.city.name}`,
      quantity: totalItems,
      products: productsList,
      productsIds: productIds,
      deliveryType: deliveryType?.name,
      deviceLocation: {
        latitude: currentLocation?.coords?.latitude,
        longitude: currentLocation?.coords?.longitude,
      },
      isPromoCodeApplied: PromoApply ? true : false,
      promoCode: PromoApply?.code || PromoApply?._id || '',
      promoType: PromoApply?.type || '',
      promoDiscountPercentage: PromoApply?.percentage || '',
      promoDiscountAmount: PromoApply ? discountPrice : '',
      taxpercent: taxPercentage,
      tax: taxPrice,
      deliveryCharges: deliveryCharges,
      bill: subTotal,
      finalBill: total,
      status: 'pending',
    };

    if (isDelivery) {
      order.location = {
        ...selectedLocation,
        address: `${address} ${selectedLocation.address}`,
      };
    }

    if (user) order.customer = user._id;
    else order.registrationToken = notificationToken;

    if (!user && !isVerify) {
      setIsOTPModal(true);
      return;
    }

    if (isInternet) {
      if (isPickup) checkPickupIndication(check, order);
      else attempToPlaceOrder(order, props);
    } else toast?.current?.show('Please connect to the internet', 1000);
  };

  const checkPickupIndication = (check, order) => {
    if (check == 'continue') {
      setIsPickupIndicationModal(false);
      if (isInternet) attempToPlaceOrder(order, props);
      else toast?.current?.show('Please connect to the internet', 1000);
      return;
    }
    setIsPickupIndicationModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header props={props} goBack={goBack} indicatorStatus={indicatorStatus} />

      <KeyboardAvoidingView style={{flex: 1}}>
        <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
          {isCart ? (
            <CheckoutSection
              subTotal={subTotal}
              deliveryType={deliveryType}
              address={address}
              name={name}
              setName={setName}
              phone={phone}
              setPhone={setPhone}
              isVerify={isVerify}
              selectedLocation={selectedLocation}
              PromoApply={PromoApply}
              setPromoApply={setPromoApply}
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              discountPrice={discountPrice}
              setDiscountPrice={setDiscountPrice}
              subtotal={subTotal}
              taxPercentage={taxPercentage}
              deliveryCharges={deliveryCharges}
              taxPrice={taxPrice}
              specialInstructions={specialInstructions}
              setSpecialInstructions={setSpecialInstructions}
              goToOrderLocation={goToOrderLocation}
              toast={toast}
            />
          ) : (
            <CartSection
              cart={cart}
              deliveryType={deliveryType}
              estimatedTime={estimatedTime}
              subtotal={subTotal}
              taxPercentage={taxPercentage}
              taxPrice={taxPrice}
              deliveryCharges={deliveryCharges}
              imgLoader={imgLoaderSrc}
              updateSpecificObjectInCart={updateSpecificObjectInCart}
              goBack={goBack}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {!isCart && (
        <DeliveryTypes
          deliveryTypesData={deliveryTypesData}
          setDeliveryTypesData={setDeliveryTypesData}
        />
      )}
      <BottomButton
        isCart={isCart}
        setIsCart={setIsCart}
        total={total}
        rbSheet={rbSheet}
        scrollRef={scrollRef}
        setCurrentLocationErrorCount={setCurrentLocationErrorCount}
        placeOrder={placeOrder}
        getCurrentLocation={getCurrentLocation}
      />

      <utils.UserCheckModal
        props={props}
        rbSheet={rbSheet}
        screen="checkout"
        setIsCart={setIsCart}
      />
      <utils.Loader
        text={placeOrderLoader ? 'Please wait' : 'Getting Current Location'}
        load={placeOrderLoader || getCurrentLocationLoader}
      />
      {isOTPModal && (
        <utils.OtpModal
          isModal={isOTPModal}
          setisModal={setIsOTPModal}
          setisVerify={(c, phoneNum) => {
            setIsVerify(c);
            if (c) setVerifyPhoneNum(phoneNum);
          }}
          phone={phone}
        />
      )}
      {isPickupIndicationModal && (
        <PickupIndicationModal
          isConfirm={isPickupIndicationModal}
          setisConfirm={setIsPickupIndicationModal}
          deliveryType={deliveryType}
          placeOrder={placeOrder}
          currentLocation={currentLocation}
        />
      )}
      <Toast
        ref={toast}
        position="center"
        opacity={0.9}
        style={{backgroundColor: theme.color.button1}}
        textStyle={{color: theme.color.buttonText}}
      />
    </SafeAreaView>
  );
}
