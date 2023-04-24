/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, Platform, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Divider } from 'react-native-elements';
import messaging from '@react-native-firebase/messaging';

import { HomeScreen, ChangePassScreen } from '../screens/home';
import { MapScreen } from '../screens/map';
import { DBSEnterprise_FilterScreen } from '../screens/dbs';

import { DrawerMenuHeader, DrawerMenuItem, DrawerMenuChildrenItem } from '../components/tdcommon';
import { Styles } from '@themes';
import * as actions from '../redux/global/Actions';
import { requestPOST } from '@app/services';
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
      initialRouteName="HomeScreen"
      drawerStyle={Styles.Common.drawerStyle}
      drawerContent={(props) => <SideBar {...props} />}
      useLegacyImplementation={true}>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="MapScreen" component={MapScreen} />
      <Drawer.Screen name="DBSEnterprise_FilterScreen" component={DBSEnterprise_FilterScreen} />
      <Drawer.Screen name="ChangePassScreen" component={ChangePassScreen} />
      {/* <Drawer.Screen name="ThongBao_MainScreen" component={ThongBao_MainScreen} /> */}
    </Drawer.Navigator>
  );
};

const MyStack = () => {
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
  const [selectKey, setSelectKey] = useState('A');
  const navigation = useNavigation();

  const RenderMenu = () => <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
    <View style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerMenuItem
        itemKey={'A'}
        selectKey={selectKey}
        setSelectKey={setSelectKey}
        navigate={'HomeScreen'}
        item={{}}
        icon={'home'}
        title={'Trang chủ'}
        {...props}
      />
      <Divider width={1} color="#E0E0E0" />
      <RenderAdminItem/>
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
            <Divider width={1} color="#E0E0E0" />
            <DrawerMenuItem
              itemKey={'F'}
              selectKey={selectKey}
              setSelectKey={setSelectKey}
              icon={'sign-out-alt'}
              title={'Đăng xuất'}
              onPress={alertLogout}
            />
            <Divider width={1} color="#E0E0E0" />
          </>) : <></>
      }
    </View>
  </ScrollView>

  const RenderAdminItem = () => <>
    <List.Accordion
      title={
        <DrawerMenuItem
          itemKey={'B'}
          selectKey={selectKey}
          setSelectKey={setSelectKey}
          navigate={null}
          item={{}}
          icon={'searchengin'}
          title={'Tìm kiếm thông tin'}
          {...props}
        />
      }
      titleStyle={{ margin: -5 }}
      style={{ padding: 0, marginLeft: -2, backgroundColor: '#fff' }}>
      <View>
        <View style={{ borderWidth: 0.5, borderStyle: 'dashed', borderColor: '#E0E0E0' }} />
        <DrawerMenuChildrenItem
          key={`B+1`}
          itemKey={`B+1`}
          navigate={'DBSEnterprise_FilterScreen'}
          item={{}}
          title={'Tìm kiếm thông tin'}
          subTitle={'Cơ sở sản xuất, kinh doanh sản phẩm công nghiệp'}
          {...props}
          selectKey={selectKey}
          setSelectKey={setSelectKey}
        />
      </View>
      <View>
        <View style={{ borderWidth: 0.5, borderStyle: 'dashed', borderColor: '#E0E0E0' }} />
        <DrawerMenuChildrenItem
          key={`B+2`}
          itemKey={`B+2`}
          navigate={null}
          item={{}}
          title={'Tìm kiếm thông tin'}
          subTitle={'Sản phẩm công nghiệp'}
          {...props}
          selectKey={selectKey}
          setSelectKey={setSelectKey}
        />
      </View>
      <View>
        <View style={{ borderWidth: 0.5, borderStyle: 'dashed', borderColor: '#E0E0E0' }} />
        <DrawerMenuChildrenItem
          key={`B+3`}
          itemKey={`B+3`}
          navigate={null}
          item={{}}
          title={'Tìm kiếm thông tin'}
          subTitle={'Khu công nghiệp'}
          {...props}
          selectKey={selectKey}
          setSelectKey={setSelectKey}
        />
      </View>
      <View>
        <View style={{ borderWidth: 0.5, borderStyle: 'dashed', borderColor: '#E0E0E0' }} />
        <DrawerMenuChildrenItem
          key={`B+4`}
          itemKey={`B+4`}
          navigate={null}
          item={{}}
          title={'Tìm kiếm thông tin'}
          subTitle={'Cụm công nghiệp'}
          {...props}
          selectKey={selectKey}
          setSelectKey={setSelectKey}
        />
      </View>
      <View>
        <View style={{ borderWidth: 0.5, borderStyle: 'dashed', borderColor: '#E0E0E0' }} />
        <DrawerMenuChildrenItem
          key={`B+5`}
          itemKey={`B+5`}
          navigate={null}
          item={{}}
          title={'Tìm kiếm thông tin'}
          subTitle={'Làng nghề công nghiệp'}
          {...props}
          selectKey={selectKey}
          setSelectKey={setSelectKey}
        />
      </View>
      <View>
        <View style={{ borderWidth: 0.5, borderStyle: 'dashed', borderColor: '#E0E0E0' }} />
        <DrawerMenuChildrenItem
          key={`B+6`}
          itemKey={`B+6`}
          navigate={null}
          item={{}}
          title={'Tìm kiếm thông tin'}
          subTitle={'Địa điểm kinh doanh'}
          {...props}
          selectKey={selectKey}
          setSelectKey={setSelectKey}
        />
      </View>
    </List.Accordion>
    <Divider width={1} color="#E0E0E0" />
    <DrawerMenuItem
      itemKey={'G'}
      selectKey={selectKey}
      setSelectKey={setSelectKey}
      navigate={'MapScreen'}
      item={{}}
      icon={'map'}
      title={'Bản đồ'}
      {...props}
    />
    <Divider width={1} color="#E0E0E0" />
  </>

  

  const alertLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc muốn đăng xuất không?',
      [
        { text: 'ĐÓNG', onPress: () => console.log('Thoat') },
        {
          text: 'ĐĂNG XUẤT',
          onPress: () => dispatch(actions.logOut()),
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
            itemKey={'A'}
            selectKey={selectKey}
            setSelectKey={setSelectKey}
            navigate={'HomeScreen'}
            item={{}}
            icon={'home'}
            title={'Trang chủ'}
            {...props}
          />
          {accessToken ?//TODO: Kiểm tra thêm nếu là quyền doanh nghiệp
            (
              <>
                <Divider width={1} color="#E0E0E0" />
                <DrawerMenuItem
                  itemKey={'DN'}
                  selectKey={selectKey}
                  setSelectKey={setSelectKey}
                  navigate={'DNHomeScreen'}
                  item={{}}
                  icon={'arrow-alt-right'}
                  title={'Chuyển ứng dụng doanh nghiệp'}
                  {...props}
                  onPress={() => {
                    dispatch(actions.setMainScreen("dn"));
                  }}
                />
              </>
            ) : <></>
          }
          {accessToken ?//TODO: Kiểm tra thêm nếu là quyền cán bộ/lãnh đạo
            (
              <>
                <Divider width={1} color="#E0E0E0" />
                <DrawerMenuItem
                  itemKey={'CB'}
                  selectKey={selectKey}
                  setSelectKey={setSelectKey}
                  navigate={'CBHomeScreen'}
                  item={{}}
                  icon={'arrow-alt-right'}
                  title={'Chuyển ứng dụng quản lý'}
                  {...props}
                  onPress={() => {
                    dispatch(actions.setMainScreen("cb"));
                  }}
                />
              </>
            ) : <></>
          }
          <Divider width={1} color="#E0E0E0" />
          <List.Accordion
            title={
              <DrawerMenuItem
                itemKey={'B'}
                selectKey={selectKey}
                setSelectKey={setSelectKey}
                navigate={null}
                item={{}}
                icon={'searchengin'}
                title={'Tìm kiếm thông tin'}
                {...props}
              />
            }
            titleStyle={{ margin: -5 }}
            style={{ padding: 0, marginLeft: -2, backgroundColor: '#fff' }}>
            <View>
              <View style={{ borderWidth: 0.5, borderStyle: 'dashed', borderColor: '#E0E0E0' }} />
              <DrawerMenuChildrenItem
                key={`B+1`}
                itemKey={`B+1`}
                navigate={'DBSEnterprise_FilterScreen'}
                item={{}}
                title={'Tìm kiếm thông tin'}
                subTitle={'Cơ sở sản xuất, kinh doanh sản phẩm công nghiệp'}
                {...props}
                selectKey={selectKey}
                setSelectKey={setSelectKey}
              />
            </View>
            <View>
              <View style={{ borderWidth: 0.5, borderStyle: 'dashed', borderColor: '#E0E0E0' }} />
              <DrawerMenuChildrenItem
                key={`B+2`}
                itemKey={`B+2`}
                navigate={null}
                item={{}}
                title={'Tìm kiếm thông tin'}
                subTitle={'Sản phẩm công nghiệp'}
                {...props}
                selectKey={selectKey}
                setSelectKey={setSelectKey}
              />
            </View>
            <View>
              <View style={{ borderWidth: 0.5, borderStyle: 'dashed', borderColor: '#E0E0E0' }} />
              <DrawerMenuChildrenItem
                key={`B+3`}
                itemKey={`B+3`}
                navigate={null}
                item={{}}
                title={'Tìm kiếm thông tin'}
                subTitle={'Khu công nghiệp'}
                {...props}
                selectKey={selectKey}
                setSelectKey={setSelectKey}
              />
            </View>
            <View>
              <View style={{ borderWidth: 0.5, borderStyle: 'dashed', borderColor: '#E0E0E0' }} />
              <DrawerMenuChildrenItem
                key={`B+4`}
                itemKey={`B+4`}
                navigate={null}
                item={{}}
                title={'Tìm kiếm thông tin'}
                subTitle={'Cụm công nghiệp'}
                {...props}
                selectKey={selectKey}
                setSelectKey={setSelectKey}
              />
            </View>
            <View>
              <View style={{ borderWidth: 0.5, borderStyle: 'dashed', borderColor: '#E0E0E0' }} />
              <DrawerMenuChildrenItem
                key={`B+5`}
                itemKey={`B+5`}
                navigate={null}
                item={{}}
                title={'Tìm kiếm thông tin'}
                subTitle={'Làng nghề công nghiệp'}
                {...props}
                selectKey={selectKey}
                setSelectKey={setSelectKey}
              />
            </View>
            <View>
              <View style={{ borderWidth: 0.5, borderStyle: 'dashed', borderColor: '#E0E0E0' }} />
              <DrawerMenuChildrenItem
                key={`B+6`}
                itemKey={`B+6`}
                navigate={null}
                item={{}}
                title={'Tìm kiếm thông tin'}
                subTitle={'Địa điểm kinh doanh'}
                {...props}
                selectKey={selectKey}
                setSelectKey={setSelectKey}
              />
            </View>
          </List.Accordion>
          <Divider width={1} color="#E0E0E0" />
          <DrawerMenuItem
            itemKey={'G'}
            selectKey={selectKey}
            setSelectKey={setSelectKey}
            navigate={'MapScreen'}
            item={{}}
            icon={'map'}
            title={'Bản đồ'}
            {...props}
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
                <Divider width={1} color="#E0E0E0" />
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
export default MyStack;

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
