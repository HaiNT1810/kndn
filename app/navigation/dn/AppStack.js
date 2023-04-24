import React, { useState, useEffect, useRef } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import { View, ActivityIndicator } from 'react-native';
import { UserProfileScreen, LoginHistoryScreen, UserProfile_EditScreen, Bussiness_EditScreen, Bussiness_ViewScreen } from '@screens/profile'
import { DNEditInfo } from '@app/screens/dn'

import AppDrawer from './AppDrawer';
import * as actions from '../../redux/global/Actions';

const DN_AppStack = () => {
  const navigation = useNavigation();
  const actionsLoadingMenu = useSelector((state) => state.global.actionsLoadingMenu);
  //const accessToken = useSelector((state) => state.global.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    // const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    //   console.log('removeNotificationListener');
    //   console.log(remoteMessage);
    // });

    // return unsubscribe;
  }, []);

  useEffect(() => {
    // if (accessToken) {
    //   dispatch(actions.GetMenu(accessToken));
    // }
    return () => { };
  }, [dispatch]);

  useEffect(() => {
    // messaging().onNotificationOpenedApp((remoteMessage) => {
    //   console.log('Notification caused app to open from background state:', remoteMessage.data);
    // });

    // messaging()
    //   .getInitialNotification()
    //   .then((remoteMessage) => {
    //     if (remoteMessage) {
    //       console.log('Notification caused app to open from quit state:', remoteMessage.notification);
    //     }
    //   });
  }, []);

  if (actionsLoadingMenu) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'DNHomeScreen'}>
      <Stack.Screen name="DNHomeScreen" component={AppDrawer} />
      {/* Normal User */}
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="LoginHistoryScreen" component={LoginHistoryScreen} />
      <Stack.Screen name="UserProfile_EditScreen" component={UserProfile_EditScreen} />
      
      <Stack.Screen name="DNEditInfo" component={DNEditInfo} />
    </Stack.Navigator>
  );
};

export default DN_AppStack;
