import store from "../../store";

let background = ""; // Main Background color
let backgroundLight = "";
let title = ""; // Main text color
let subTitle = ""; // Main light text color
let subTitleLight = ""; // Main super light text color
let button1 = ""; // Main Button Background color Note: pls don't same Main Background Color
let buttonText = "";
// ---> Note: button2 background (main background) and text/border color auto use button1Text color <----
let Home_FooterCart_TopBorder_Width = 0;
let TabBar_BottomBorder_Width = 0;
let Add_Item_TopBorder_Width = 0;
let HEADER_BottomBorder_Width = 0;
let Checkout_FooterCart_TopBorder_Width = 0;
let Checkout_FooterType_TopBorder_Width = 0;
let Loader_Border_Width = 0;

if (store.Color.theme == "white") {
  background = "#FCFCFC";
  backgroundLight = "#ebebeb";
  title = "black";
  subTitle = "#393939";
  subTitleLight = "rgba(0, 0, 0, 0.5)";
  button1 = "#FE774C";
  buttonText = "white";
  Home_FooterCart_TopBorder_Width = 0;
  TabBar_BottomBorder_Width = 0;
  Add_Item_TopBorder_Width = 0;
  HEADER_BottomBorder_Width = 0;
  Checkout_FooterCart_TopBorder_Width = 0;
  Checkout_FooterType_TopBorder_Width = 0;
  Loader_Border_Width = 0;
} else if (store.Color.theme == "black") {
  background = "black";
  backgroundLight = "#363636";
  title = "white";
  subTitle = "#f2f2f2";
  subTitleLight = "#e8e8e8";
  button1 = "#2475bf";
  buttonText = "white";
  Home_FooterCart_TopBorder_Width = 0.3;
  TabBar_BottomBorder_Width = 0.3;
  Add_Item_TopBorder_Width = 0.3;
  HEADER_BottomBorder_Width = 0.3;
  Checkout_FooterCart_TopBorder_Width = 0.3;
  Checkout_FooterType_TopBorder_Width = 0.3;
  Loader_Border_Width = 0.8;
} else if (store.Color.theme == "brown") {
  background = "#1e1b22";
  backgroundLight = "#28252d";
  title = "white";
  subTitle = "#f2f2f2";
  subTitleLight = "#e8e8e8";
  button1 = "#eca606";
  buttonText = "white";
  Home_FooterCart_TopBorder_Width = 0.3;
  TabBar_BottomBorder_Width = 0.3;
  Add_Item_TopBorder_Width = 0.3;
  HEADER_BottomBorder_Width = 0.3;
  Checkout_FooterCart_TopBorder_Width = 0.3;
  Checkout_FooterType_TopBorder_Width = 0.3;
  Loader_Border_Width = 0.8;
}

//---> HOME
//* alert
const Home_Alert_Background_Color = button1;
const Home_Alert_Text_Color = buttonText;
const Home_Alert_Modal_Background_Color = background;
const Home_Alert_Modal_Icon_Background_Color = button1;
const Home_Alert_Modal_Icon_Color = buttonText;
const Home_Alert_Modal_Title_Color = title;
const Home_Alert_Modal_Text_Color = subTitle;
const Home_FooterCart_Background_Color = background;
const Home_FooterCart_Sub_Background_Color = button1;
const Home_FooterCart_Icon_Border_Color = buttonText;
const Home_FooterCart_Text_Color = buttonText;

const color = {
  background,
  backgroundLight,
  title,
  subTitle,
  subTitleLight,
  button1,
  buttonText,
  Home_Alert_Background_Color,
  Home_Alert_Text_Color,
  Home_Alert_Modal_Background_Color,
  Home_Alert_Modal_Icon_Background_Color,
  Home_Alert_Modal_Icon_Color,
  Home_Alert_Modal_Title_Color,
  Home_Alert_Modal_Text_Color,
  Home_FooterCart_Background_Color,
  Home_FooterCart_Sub_Background_Color,
  Home_FooterCart_Icon_Border_Color,
  Home_FooterCart_Text_Color,
  TabBar_BottomBorder_Width,
  Home_FooterCart_TopBorder_Width,
  Add_Item_TopBorder_Width,
  HEADER_BottomBorder_Width,
  Checkout_FooterCart_TopBorder_Width,
  Checkout_FooterType_TopBorder_Width,
  Loader_Border_Width,
};

export default color;
