import { observable, makeObservable, action } from "mobx";
import { persist } from "mobx-persist";
import store from "../index";
import db from "../../database/index";
import { Alert } from "react-native";

class user {
  constructor() {
    makeObservable(this);
  }

  @observable cart = { totalbill: 0, totalitems: 0, data: [] };
  @observable loader = false;
  @observable loginLoader = false;
  @observable registerLoader = false;

  @observable CityAreaData = [];
  @observable CityAreaLoader = false;
  @observable notificationToken = "";
  @persist @observable authToken = "";

  @persist("object") @observable favouriteFoodList = [];

  @persist("object") @observable location = null; //save selected location
  @observable currentLocation = null; //curent location
  @persist("object") @observable resturantDetails = null; //resturant detail
  @persist("object") @observable user = null;
  @persist("object") @observable polygons = [];

  @action setCart = (obj) => {
    this.cart = obj;
  };

  @action updateCart = (totalBill, totalItems) => {
    this.cart.totalbill = totalBill;
    this.cart.totalitems = totalItems;
  };

  @action clearCart = () => {
    this.cart.totalbill = 0;
    this.cart.totalitems = 0;
    this.cart.data = [];
  };

  @action setloginLoader = (obj) => {
    this.loginLoader = obj;
  };

  @action setRegisterLoader = (obj) => {
    this.registerLoader = obj;
  };

  @action setLocation = (obj) => {
    this.location = obj;
  };

  @action setCityAreaData = (obj) => {
    this.CityAreaData = obj;
  };

  @action setCityAreaLoader = (obj) => {
    this.CityAreaLoader = obj;
  };

  @action.bound
  setPolygons(val) {
    this.polygons = val;
  }

  @action setLoader = (obj) => {
    this.loader = obj;
  };

  @action setCurrentLocation = (obj) => {
    this.currentLocation = obj;
  };

  @action setResturnatDetials = (obj) => {
    this.resturantDetails = obj;
  };

  @action.bound
  addUser(token, user) {
    this.addauthToken(token);
    this.setUser(user);
    return;
  }

  @action.bound
  addNotificationToken(n) {
    this.notificationToken = n;
  }

  @action.bound
  addauthToken(n) {
    this.authToken = n;
  }

  @action.bound
  setUser(val) {
    this.user = val;
  }

  @action setFavouriteFoodList = (obj) => {
    this.favouriteFoodList = obj;
  };

  @action updateSpecificObjectInCart = (index, action) => {
    const cartArr = { ...this.cart };
    if (cartArr.data.length > 0) {
      const item = cartArr.data[index];
      if (action === "add") {
        item.quantity++;
      } else if (action === "subtract") {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          cartArr.data.splice(index, 1);
        }
      }
      item.bill = item.quantity * item.firstBill;
      this.setCart(cartArr);
    }
  };

  @action.bound
  getAllData = async (setGetDataOnce, setGetDistanceOnce) => {
    try {
      this.getCitiesandAreas(setGetDataOnce);
      if (this.location) {
        store.Food.getSliderImages(this.location.city, setGetDistanceOnce);
      }
      if (this.user) {
        store.Orders.getOrderById();
        store.Promos.getPromoById();
        this.attemptToGetUser();
      }
    } catch (error) {
      console.error(error);
    }
  };

  @action.bound
  getCitiesandAreas(setGetDataOnce) {
    this.setCityAreaLoader(true);
    db.hitApi(db.apis.GET_CITIES_AREAS, "get", null, null)
      ?.then((resp: any) => {
        if (resp.data.data.length > 0) {
          this.setCityAreaData(
            resp.data.data.filter(
              (data) => data.city.isActive == true && data.areas?.length > 0
            )
          );
        } else {
          this.setCityAreaData([]);
        }
        setGetDataOnce(true);
        this.setCityAreaLoader(false);
      })
      .catch((err) => {
        this.setCityAreaLoader(false);
        store.General.checkServer(err);
        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.GET_CITIES_AREAS} : `, msg);
        if (msg == "No records found") {
          this.setCityAreaData([]);
          setGetDataOnce(true);
          return;
        }
      });
  }

  @action.bound attemptToLogin(
    mobile,
    goToHome,
    goToSignup,
    goToCheckout,
    callingScreen
  ) {
    this.setloginLoader(true);

    db.hitApi(
      db.apis.LOGIN_USER,
      "post",
      {
        mobile,
        registrationToken: this.notificationToken,
      },
      null
    )
      ?.then((resp: any) => {
        this.setloginLoader(false);
        if (!resp.data.doc.isActive) {
          Alert.alert(
            "",
            "Your account has been blocked. Please contact customer support",
            [
              {
                text: "OK",
                onPress: () =>
                  this.Logout(
                    callingScreen == "checkout" ? goToCheckout : goToHome
                  ),
              },
            ]
          );
          return;
        } else if (resp.data.doc.isActive) {
          this.addUser(resp.data.token, resp.data.doc);
          store.Orders.getOrderById();
          store.Promos.getPromoById();
          if (callingScreen == "checkout") {
            goToCheckout();
            return;
          }

          goToHome();
        }
      })
      .catch((err) => {
        this.setloginLoader(false);

        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.LOGIN_USER} : `, msg);

        if (msg == "User Not Registered") {
          goToSignup();
          return;
        }

        if (
          msg == `Inactive users can't login. Please contact customer support`
        ) {
          Alert.alert(
            "",
            "Your account has been blocked. Please contact customer support",
            [
              {
                text: "OK",
                onPress: () =>
                  this.Logout(
                    callingScreen == "checkout" ? goToCheckout : goToHome
                  ),
              },
            ]
          );
          return;
        }

        Alert.alert("", msg);
      });
  }

  @action.bound
  attemptToGetUser() {
    db.hitApi(
      db.apis.GET_USER_BY_ID + this.user._id,
      "get",
      null,
      this.authToken
    )
      ?.then((resp: any) => {
        this.setUser(resp.data.data[0]);
      })
      .catch((err) => {
        console.log(
          `Error in ${db.apis.GET_USER_BY_ID} : `,
          err.response.data.message
        );
        if (err.response.data.message == "No records found")
          this.Logout(() => {});
      });
  }

  @action.bound
  attemptToRegister(body, goToHome, goToCheckout, callingScreen) {
    const { image } = body;
    this.setRegisterLoader(true);
    if (image) {
      const data = new FormData();
      data.append("files", {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
      fetch(db.apis.BASE_URL + db.apis.IMAGE_UPLOAD, {
        method: "post",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          body.image = responseData?.data[0]?.imgrUrl || "";
          this.registerUser(body, goToHome, goToCheckout, callingScreen);
          return;
        })
        .catch((err) => {
          this.setRegisterLoader(false);
          const msg = err.response.data.message || err.response.status || err;
          console.log("Error in Upload Images arr", msg);
        });
    } else {
      body.image = "";
      this.registerUser(body, goToHome, goToCheckout, callingScreen);
    }
  }

  @action.bound
  registerUser(body, goToHome, goToCheckout, callingScreen) {
    db.hitApi(db.apis.REGISTER_USER, "post", body, null)
      ?.then((resp) => {
        this.setRegisterLoader(false);
        this.addUser(resp.data.token, resp.data.data);
        store.Orders.getOrderById();
        store.Promos.getPromoById();
        if (callingScreen == "checkout") {
          goToCheckout();
          return;
        }
        goToHome();
      })
      .catch((err) => {
        this.setRegisterLoader(false);
        const msg = err.response.data.message || err.response.status || err;
        console.log(`Error in ${db.apis.REGISTER_USER} : `, msg);
        Alert.alert("", msg);
      });
  }

  @action.bound
  Logout(goToHome) {
    this.setUser(null);
    store.Promos.setpromos([]);
    store.Orders.setOrders([]);
    this.setFavouriteFoodList([]);
    this.addauthToken("");
    goToHome();
  }
}

export const User = new user();
