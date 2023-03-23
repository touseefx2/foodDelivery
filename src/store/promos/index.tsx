import {observable, makeObservable, action} from 'mobx';
import {Alert} from 'react-native';
import db from '../../database/index';
import store from '../index';

class promos {
  constructor() {
    makeObservable(this);
  }

  @observable loader = false;

  @observable promos = [];

  @action setloader = obj => {
    this.loader = obj;
  };

  @action setpromos = obj => {
    this.promos = obj;
  };

  @action.bound
  getPromoById() {
    this.setloader(true);
    db.hitApi(
      db.apis.GET_All_PROMOS_BY_ID + store.User.location.city._id,
      'get',
      null,
      store.User.authToken,
    )
      ?.then((resp: any) => {
        const data = resp.data.data || [];
        const arr = data.filter(item => {
          return item.status == 'active';
        });
        this.setpromos(arr);
        this.setloader(false);
      })
      .catch(err => {
        this.setloader(false);
        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.GET_All_PROMOS_BY_ID} : `, msg);
        if (msg == 'No records found') {
          this.setpromos([]);
          return;
        }
        Alert.alert('', msg);
      });
  }
}

export const Promos = new promos();
