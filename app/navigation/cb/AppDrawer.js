/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, Platform, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Divider } from 'react-native-elements';
import messaging from '@react-native-firebase/messaging';

import { CBHomeScreen, DNInfo } from '@app/screens/cb';
import { ChangePassScreen } from '@app/screens/home';

import { DrawerMenuHeader, DrawerMenuItem, DrawerMenuChildrenItem } from '@app/components/tdcommon';
import { Styles } from '@themes';
import * as actions from '@app/redux/global/Actions';
import { requestPOST } from '@app/services/Api';
import { BASE_URL } from '@app/data';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Drawer_ = () => {
  const accessToken = useSelector((state) => state.global.accessToken);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: Platform.isPad ? Dimensions.get('window').width * 0.3 : Dimensions.get('window').width * 0.8,
        },
      }}
      initialRouteName="CBHomeScreen"
      drawerStyle={Styles.Common.drawerStyle}
      drawerContent={(props) => <SideBar {...props} />}
      useLegacyImplementation={true}>
      <Drawer.Screen name="CBHomeScreen" component={CBHomeScreen} />
    </Drawer.Navigator>
  );
};

const CBStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer_" component={Drawer_} />
    </Stack.Navigator>
  );
};

const SideBar = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.global.user);
  const username = useSelector((state) => state.global.username_tmp);
  const accessToken = useSelector((state) => state.global.accessToken);
  const dataMenu = useSelector((state) => state.global.dataMenu);
  const [selectKey, setSelectKey] = useState('DN');
  const navigation = useNavigation();

  // useEffect(() => {
  //   const fetchData = async () => {
  //   };
  //   fetchData();
  //   return () => { };
  // }, [dispatch, dataMenu]);

  const Logout = () => {
    // if (username) {
    //   messaging().unsubscribeFromTopic(username);
    // }
    // if (user && user.groupcode) {
    //   let _groupcode = user.groupcode ? user.groupcode : [];
    //   _groupcode.map((i) => messaging().unsubscribeFromTopic(i));
    // }

    dispatch(actions.logOut());
  };

  const alertLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc muốn đăng xuất không?',
      [
        { text: 'ĐÓNG', onPress: () => console.log('Thoat') },
        {
          text: 'ĐĂNG XUẤT',
          onPress: Logout,
        },
      ],
      { cancelable: false },
    );
  };
  return (
    <>
      <DrawerMenuHeader />
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerMenuItem
            itemKey={'DN'}
            selectKey={selectKey}
            setSelectKey={setSelectKey}
            navigate={'CBHomeScreen'}
            item={{}}
            icon={'home'}
            title={'Trang chủ'}
            {...props}
          />
          <Divider width={0.5} color="#E0E0E0" />
          <DrawerMenuItem
            itemKey={'A'}
            selectKey={selectKey}
            setSelectKey={setSelectKey}
            navigate={'HomeScreen'}
            item={{}}
            icon={'arrow-alt-left'}
            title={'Chuyển ứng dụng chung'}
            {...props}
            onPress={() => {
              dispatch(actions.setMainScreen("home"));
            }}
          />
          <Divider width={1} color="#E0E0E0" />
          {
            accessToken ? (
              <>
                <DrawerMenuItem
                  itemKey={'E'}
                  selectKey={selectKey}
                  setSelectKey={setSelectKey}
                  navigate={'ChangePassScreen'}
                  item={{}}
                  icon={'lock-alt'}
                  title={'Đổi mật khẩu'}
                  {...props}
                />
                <Divider width={0.5} color="#E0E0E0" />
                <DrawerMenuItem
                  itemKey={'F'}
                  selectKey={selectKey}
                  setSelectKey={setSelectKey}
                  icon={'sign-out-alt'}
                  title={'Đăng xuất'}
                  onPress={alertLogout}
                />
              </>) : <></>
          }
        </View>
      </ScrollView>
    </>
  );
};
export default CBStack;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    paddingBottom: 20,
  },
  content: {
    height: 56,
    paddingHorizontal: 5,
    //padding: 10,
    flexDirection: 'row',
    alignItems: 'center',

    //marginBottom: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  leftIcon: { width: 48, marginVertical: 4, alignItems: 'center', justifyContent: 'center' },
  textCenter: { flex: 1, textAlign: 'center', fontWeight: '500', fontSize: 16, color: '#22313F' },
  textRight: { fontWeight: '400', fontSize: 14, color: '#2F6BFF' },
  contentItem: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: '#42a5f560',
  },
  textItem: {
    color: '#22313F',
    fontWeight: '400',
    fontSize: 14,
    flex: 1,
  },
});
