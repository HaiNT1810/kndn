import React, { useState, useEffect, useRef } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import { View, ActivityIndicator } from 'react-native';

import AppDrawer from './AppDrawer';
import { News_DetailScreen } from '../screens/news';
import { ForSale_DetailScreen } from '../screens/forsalse';
import { ForBuy_DetailScreen } from '../screens/forbuy';
import { MapScreen } from '../screens/map';
import { LoginScreen, RegisterScreen } from '../screens/auth'
import { UserProfileScreen, LoginHistoryScreen, UserProfile_EditScreen, Bussiness_EditScreen, Bussiness_ViewScreen } from '../screens/profile'
import { DBSBusiness_FilterScreen, DBSBusiness_DetailScreen, DBSProduct_FilterScreen, DBSProduct_DetailScreen } from '../screens/dbs';
import * as actions from '../redux/global/Actions';

const AppStack = () => {
  const navigation = useNavigation();
  const actionsLoadingMenu = useSelector((state) => state.global.actionsLoadingMenu);
  //const AccessToken = useSelector((state) => state.global.AccessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    // const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    //   console.log('removeNotificationListener');
    //   console.log(remoteMessage);
    // });

    // return unsubscribe;
  }, []);

  useEffect(() => {
    // if (AccessToken) {
    //   dispatch(actions.GetMenu(AccessToken));
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
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'HomeScreen'}>
      <Stack.Screen name="HomeScreen" component={AppDrawer} />
      <Stack.Screen name="News_DetailScreen" component={News_DetailScreen} />
      <Stack.Screen name="ForSale_DetailScreen" component={ForSale_DetailScreen} />
      <Stack.Screen name="ForBuy_DetailScreen" component={ForBuy_DetailScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      {/* Normal User */}
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="LoginHistoryScreen" component={LoginHistoryScreen} />
      <Stack.Screen name="UserProfile_EditScreen" component={UserProfile_EditScreen} />
      {/* Business User */}
      <Stack.Screen name="Bussiness_EditScreen" component={Bussiness_EditScreen} />
      <Stack.Screen name="Bussiness_ViewScreen" component={Bussiness_ViewScreen} />
      {/* Map */}
      <Stack.Screen name="MapScreen" component={MapScreen} />
      {/* Database System */}
      <Stack.Screen name="DBSBusiness_FilterScreen" component={DBSBusiness_FilterScreen} />
      <Stack.Screen name="DBSBusiness_DetailScreen" component={DBSBusiness_DetailScreen} />
      <Stack.Screen name="DBSProduct_FilterScreen" component={DBSProduct_FilterScreen} />
      <Stack.Screen name="DBSProduct_DetailScreen" component={DBSProduct_DetailScreen} />
      {/*  */}
    </Stack.Navigator>
  );
};

export default AppStack;
