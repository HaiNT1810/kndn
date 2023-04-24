/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

import { createStackNavigator } from '@react-navigation/stack';
//import messaging from '@react-native-firebase/messaging';
import NetInfo from '@react-native-community/netinfo';
import { Host, Portal } from 'react-native-portalize';

const Stack = createStackNavigator();

import * as actions from '../redux/global/Actions';
import AppStack from './AppStack';
//import AuthStack from './AuthStack';
import { IntroScreen } from '../screens/intro';
const RootContainerScreen = () => {
  const dispatch = useDispatch();

  const isLoadIntro = useSelector((state) => state.global.isLoadIntro);
  let user = useSelector((state) => state.global.user);
  const accessToken = useSelector((state) => state.global.accessToken);
  let username = useSelector((state) => state.global.username_tmp);
  const dataApp = useSelector((state) => state.global.dataApp);



  const [netStatus, setNet] = useState(true);

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNet(state.isConnected);
    });

    return () => {
      //  Unsubscribe to network state updates
      unsubscribe();
    };
  }, []);

  // async function checkApplicationPermission() {
  //   const authorizationStatus = await messaging().requestPermission({
  //     alert: true,
  //     sound: true,
  //     badge: true,
  //     announcement: true,
  //   });
  //   const enabled =
  //     authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authorizationStatus);
  //   }

  //   if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
  //     console.log('User has notification permissions enabled.');
  //   } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
  //     console.log('User has provisional notification permissions.');
  //   } else {
  //     console.log('User has notification permissions disabled');
  //   }
  // }

  useEffect(() => {
    // checkApplicationPermission();
    // messaging()
    //   .getToken()
    //   .then((fcmToken) => {
    //     if (fcmToken) {
    //       dispatch(actions.setTokenFirebase(fcmToken));

    //       messaging().subscribeToTopic('tdpsma');

    //       if (username) {
    //         messaging().subscribeToTopic(username);
    //       }
    //       if (user && user.groupcode) {
    //         let _groupcode = user.groupcode ? user.groupcode : [];
    //         _groupcode.map((i) => messaging().subscribeToTopic(i));
    //       }
    //     } else {
    //       console.log("user doesn't have a device token yet");
    //     }
    //   });

    return () => { };
  }, [dispatch, username]);

  if (!netStatus) {
    showMessage({
      message: 'Lỗi mạng',
      description: 'Vui lòng kiểm tra kết nối mạng',
      type: 'danger',
      duration: 5000,
    });
  }
  return (
    <NavigationContainer>
      <Host>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isLoadIntro ? (
            <Stack.Screen
              name="IntroScreen"
              component={IntroScreen}
              options={{
                animationEnabled: false,
              }}
            />
          ) : (
            <Stack.Screen
              name="AppStack"
              component={AppStack}
              options={{
                animationEnabled: false,
              }}
            />
          )}
        </Stack.Navigator>
      </Host>
    </NavigationContainer>
  );
};

export default RootContainerScreen;

const styles = StyleSheet.create({});
