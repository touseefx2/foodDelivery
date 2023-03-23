import React from 'react';
import {View, Text, ScrollView, StatusBar} from 'react-native';
import {styles} from './styles';
import {observer} from 'mobx-react';
import utils from '../../utils/index';
import theme from '../../theme';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default observer(PromoDetails);
function PromoDetails(props) {
  const data = props.route.params.data;
  const title = data?.name?.trim() || '';
  const description = data?.details?.trim() || '';
  const minimumPurchase = data.minPurchase || 0;
  const limitPerUser = data.limitPerUser || 0;
  const endDate = data.expiryDate || '';
  const code = data?._id?.trim() || '';

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <utils.CoverImagesSlider
        images={require('../../assets/images/promo/img.jpeg')}
        screen={'promoDetails'}
        isEmptyVariants={false}
      />

      <utils.CoverImageBack props={props} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainSec}>
          <View style={styles.lineContainer}>
            <Text style={styles.sectionsTitle}>{title}</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>

          <View style={[styles.lineContainer, {paddingVertical: 0}]}>
            <Text style={styles.descriptionText}>
              Add promo: {code.toString().toUpperCase()}
            </Text>
          </View>

          <View style={styles.separator} />
          <View style={styles.lineContainer}>
            <Text style={styles.descriptionText}>Things to know:</Text>
            <View style={styles.row}>
              <View style={styles.iconView}>
                <utils.vectorIcon.FontAwesome
                  name="circle"
                  color={theme.color.subTitle}
                  size={responsiveFontSize(1)}
                />
              </View>

              <View style={styles.labelView}>
                <Text
                  style={[
                    styles.descriptionText,
                    {fontSize: responsiveFontSize(2)},
                  ]}>
                  Minimum purchase: PKR {minimumPurchase}
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.iconView}>
                <utils.vectorIcon.FontAwesome
                  name="circle"
                  color={theme.color.subTitle}
                  size={responsiveFontSize(1)}
                />
              </View>

              <View style={styles.labelView}>
                <Text
                  style={[
                    styles.descriptionText,
                    {fontSize: responsiveFontSize(2)},
                  ]}>
                  Valid for: {limitPerUser} orders/user
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.iconView}>
                <utils.vectorIcon.FontAwesome
                  name="circle"
                  color={theme.color.subTitle}
                  size={responsiveFontSize(1)}
                />
              </View>

              <View style={styles.labelView}>
                <Text
                  style={[
                    styles.descriptionText,
                    {fontSize: responsiveFontSize(2)},
                  ]}>
                  Valid till: {utils.functions.formateDateTime(endDate)}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </ScrollView>
    </View>
  );
}
