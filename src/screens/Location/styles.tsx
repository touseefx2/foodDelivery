import {StyleSheet} from 'react-native';
import theme from '../../theme/index';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
  cross: {
    width: responsiveWidth(12),
    marginTop: responsiveHeight(2),
    marginLeft: 10,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  logo: {
    width: responsiveWidth(100),
    height: responsiveHeight(20),
    resizeMode: 'contain',
  },
  title: {
    fontSize: responsiveFontSize(2.7),
    fontFamily: theme.fonts.fontBold,
    color: theme.color.title,
    textAlign: 'center',
    marginTop: -10,
  },
  mainConatiner: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    width: responsiveWidth(90),
    paddingVertical: 10,
    marginTop: responsiveHeight(8),
  },
  mainTitle: {
    fontSize: responsiveFontSize(1.9),
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.title,
    textAlign: 'center',
  },
  dropDownContainer: {
    borderBottomWidth: 0.7,
    borderColor: theme.color.subTitle,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 7,
    fontFamily: theme.fonts.fontMedium,
    backgroundColor: theme.color.background,
  },
  input: {
    width: '90%',
  },
  inputTitle: {
    fontSize: responsiveFontSize(1.8),
    color: theme.color.title,
    textTransform: 'capitalize',
    fontFamily: theme.fonts.fontMedium,
  },
  BottomButtonContainer1: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.button1,
    padding: 10,
    borderRadius: 7,
    alignSelf: 'center',
    marginTop: responsiveHeight(9),
    marginBottom: responsiveHeight(4),
  },
  BottomButtonContainer2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: theme.color.background,
    borderRadius: 7,
    alignSelf: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.color.button1,
  },
  buttonTitle: {
    color: theme.color.buttonText,
    fontSize: responsiveFontSize(2),
    fontFamily: theme.fonts.fontBold,
    textTransform: 'capitalize',
  },
  separator: {
    width: '100%',
    marginTop: responsiveHeight(4.5),
  },
});

export default styles;
