/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text, Image
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/global/Actions';
import { TD_Header, TD_HeaderRight_Icon } from '@app/components';
import { requestGET } from '@app/services/Api';
import { BASE_URL } from '@app/data';
//import HighchartsReactNative from '@app/modules/highcharts-react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { TabBar, WhiteSpace } from '@ant-design/react-native'
import DbS_Carousel from '@app/components/database-system/DbS_carousel';
import DbSSearch_form from '@app/components/database-system/DbSSearch_form';
import { FB_MiniList, FB_List } from '@app/components/forbuy';
import { FS_MiniList, FS_List } from '@app/components/forsale';
import { News_MiniList } from '@app/components/news';
import { Colors, Images } from '@themes';
//import { Event_List } from '@app/components/event';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { Notify_List } from '@app/components/notify';

const _color = ['#1976d2', '#FF9800', '#7cb342', '#f44336', '#9C27B0', '#009688'];

const Main_Screen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dataService = useSelector((state) => state.global.dataService);
  const user = useSelector((state) => state.global.user);
  const accessToken = useSelector((state) => state.global.accessToken);
  const [data, setData] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [state, setState] = useState({ selectedTab: 'homeTab' });
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showMoreBox, setShowMoreBox] = useState(false);
  const [hasNotify, setHasNotify] = useState(false);

  useEffect(() => {
    const fetchData = async () => {

    };
    if (refreshing) {
      fetchData();
      setRefreshing(false);
    }
    return () => { };
  }, [refreshing]);

  useEffect(() => {
    setRefreshing(true);
    dispatch(actions.setFilter(null));
    return () => { };
  }, []);

  useEffect(() => {
    const refresh = navigation.addListener('focus', () => {
      dispatch(actions.setFilter(null));
    });
    return refresh;
  }, [navigation]);

  const onRefresh = () => {
    setRefreshing(true);
  };

  const renderContent = (pageText) => {
    switch (state.selectedTab) {
      case "homeTab":
        return (
          <View style={{ flex: 1 }}>
            <TD_Header checkrightComponent {...props} title={pageText} />
            <ScrollView>
              {refreshing ? <></> :
                <>
                  <DbS_Carousel></DbS_Carousel>
                  <WhiteSpace />
                  <FB_MiniList onPressSeeMore={() => { onChangeTab("forbuyTab") }}></FB_MiniList>
                  <WhiteSpace />
                  <FS_MiniList onPressSeeMore={() => { onChangeTab("forsaleTab") }}></FS_MiniList>
                  <WhiteSpace />
                  <News_MiniList onPressSeeMore={() => { }}></News_MiniList>
                </>
              }
            </ScrollView>
          </View>
        )
      case "forbuyTab":
        return (
          <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#FAFAFA", width: "100%" }}>
            <TD_Header
              checkrightComponent {...props}
              title={pageText}
              RightComponent={() => (<TD_HeaderRight_Icon showSearch={true} showDots={true} funcSearch={funcSearch} funcMore={funcMore} />)}
            />
            <FB_List showSearchBox={showSearchBox} showMoreBox={showMoreBox} setShowSearchBox={setShowSearchBox} setShowMoreBox={setShowMoreBox}></FB_List>
          </View >
        )
      case "forsaleTab":
        return (
          <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#FAFAFA", width: "100%" }}>
            <TD_Header
              checkrightComponent {...props}
              title={pageText}
              RightComponent={() => (<TD_HeaderRight_Icon showSearch={true} showDots={true} funcSearch={funcSearch} funcMore={funcMore} />)}
            />
            <FS_List showSearchBox={showSearchBox} showMoreBox={showMoreBox} setShowSearchBox={setShowSearchBox} setShowMoreBox={setShowMoreBox}></FS_List>
          </View >
        )
      case "dbsSearchTab":
        return (
          <View>
            <TD_Header checkrightComponent {...props} title={pageText} />
            <DbSSearch_form></DbSSearch_form>
          </View>
        )
      case "dbsNotifyTab":
        return (
          <View>
            <TD_Header checkrightComponent {...props} title={pageText} />
            <Notify_List></Notify_List>
          </View>
        )

      default:
        return (
          <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
            <TD_Header checkrightComponent {...props} title={pageText}
              RightComponent={() => (<TD_HeaderRight_Icon showSearch={true} showDots={true} funcSearch={funcSearch} funcMore={funcMore} />)} />
            <Text style={{ margin: 50 }}>{pageText}</Text>
          </View>
        )
    }
  }

  const funcSearch = () => {
    if (showMoreBox) setShowMoreBox(false)
    setShowSearchBox(!showSearchBox);
  }
  const funcMore = () => {
    if (showSearchBox) setShowSearchBox(false)
    setShowMoreBox(!showMoreBox)
  }

  const onChangeTab = (tabName) => {
    setRefreshing(true);
    setShowSearchBox(false);
    setShowMoreBox(false);
    setState({
      selectedTab: tabName,
    })
  }

  return (
    <TabBar
      unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="#f5f5f5">
      <TabBar.Item
        key={"forbuyTab"}
        icon={<FontAwesome name="bags-shopping" size={20} color={state.selectedTab === 'forbuyTab' ? Colors.blueHope : '#949494'} />}
        title="Chào mua"
        selected={state.selectedTab === 'forbuyTab'}
        onPress={() => onChangeTab('forbuyTab')}>
        {renderContent('Chào mua')}
      </TabBar.Item>
      <TabBar.Item
        key={"forsaleTab"}
        icon={<FontAwesome name="badge-dollar" size={20} color={state.selectedTab === 'forsaleTab' ? Colors.blueHope : '#949494'} />}
        title="Chào bán"
        selected={state.selectedTab === 'forsaleTab'}
        onPress={() => onChangeTab('forsaleTab')}>
        {renderContent('Chào bán')}
      </TabBar.Item>
      <TabBar.Item
        key={"homeTab"}
        title="Trang chủ"
        icon={<Image rounded source={Images.logos._logo} style={{ width: 40, height: 40, marginTop: -18 }} />}
        selected={state.selectedTab === 'homeTab'}
        onPress={() => onChangeTab('homeTab')}>
        {renderContent('Kết nối doanh nghiệp')}
      </TabBar.Item>
      <TabBar.Item
        key={"dbsSearchTab"}
        icon={<FontAwesome name="searchengin" size={20} color={state.selectedTab === 'dbsSearchTab' ? Colors.blueHope : '#949494'} />}
        title="Tra cứu CSDL"
        selected={state.selectedTab === 'dbsSearchTab'}
        onPress={() => onChangeTab('dbsSearchTab')}>
        {renderContent('Tra cứu CSDL')}
      </TabBar.Item>
      <TabBar.Item
        key={"dbsNotifyTab"}
        icon={<FontAwesome name={!hasNotify ? "bell" : "bell-exclamation"} size={20} color={state.selectedTab === 'dbsNotifyTab' ? Colors.blueHope : hasNotify ? Colors.error : '#949494'} />}
        title="Thông báo"
        selected={state.selectedTab === 'dbsNotifyTab'}
        onPress={() => onChangeTab('dbsNotifyTab')}>
        {renderContent('Thông báo')}
      </TabBar.Item>
    </TabBar >
  );
};

export default Main_Screen;
const styles = StyleSheet.create({});
