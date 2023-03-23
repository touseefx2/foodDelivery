import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableHighlight,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from '..';
import {styles} from './styles';

function SearchBar({search, setsearch}) {
  return (
    <View style={styles.searchBarContainer}>
      <AntDesign
        name="search1"
        color={theme.color.subTitle}
        size={responsiveFontSize(2)}
      />
      <TextInput
        placeholder="Search"
        placeholderTextColor={theme.color.subTitle}
        style={[
          styles.Text,
          {
            width: '92%',
            paddingHorizontal: 10,
          },
        ]}
        value={search}
        onChangeText={t => {
          setsearch(t);
        }}
      />
    </View>
  );
}

function EmptyListMessage() {
  return (
    <>
      <Text style={styles.emptyText}>No record found</Text>
    </>
  );
}

export default function DropDown(props) {
  const isSearchBar = props.search || false;
  const check = props.check;
  const absolute = props.absolute || false;
  const maxModalHeight = responsiveHeight(28);

  const [modalHeight, setmodalHeight] = useState(0);

  const [data, setData] = useState(props.data);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search != '') {
      let arr = [];
      if (props.data.length > 0) {
        arr = props.data.filter(item => {
          const name = check === 'city' || check === 'area' ? item.name : '';
          return name.toLowerCase().includes(search.toLowerCase());
        });
      }
      setData(arr);
    } else setData(props.data);
  }, [search]);

  useEffect(() => {
    return () => {
      setmodalHeight(0);
    };
  }, []);

  const onClickItem = item => {
    props.onSelectItem(item);
    props.setVisible(false);
    setmodalHeight(0);
  };

  const renderItems = ({item}) => {
    const title = check == 'city' || check == 'area' ? item.name : '';

    const style2 = props.style || {};
    return (
      <TouchableHighlight
        underlayColor={theme.color.backgroundLight}
        onPress={() => {
          onClickItem(item);
        }}>
        <View style={styles.rowContainer}>
          <Text style={[styles.Text, style2]}>{title}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const isMaxHeight = modalHeight >= maxModalHeight ? true : false;
  const style = isMaxHeight
    ? {
        height: maxModalHeight,
        marginTop: absolute ? responsiveHeight(6) : responsiveHeight(1),
        position: absolute ? 'absolute' : 'relative',
      }
    : {
        marginTop: absolute ? responsiveHeight(6) : responsiveHeight(1),
        position: absolute ? 'absolute' : 'relative',
      };

  return (
    <>
      <SafeAreaView
        onLayout={event => {
          if (!isMaxHeight) {
            const {height} = event.nativeEvent.layout;
            setmodalHeight(height);
          }
        }}
        style={[styles.Container, style]}>
        <KeyboardAvoidingView enabled>
          <FlatList
            showsVerticalScrollIndicator={false}
            initialNumToRender={24}
            maxToRenderPerBatch={10}
            data={data}
            nestedScrollEnabled
            ListEmptyComponent={<EmptyListMessage />}
            ListHeaderComponent={
              isSearchBar && props.data.length > 0 ? (
                <SearchBar search={search} setsearch={setSearch} />
              ) : null
            }
            renderItem={renderItems}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
