import React from 'react';
import {StatusBar} from 'react-native';
import store from '../../../store/index';
import theme from '../../../theme';

export default function StatusBarShow({isInternet, tagLine}) {
  if (isInternet && tagLine == '')
    return (
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
    );
  else
    return (
      <StatusBar
        translucent={false}
        backgroundColor={theme.color.background}
        barStyle={store.Color.statusBarText}
      />
    );
}
