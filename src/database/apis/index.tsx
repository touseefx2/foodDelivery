// const BASE_URL = "http://ec2-13-126-100-183.ap-south-1.compute.amazonaws.com/";
const BASE_URL = "http://ec2-13-235-83-56.ap-south-1.compute.amazonaws.com/";
// const BASE_URL = "http://192.168.1.13:3001/";

//apis
const GET_CITIES_AREAS = "api/area/getAllAreas";
const GET_SLIDER_IMAGES = "api/settings";
const GET_FOOD_CATEGORY = "api/category/getAllCategories?branch=";
const PLACE_ORDER = "api/orders";
const REGISTER_USER = "api/users";
const LOGIN_USER = "api/users/login";
const IMAGE_UPLOAD = "api/upload";
const GET_USER_BY_ID = "api/users?_id=";
const GET_ORDERS_BY_USER_ID = "api/orders?customer=";
const GET_FAVRT_FOOD_LIST_BY_USER_ID = "api/orders?customer=";
const GET_ADDRESS_BY_USER_ID = "api/orders?customer=";
const SET_FAVRT_FOOD_LIST_BY_USER_ID = "api/orders?customer=";
const REMOVE_FAVRT_FOOD_LIST_BY_USER_ID = "api/orders?customer=";
const ADD_ADDRESS_BY_USER_ID = "api/orders?customer=";
const REMOVE_ADDRESS_BY_USER_ID = "api/orders?customer=";
const CHANGE_PASSWORD = "api/users/changePassword/";
const SUBSCRIBE_TOPIC = "api/pushnotification/subscribeToTopic";
const CHECK_PROMO = "api/promocode/checkCodeValidity";
const GET_All_PROMOS_BY_ID = "api/promocode/getActiveCodes?city=";
export const apis = {
  BASE_URL,
  GET_CITIES_AREAS,
  GET_SLIDER_IMAGES,
  GET_FOOD_CATEGORY,
  PLACE_ORDER,
  REGISTER_USER,
  LOGIN_USER,
  IMAGE_UPLOAD,
  GET_USER_BY_ID,
  GET_ORDERS_BY_USER_ID,
  GET_FAVRT_FOOD_LIST_BY_USER_ID,
  GET_ADDRESS_BY_USER_ID,
  SET_FAVRT_FOOD_LIST_BY_USER_ID,
  REMOVE_FAVRT_FOOD_LIST_BY_USER_ID,
  ADD_ADDRESS_BY_USER_ID,
  REMOVE_ADDRESS_BY_USER_ID,
  CHANGE_PASSWORD,
  SUBSCRIBE_TOPIC,
  CHECK_PROMO,
  GET_All_PROMOS_BY_ID,
};
