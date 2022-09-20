/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import DeviceInfo from 'react-native-device-info';

import {HomeScreen} from '../screens/home';

const Tab = createBottomTabNavigator();
let isTablet = DeviceInfo.isTablet();

const AppBottomTab = () => {
  const dataApp = useSelector((state) => state.global.dataApp);

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="HomeScreen"
      tabBarOptions={{
        showLabel: true,
        inactiveBackgroundColor: '#FFFFFF',
        activeBackgroundColor: '#FFFFFF',
        activeTintColor: '#D6002C',
        inactiveTintColor: '#757E83',
        labelStyle: {
          fontSize: 10,
          fontWeight: '400',
        },
        indicatorStyle: {
          backgroundColor: 'transparent',
        },
        style: {paddingHorizontal: isTablet ? 100 : 0, backgroundColor: '#FFFFFF'},
      }}
      backBehavior={'initialRoute'}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({focused, tintColor, size}) => (
            <View>
              <Icon
                name="home"
                size={isTablet ? 24 : 22}
                color={focused ? '#D6002C' : '#757E83'}
                solid={focused ? true : false}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({focused, tintColor, size}) => (
            <Icon name="user" size={isTablet ? 24 : 22} color={focused ? '#D6002C' : '#757E83'} solid={focused ? true : false} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppBottomTab;
