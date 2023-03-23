import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../styles';
import utils from '../../../utils/index';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import theme from '../../../theme';
import NetInfo from '@react-native-community/netinfo';

export default function Main({
  closeAllDropDown,
  isDropDownCity,
  setIsDropDownCity,
  selectedCity,
  isDropDownArea,
  setIsDropDownArea,
  selectedArea,
  onClickConfirm,
  locateOnMap,
  cityList,
  areaList,
  isCurrentLocationExistInAreaPolygon,
  setCityInList,
  toast,
}) {
  const renderDropDown = check => {
    const data = check === 'city' ? cityList : check === 'area' ? areaList : [];
    const onClickSelect = obj => {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          if (check === 'city' && selectedCity?._id !== obj._id)
            setCityInList('specific', obj);
          else if (check === 'area' && selectedArea?._id !== obj._id)
            isCurrentLocationExistInAreaPolygon(obj, selectedCity);
        } else toast?.current?.show('Please connect internet', 1000);
      });
    };
    return (
      <theme.DropDown
        data={data}
        onSelectItem={onClickSelect}
        setVisible={closeAllDropDown}
        search={data.length > 0 ? true : false}
        check={check}
        absolute={false}
      />
    );
  };

  const renderConfirmButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickConfirm}
        style={styles.BottomButtonContainer1}>
        <Text style={styles.buttonTitle}>Confirm</Text>
      </TouchableOpacity>
    );
  };

  const renderLocateButton = () => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={locateOnMap}
          style={styles.BottomButtonContainer2}>
          <utils.vectorIcon.Entypo
            name="location-pin"
            color={theme.color.button1}
            size={responsiveFontSize(2.7)}
          />
          <Text
            style={[
              styles.buttonTitle,
              {color: theme.color.button1, marginLeft: 5},
            ]}>
            Locate on map
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={styles.mainConatiner}>
      <Text style={styles.mainTitle}>Please select your city and area</Text>
      <View style={styles.separator}>
        <TouchableOpacity
          onPress={() => {
            closeAllDropDown();
            setIsDropDownCity(!isDropDownCity);
          }}
          activeOpacity={0.4}
          style={styles.dropDownContainer}>
          <View style={styles.input}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.inputTitle,
                {
                  color: selectedCity?.name
                    ? theme.color.title
                    : theme.color.subTitle,
                },
              ]}>
              {selectedCity?.name ? selectedCity?.name : 'Select your city'}
            </Text>
          </View>
          <utils.vectorIcon.AntDesign
            name="caretdown"
            style={{opacity: selectedCity?.name ? 0.7 : 0.5}}
            color={theme.color.title}
            size={responsiveFontSize(1.4)}
          />
        </TouchableOpacity>
        {isDropDownCity && renderDropDown('city')}
      </View>
      <View style={styles.separator}>
        <TouchableOpacity
          disabled={!selectedCity ? true : false}
          onPress={() => {
            closeAllDropDown();
            setIsDropDownArea(!isDropDownArea);
          }}
          activeOpacity={0.4}
          style={styles.dropDownContainer}>
          <View style={styles.input}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.inputTitle,
                {
                  color: selectedArea?.name
                    ? theme.color.title
                    : selectedCity
                    ? theme.color.subTitle
                    : theme.color.subTitleLight,
                },
              ]}>
              {selectedArea?.name ? selectedArea?.name : 'Select your area'}
            </Text>
          </View>
          <utils.vectorIcon.AntDesign
            name="caretdown"
            color={theme.color.title}
            style={{
              opacity: selectedArea?.name ? 0.7 : selectedCity ? 0.5 : 0.3,
            }}
            size={responsiveFontSize(1.4)}
          />
        </TouchableOpacity>
        {isDropDownArea && renderDropDown('area')}
      </View>
      {renderConfirmButton()}
      {renderLocateButton()}
    </View>
  );
}
