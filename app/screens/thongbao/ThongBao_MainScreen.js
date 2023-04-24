/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Keyboard,
} from 'react-native';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {useRoute, useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {Colors} from '@app/themes';
import {TD_Header} from '@app/components';
import {SearchComponent} from '@app/components/tdcommon';
import {requestGET, requestPOST} from '@app/services/Api';
import {BASE_URL} from '@app/data';
import moment from 'moment';
import * as actions from '../../redux/global/Actions';
const RenderItem = (props) => {
  const {navigation, item, handleRead} = props;
  return (
    <>
      <TouchableOpacity
        style={{
          flex: 1,
          borderWidth: 0.5,
          marginVertical: 5,
          padding: 10,
          backgroundColor: item.Read ? '#fff' : '#e9e9e9',
          borderRadius: 5,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          borderColor: '#abb4bd65',
          shadowRadius: 2,
          elevation: 2,
          flexDirection: 'row',
        }}
        onPress={() => {
          if (!item.Read) {
            handleRead(item?.ID);
          }
          navigation.navigate('ChiTietTB_MainScreen', {data: item?.NotifyAndMail?.DetailNotif ?? {}});
        }}>
        <View style={{flexDirection: 'column', justifyContent: 'center', marginRight: 10}}>
          <View
            style={{
              backgroundColor: item.Read ? '#cdcdcd' : '#42A5F5',
              borderRadius: 20,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome name="bell" color="#fff" size={25} />
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text style={{fontSize: 14, fontWeight: item.Read ? '500' : 'bold', color: '#263238'}} numberOfLines={2}>
            {item?.NotifyAndMail?.DetailNotif?.Subject?.length > 0
              ? item?.NotifyAndMail?.DetailNotif?.Subject
              : 'Không có chủ để'}
          </Text>
          <Text style={{fontSize: 10, color: '#424242', fontStyle: 'italic', marginVertical: 5}} numberOfLines={2}>
            {`${item?.NotifyAndMail?.UserName ?? ''}  _ ${item?.NotifyAndMail?.Group ?? ''}`}
          </Text>
          <Text style={{fontSize: 12, color: '#424242'}} numberOfLines={2}>
            {item?.NotifyAndMail?.DetailNotif?.Content?.replaceAll('\n', ' ') ?? ''}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const ThongBao_MainScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const isRefresh = useSelector((state) => state.global.isRefresh);
  const accessToken = useSelector((state) => state.global.accessToken);
  const [refreshing, setRefreshing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [footerLoad, setFooterLoad] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);
  const [top, setTop] = useState(20);
  const [total, setTotal] = useState(0);
  const animation = useRef(new Animated.Value(0));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await requestGET(`${BASE_URL}/Notifications?skip=0&top=${top}&token=${accessToken}`);
        setData(res?.result ?? []);
        setTotal(res?.count ?? 0);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
      setRefreshing(false);
      setFooterLoad(false);
    };
    if (refreshing) {
      fetchData();
    }
    return () => {};
  }, [refreshing]);

  const onRefresh = () => {
    setTop(20);
    setRefreshing(true);
  };
  useEffect(() => {
    const refresh = navigation.addListener('focus', () => {
      onRefresh();
    });
    return refresh;
  }, [navigation]);
  const getLoadMore = async () => {
    if (top < total) {
      setFooterLoad(true);
      const res = await requestGET(`${BASE_URL}/Notifications?skip=${top}&top=${top + 20}&token=${accessToken}`);
      if (res && res.result) {
        setData(data.concat(res.result));
        setTop(top + 20);
      }
      setFooterLoad(false);
    }
  };
  const handleRead = async (id) => {
    try {
      const res = await requestPOST(`${BASE_URL}/Notifications/markasread/${id}?token=${accessToken}`);
      if (res) {
        dispatch(actions.GetMenu(accessToken, true));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.TD_Background}}>
      <TD_Header title={'Danh sách thông báo'} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />
      ) : (
        <View style={{flex: 1, paddingTop: 10}}>
          <FlatList
            contentContainerStyle={{flexGrow: 1, paddingHorizontal: 10, paddingBottom: 20}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data ? data : []}
            renderItem={({item, index}) => {
              return <RenderItem item={item} navigation={navigation} handleRead={handleRead} />;
            }}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có thông báo </Text>
            )}
            onEndReached={() => {
              getLoadMore();
            }}
            onEndReachedThreshold={0.3}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            ListFooterComponent={footerLoad ? <ActivityIndicator /> : <View />}
          />
        </View>
      )}
    </View>
  );
};

export default ThongBao_MainScreen;
const styles = StyleSheet.create({});
