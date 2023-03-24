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
  getSliderImages(city, area, setGetDistanceOnce) {
    this.setFoodLoader(true);
    db.hitApi(db.apis.GET_SLIDER_IMAGES + area._id, "get", null, "")
      ?.then((resp: any) => {
        const generalSetting = resp.data.respContact[0] || null;
        const branchSetting = resp.data.resp[0] || null;
        const deliveryTypes = branchSetting?.deliveryType || [];

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
            name: item?.trim(),
            isSel: index == 0 ? true : false,
          });
        });

        const obj = {
          resturantDetails: branchSetting
            ? {
                loc: {
                  coords: {
                    latitude: branchSetting.latitude || 33.62497365767188,
                    longitude: branchSetting.longitude || 72.96931675031028,
                  },
                  address: functions.capitalizeTheFirstLetterOfEachWord(
                    branchSetting?.address?.trim() || "Resturant Address"
                  ),
                },
                opening_times: branchSetting.opening_times || openTimes,
                deliveryType: deliveryList,
                estimatedDeliveryTime:
                  branchSetting.estimatedDeliveryTime || "5",
                estimatedPickupTime: branchSetting.estimatedPickupTime || "5",
                deliveryCharges: branchSetting.deliveryCharges || "100",
                tax: branchSetting.tax || 10,
              }
            : null,
          appName: functions.capitalizeTheFirstLetterOfEachWord(
            generalSetting?.appName?.trim() || "Food Delivery"
          ),
          appCover: generalSetting.appCover || [],
          tagLine: generalSetting?.tagLine?.trim() || "",
          email: generalSetting.email || "a@a.com",
          phone: generalSetting.phone || "3070000001",
        };

        this.setsliderImages(obj);
        setGetDistanceOnce(false);
        this.getFoodCategoryWithProducts(city, area);
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
  getFoodCategoryWithProducts(city, area) {
    db.hitApi(
      db.apis.GET_FOOD_CATEGORY + `${area._id}/${city._id}`,
      "get",
      null,
      ""
    )
      ?.then((resp: any) => {
        this.setFoodLoader(false);

        if (resp.data.message == "No branch Located with this Area and City") {
          this.setFood([]);
          this.setgetDataOnce(true);
          return;
        }

        const food = [];
        const data = resp.data.menu;
        if (data.length > 0) {
          const cat = data[0].category;
          const pro = data[0].products;
          cat.forEach((item) => {
            const products = pro.filter(({ category }) => category == item._id);
            food.push({
              title: item.name,
              key: item._id,
              data: products,
              branch: [],
            });
          });
        }
        this.setFood(food);
        this.setgetDataOnce(true);
      })
      .catch((err) => {
        this.setFoodLoader(false);
        store.General.checkServer(err);
        const msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.GET_FOOD_CATEGORY} : `, msg);
      });
  }
}

export const Food = new food();
