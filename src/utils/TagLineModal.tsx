import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import theme from '../theme/index';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import utils from '.';
import {observer} from 'mobx-react';
import Modal from 'react-native-modal';

export default observer(TagLineModal);
function TagLineModal(props) {
  const setIsShow = (value: boolean) => {
    props.setisTaglineShow(value);
  };
  const isShow = props.isTaglineShow;
  const title = props.title;

  return (
    <>
      <Modal
        style={{padding: 0, margin: 0}}
        backdropOpacity={0.4}
        onRequestClose={() => {
          setIsShow(false);
        }}
        isVisible={isShow}>
        <View style={styles.modalContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setIsShow(false);
              }}
              style={styles.crossButton}>
              <utils.vectorIcon.Entypo
                name="cross"
                color={theme.color.Home_Alert_Modal_Icon_Color}
                size={responsiveFontSize(2.2)}
              />
            </TouchableOpacity>

            <View style={{width: '87%'}}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.alertText}>
                ALERT
              </Text>
            </View>
          </View>

          <ScrollView
            contentContainerStyle={{paddingHorizontal: 15, marginTop: 10}}>
            <Text style={styles.titleText}>{title}</Text>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: theme.color.Home_Alert_Modal_Background_Color,
    width: responsiveWidth(85),
    height: responsiveHeight(45),
    alignSelf: 'center',
    borderColor: theme.color.subTitleLight,
    borderWidth: 0.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  crossButton: {
    width: responsiveFontSize(2.7),
    height: responsiveFontSize(2.7),
    borderRadius: responsiveFontSize(2.7) / 2,
    backgroundColor: theme.color.Home_Alert_Modal_Icon_Background_Color,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertText: {
    color: theme.color.Home_Alert_Modal_Title_Color,
    fontSize: responsiveFontSize(2.9),
    fontFamily: theme.fonts.fontBold,
  },
  titleText: {
    color: theme.color.Home_Alert_Modal_Text_Color,
    fontSize: responsiveFontSize(2.1),
    fontFamily: theme.fonts.fontMedium,
  },
});
