import React, { useEffect, useState, useRef } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { styles } from "./styles";
import { observer } from "mobx-react";
import store from "../../store/index";
import utils from "../../utils/index";
import theme from "../../theme";
import Toast from "react-native-easy-toast";
import { responsiveHeight } from "react-native-responsive-dimensions";

export default observer(Favourite);
function Favourite(props) {
  const toast = useRef(null);

  const { favouriteFoodList } = store.User;
  const { food } = store.Food;

  const [data, setdata] = useState([]);
  const [getDataOnce, setgetDataOnce] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      checkIsFavouriteFoodExistInMenu(favouriteFoodList);
    }, 5);
  }, [favouriteFoodList]);

  const checkIsFavouriteFoodExistInMenu = (favouriteFood) => {
    let favouriteList = [];
    favouriteFood.forEach((item) => {
      food.forEach((item2) => {
        if (item2.data.length > 0) {
          item2.data.forEach((element) => {
            if (element._id === item._id) favouriteList.push(item);
          });
        }
      });
    });
    setdata(favouriteList);
    setgetDataOnce(true);
  };

  const renderProducts = ({ item }) => {
    return (
      <utils.FoodCard
        data={item}
        toast={toast}
        screen="favourite"
        separator={4}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
        <utils.StackHeader props={props} title="Favourites" />

        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingBottom: responsiveHeight(4),
          }}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderProducts}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          removeClippedSubviews={true}
          ListEmptyComponent={
            getDataOnce && (
              <utils.EmptyData
                message={`It looks like you didn't make any product as favourite`}
                screen={"favourite"}
              />
            )
          }
        />

        <Toast
          ref={toast}
          position="bottom"
          opacity={0.9}
          style={{ backgroundColor: theme.color.button1 }}
          textStyle={{ color: theme.color.buttonText }}
        />
      </View>
    </SafeAreaView>
  );
}
