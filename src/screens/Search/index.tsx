import React, {useEffect, useState, useRef} from 'react';
import {View, SafeAreaView, FlatList, StatusBar, Platform} from 'react-native';
import {styles} from './styles';
import {observer} from 'mobx-react';
import store from '../../store/index';
import utils from '../../utils/index';
import theme from '../../theme';
import {Searchbar} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Toast from 'react-native-easy-toast';

export default observer(Search);
function Search(props) {
  const {food} = store.Food;
  const toast = useRef(null);

  const [search, setSearch] = useState('');
  const [allitems, setAllitems] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    if (food.length > 0) {
      setTimeout(() => {
        let itemsList = [];
        food.forEach(element => {
          if (element.data.length > 0) {
            element.data.forEach(item => {
              if (item) itemsList.push(item);
            });
          }
        });
        setAllitems(itemsList);
      }, 50);
    } else setAllitems([]);
  }, [food]);

  const onChangeText = text => {
    setSearch(text);
    if (text.trim() == '' || allitems.length <= 0) {
      setSearchData([]);
    } else {
      setSearchData(
        allitems.filter(item => {
          return item.title
            .toLowerCase()
            .trim()
            .includes(text.toLowerCase().trim());
        }),
      );
    }
  };

  const renderItems = ({item}) => {
    return (
      <utils.FoodCard data={item} toast={toast} screen="search" separator={4} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor={theme.color.background}
        barStyle={store.Color.statusBarText}
      />
      <utils.StackHeader props={props} title="Search" />

      <View style={{margin: 12}}>
        <Searchbar
          placeholder="Search product"
          placeholderTextColor={theme.color.subTitle}
          onChangeText={onChangeText}
          iconColor={theme.color.subTitleLight}
          inputStyle={styles.searchInput}
          value={search}
          style={[
            styles.searchBar,
            Platform.OS == 'ios' && {height: responsiveHeight(6.2)},
          ]}
        />
      </View>

      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingBottom: responsiveHeight(4),
        }}
        showsVerticalScrollIndicator={false}
        data={searchData}
        keyboardDismissMode={'on-drag'}
        renderItem={renderItems}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        removeClippedSubviews={true}
        ListEmptyComponent={
          search != '' ? (
            <utils.EmptyData message={'No product found'} screen={'search'} />
          ) : null
        }
      />

      <Toast
        ref={toast}
        position="bottom"
        opacity={0.9}
        style={{backgroundColor: theme.color.button1}}
        textStyle={{color: theme.color.buttonText}}
      />
    </SafeAreaView>
  );
}
