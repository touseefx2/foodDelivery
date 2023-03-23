import {observable, makeObservable, action} from 'mobx';
import {persist} from 'mobx-persist';
import store from '../index';
import {Alert} from 'react-native';
import db from '../../database/index';
import NetInfo from '@react-native-community/netinfo';

class orders {
  constructor() {
    makeObservable(this);
  }

  @observable loader = false;

  @observable placeOrderLoader = false;

  @persist('object') @observable orders = [];

  @action setLoader = obj => {
    this.loader = obj;
  };

  @action setPlaceOrderLoader = obj => {
    this.placeOrderLoader = obj;
  };

  @action setOrders = obj => {
    this.orders = obj;
  };

  @action.bound
  getOrderById() {
    this.setLoader(true);
    db.hitApi(
      db.apis.GET_ORDERS_BY_USER_ID + store.User.user._id,
      'get',
      null,
      store.User.authToken,
    )
      ?.then((resp: any) => {
        this.setLoader(false);
        const orders = resp.data.map(order => {
          const products = order.products.filter(
            product => !product.notAvailable,
          );
          return {...order, products};
        });
        this.setOrders(orders);
      })
      .catch(err => {
        this.setLoader(false);
        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.GET_ORDERS_BY_USER_ID} : `, msg);

        if (msg == 'No records found') {
          this.setOrders([]);

          return;
        }

        Alert.alert('', msg);
      });
  }

  @action.bound
  attempToPlaceOrder = (order, props) => {
    this.setPlaceOrderLoader(true);
    db.hitApi(db.apis.PLACE_ORDER, 'post', order, '')
      ?.then(resp => {
        props.navigation.navigate('OrderIndication', {
          data: resp.data.data || null,
        });
        this.setPlaceOrderLoader(false);
        store.User.clearCart();
      })
      .catch(err => {
        this.setPlaceOrderLoader(false);
        const msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.PLACE_ORDER} : `, msg);
        Alert.alert('', msg);
      });
  };

  @action.bound
  attempToCheckPromo = (body, subTotal, setPromoApply, toast) => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.setPlaceOrderLoader(true);
        db.hitApi(db.apis.CHECK_PROMO, 'post', body, store.User.authToken)
          ?.then(resp => {
            this.setPlaceOrderLoader(false);
            const message = resp.data.message;
            if (message == 'Promo Code Verified.') {
              const data = resp.data.doc[0];
              if (data) {
                const minimumPurchase =
                  parseFloat(data.minPurchase).toFixed() || 0;
                if (subTotal < minimumPurchase) {
                  Alert.alert(
                    '',
                    `To use this promo code, minimum order amount is Rs. ${minimumPurchase}`,
                  );
                  return;
                }

                setPromoApply(data);
              }
            } else Alert.alert('', message);
          })
          .catch(err => {
            this.setPlaceOrderLoader(false);
            setPromoApply(false);
            let msg = err.response.data.message || err.response.status;
            console.log(`Error in ${db.apis.CHECK_PROMO} : `, msg);
            Alert.alert('', msg.toString());
          });
      } else {
        toast?.current?.show('Please connect internet', 1000);
      }
    });
  };
}

export const Orders = new orders();
