import {observable, makeObservable, action} from 'mobx';
import {AppState, Alert} from 'react-native';
import {persist} from 'mobx-persist';

class general {
  constructor() {
    makeObservable(this);
  }

  @observable appName = 'Food Delivery';
  @observable tagLine = '';
  @observable isLoading = true;
  @observable isInternet = false;
  @observable isLocation = false;
  @observable appState = AppState.currentState;
  @observable resendOTPTime = 59;
  @observable GooglApiKey = 'AIzaSyC75RWT0q9xkASq2YhX2vGi1R-e_p2pnWU'; // provide google api key and  must enable place api
  @persist('object') @observable apiLevel = '';
  @persist('object') @observable appBuildNumber = '';
  @persist('object') @observable appVersionNumber = '';

  @action setAppName = str => {
    this.appName = str;
  };

  @action setTagLine = str => {
    this.tagLine = str;
  };

  @action setAppBuildNumber = obj => {
    this.appBuildNumber = obj;
  };

  @action setAppVersionNumber = obj => {
    this.appVersionNumber = obj;
  };

  @action setIsLoading = obj => {
    this.isLoading = obj;
  };

  @action setIsInternet = obj => {
    this.isInternet = obj;
  };

  @action setIsLocation = obj => {
    this.isLocation = obj;
  };

  @action setApiLevel(val) {
    this.apiLevel = val;
  }

  @action setAppState = obj => {
    this.appState = obj;
  };

  @action checkServer = err => {
    if (err.response.data == undefined && err.response.status == 0) {
      Alert.alert('Network Error', 'Server not responding');
      return;
    }
  };
}
export const General = new general();
