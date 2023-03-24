import { observable, makeObservable, action } from "mobx";
import { persist } from "mobx-persist";
import store from "../index";
import db from "../../database/index";
import { functions } from "../../utils/functions/index";

class food {
  constructor() {
    makeObservable(this);
  }

  @observable selectedProduct = [];
  @observable selectedvariationDetail = [];

  @observable variations = [];

  @observable notAvailableOptions = [
    "Remove it from my order",
    "Cancel the entire order",
    "Call me & Confirm",
  ];

  @observable foodLoader = false;
  @observable getDataOnce = false;
  @persist("object") @observable food = [];
  @persist("object") @observable sliderImages = null;

  @action setselectedProduct = (obj) => {
    this.selectedProduct = obj;
  };
  @action setselectedvariationDetail = (obj) => {
    this.selectedvariationDetail = obj;
  };

  @action setFoodLoader = (obj) => {
    this.foodLoader = obj;
  };

  @action setvariations = (obj) => {
    this.variations = obj;
  };

  @action setgetDataOnce = (obj) => {
    this.getDataOnce = obj;
  };

  @action setFood = (obj) => {
    this.food = obj;
  };

  @action setsliderImages = (obj) => {
    this.sliderImages = obj;
  };

  @action.bound
  getSliderImages(city, setGetDistanceOnce) {
    this.setFoodLoader(true);
    db.hitApi(db.apis.GET_SLIDER_IMAGES, "get", null, "")
      ?.then((resp: any) => {
        const data = resp.data[0] || null;
        const deliveryTypes = data?.deliveryType || [];

        const openTimes = [
          { day: "Mon", open: "9 am", close: "4 pm" },
          { day: "Tue", open: "9 am", close: "5 pm" },
          { day: "Wed", open: "9 am", close: "7 pm" },
          { day: "Thu", open: "9 am", close: "4 pm" },
          { day: "Fri", open: "1 pm", close: "8 pm" },
          { day: "Sat", open: "", close: "" },
          { day: "Sun", open: "", close: "" },
        ];
        let deliveryList = [];
        deliveryTypes.forEach((item, index) => {
          deliveryList.push({
            name: item?.title?.trim(),
            isSel: index == 0 ? true : false,
          });
        });

        const obj = {
          resturantDetails: data
            ? {
                loc: {
                  coords: {
                    latitude: data.location?.latitude || 33.62497365767188,
                    longitude: data.location?.longitude || 72.96931675031028,
                  },
                  address: functions.capitalizeTheFirstLetterOfEachWord(
                    data.address?.trim()
                  ),
                },
                opening_times: data.opening_times || openTimes,
                deliveryType: deliveryList,
                estimatedDeliveryTime: data.estimatedDeliveryTime || "5",
                estimatedPickupTime: data.estimatedPickupTime || "5",
                deliveryCharges: data.deliveryCharges || "100",
                tax: data.tax || 5,
              }
            : null,
          appName: functions.capitalizeTheFirstLetterOfEachWord(
            data?.appName?.trim() || "Food Delivery"
          ),
          appCover: data?.appCover || [],
          tagLine: data?.tagLine?.trim() || "",
          email: data?.email || "a@a.com",
          phone: data?.phone || "3070000001",
        };

        this.setsliderImages(obj);
        this.getFoodCategoryWithProducts(city);
        setGetDistanceOnce(false);
      })
      .catch((err) => {
        this.setFoodLoader(false);
        const msg = err.response.data.message || err.response.status || err;
        console.log(`Error in ${db.apis.GET_SLIDER_IMAGES} : `, msg);
        if (msg == "No records found") {
          this.setsliderImages(null);
          this.setFood([]);
          this.setgetDataOnce(true);
          return;
        }
      });
  }

  @action.bound
  getFoodCategoryWithProducts(city) {
    db.hitApi(db.apis.GET_FOOD_CATEGORY + city._id, "get", null, "")
      ?.then((resp: any) => {
        if (resp.data.data.length > 0) {
          const food = resp.data.data.map(
            ({ name, _id, products, branch }) => ({
              title: name || "",
              key: _id,
              data: products || [],
              branch: branch || [],
            })
          );
          this.setFood(food);
          this.setgetDataOnce(true);
        }
        this.setFoodLoader(false);
      })
      .catch((err) => {
        this.setFoodLoader(false);
        store.General.checkServer(err);
        const msg = err.response.data.message || err.response.status || err;
        console.log(`Error in ${db.apis.GET_FOOD_CATEGORY} : `, msg);
        if (msg == "No records found") {
          this.setFood([]);
          this.setgetDataOnce(true);
          return;
        }
      });
  }
}

export const Food = new food();
