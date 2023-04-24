/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Animated,
  Image,
  Linking,
  Alert,
  Dimensions,
  ScrollView
} from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Colors } from '@app/themes';
import { TD_Header, TD_HeaderRight_Icon } from '@app/components';
import { requestGET } from '@app/services/Api';
import { BASE_URL, fullOrderData } from '@app/data';
import { Flex, Tag } from '@ant-design/react-native';
import { TDPickerSelect, TDRadioList, TDTextInputNew } from '@app/components/tdcommon';
import { DbSFilter_SumaryResult } from '@app/components/database-system';
import { Button } from 'react-native-elements';
const { height, width } = Dimensions.get('window');

const take = 10;
let _data = [
  {
    ID: 1,
    Name: "Sản phẩm a",
    Business: "Công ty TNHH Kim Cương",
    Avatar: require('@images/products/mechanical-engineering.jpg'),
    tags: ["Dập1", "Hàn", "Chế tạo"]
  },
  {
    ID: 2,
    Name: "Sản phẩm b",
    Business: "Công ty gia đình",
    tags: ["Dập2", "Hàn2", "Chế tạo2"]
  },
  {
    ID: 13,
    Name: "Sản phẩm c",
    Business: "Công ty Tin học",
    Avatar: require('@images/products/mechanical-engineering.jpg'),
    tags: ["Dập3", "Hàn3", "Chế tạo3"]
  },
  {
    ID: 14,
    Name: "Sản phẩm d",
    Business: "Công ty cổ phần abc",
    tags: ["Dập4", "Hàn4", "Chế tạo4"]
  },
  {
    ID: 15,
    Name: "Sản phẩm e",
    Business: "Công ty aaa",
    tags: ["Dập5", "Hàn5", "Chế tạo5"]
  },
  {
    ID: 16,
    Name: "Sản phẩm trách nhiệm có hạn abc",
    Business: "NONAME",
    Avatar: require('@images/products/mechanical-engineering.jpg'),
    tags: ["Dập6", "Hàn6", "Chế tạo6"]
  },
]

const DBSProduct_FilterScreen = (props) => {
  const navigation = useNavigation();
  const dataService = useSelector((state) => state.global.dataService);
  const user = useSelector((state) => state.global.user);
  const accessToken = useSelector((state) => state.global.accessToken);
  const [data, setData] = useState(_data);
  const [skip, setSkip] = useState(0);//Số lượng item đã lấy
  const [total, setTotal] = useState(16);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(true);
  const route = useRoute();
  const dataRoute = route?.params ?? {
    order: null,
    slLaoDong: null,
    loaiHinh: null,
    tieuChuan: null,
    diaBan: null,
    q: null
  };

  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showMoreBox, setShowMoreBox] = useState(false);
  const [order, setOrder] = useState(dataRoute?.order || "ID|DESC");
  const [searchStr, setSearchStr] = useState(dataRoute?.q);
  const [slLaoDong, setslLaoDong] = useState(dataRoute?.slLaoDong);
  const [loaiHinh, setLoaiHinh] = useState(dataRoute?.loaiHinh);
  const [tieuChuan, setTieuChuan] = useState(dataRoute?.tieuChuan);
  const [diaBan, setDiaBan] = useState(dataRoute?.diaBan);

  useEffect(() => {
    const fetchData = async () => {
      if (searchStr != '' && searchStr != null) {
        _data = _data.filter(x => { return x.Name.toLowerCase().includes(searchStr) });
      }
      setData(_data);
      setLoading(false);
      setRefreshing(false);
    };
    if (loading || refreshing)
      fetchData();
    return () => { };
  }, [loading, refreshing]);

  const funcSearch = () => {
    if (showMoreBox) setShowMoreBox(false)
    setShowSearchBox(!showSearchBox);
  }
  const funcMore = () => {
    if (showSearchBox) setShowSearchBox(false)
    setShowMoreBox(!showMoreBox)
  }

  //Hàm order
  const changeOrder = (e) => {
    setOrder(e);
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.TD_Background }}>
      <TD_Header checkStack {...props} title="Tìm sản phẩm"
        RightComponent={() => (<TD_HeaderRight_Icon showSearch={true} showDots={true} funcSearch={funcSearch} funcMore={funcMore} />)} />
      {/* Search & filter */}
      <View style={styles.SearchNMore}>
        <ScrollView style={showSearchBox ? styles.toggleShow : styles.toggleHide} persistentScrollbar={true}>
          <Picker title="Loại hình doanh nghiệp" value={loaiHinh} data={fullOrderData} defaultValue={{}} setDataFunc={setLoaiHinh} disabled={refreshing}></Picker>
          <Picker title="Địa bàn" value={diaBan} data={fullOrderData} defaultValue={{}} setDataFunc={setDiaBan} disabled={refreshing}></Picker>
          <TDTextInputNew value={searchStr} onChangeText={setSearchStr} placeholder={'Từ khóa'} title={'Từ khóa'} disable={refreshing} />
          <View style={{ marginVertical: 5, flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ width: 100 }}><Button title={'Lọc'} onPress={() => { setSkip(0); setRefreshing(true) }}></Button></View>
            <Text>&emsp;</Text>
            <View style={{ width: 100 }}><Button title={'Đóng'} onPress={() => { setShowSearchBox(false) }} buttonStyle={{ backgroundColor: Colors.error }}></Button></View>
          </View>
        </ScrollView>
        <View style={showMoreBox ? styles.toggleShow : styles.toggleHide}>
          <TDRadioList
            onChangeValue={value => { setOrder(value) }}
            value={order}
            data={fullOrderData}
            title="Sắp xếp"
            inline />
        </View>
      </View>
      {/* Nội dung chính của trang */}
      {loading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
        <View style={{ flex: 1 }}>
          <DbSFilter_SumaryResult loading={refreshing} total={total} skip={skip} top={take} funcChangePage={(pageNumber) => { setSkip((pageNumber - 1) * take); setRefreshing(true) }}></DbSFilter_SumaryResult>
          {data ? (
            <View>
              <FlatList
                contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 10 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={data ? data : []}
                extraData={data ? data : []}
                renderItem={({ item, index }) => {
                  return <RenderItem item={item} navigation={navigation} index={index} numberOrder={skip + index + 1} />;
                }}
                //onScroll={(a, b) => { _handleOnScroll(a, b) }}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                  <Text style={{ textAlign: 'center', color: '#50565B', marginTop: 10 }}>Không có dữ liệu</Text>
                )}
                // onEndReached={() => {
                //   getLoadMore()
                // }}
                // onEndReachedThreshold={0.5}
                // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListFooterComponent={<Text style={{ textAlign: 'center', paddingTop: 20, paddingBottom: 50 }}>Đang hiển thị <Text style={{ fontWeight: 'bold' }}>{skip + 1}</Text> - <Text style={{ fontWeight: 'bold' }}>{(skip + take > total) ? total : (take + skip)}</Text></Text>}
              />
            </View>
          ) : (
            <Text style={{ textAlign: 'center' }}>Không có dữ liệu!!!</Text>
          )}
        </View>
      )}
    </View>
  );
};

//Render item trong danh sách
const RenderItem = (props) => {
  const { navigation, item, index, numberOrder } = props;
  const state = useRef(new Animated.Value(-(height))).current;
  useEffect(() => {
    Animated.timing(state, {
      toValue: 0,
      duration: 800,
      delay: index < 20 ? (index * 100 + 100) : (index / 20 * 100 + 100),
      useNativeDriver: false
    }).start();
    return () => { };
  }, []);

  return (
    <Animated.View animation={''} style={{ left: state }}>
      <View style={styles.item}>
        <Text style={styles.badge}>{numberOrder}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("DBSProduct_DetailScreen", { id: item.ID })}>
          <Flex>
            <Flex.Item><Image
              resizeMode={'contain'}
              source={item.Avatar}
              style={styles.itemImage}
            /></Flex.Item>
            <Flex.Item flex={3}>
              <View>
                <Text style={styles.itemName}>{item.Name}</Text>
                <Text style={styles.itemContent}>{item.Business}</Text>
                <Text>
                  <Text style={{ fontSize: 13 }}>Công nghệ:</Text>
                  <Text>{item.tags?.map(a => { return (<Tag style={{ paddingRight: 3 }} key={item.ID + a} small>{a}</Tag>) })}</Text>
                </Text>
              </View>
            </Flex.Item>
          </Flex>
        </TouchableOpacity>
      </View >
    </Animated.View>
  )
}
const Picker = (props) => {
  const { title, value, data, defaultValue, setDataFunc, isMultiSelect, isRequired, disabled } = props;
  return (
    <View style={{ marginVertical: 5 }}>
      <Text style={{ marginHorizontal: 10, color: '#5B6062', fontWeight: 'bold' }}> {title}{isRequired ? <Text style={{ color: Colors.red }}> *</Text> : <></>}</Text>
      <TDPickerSelect value={value} placeholder={title} token={''} data={data}
        fieldData={'label'} fieldId={'value'} isMultiSelect={isMultiSelect} disable={disabled}
        onPressReset={() => {
          setDataFunc(defaultValue)
        }}
        onPressSubmit={(e) => {
          setDataFunc(e);
        }}
        style={{ flex: 1 }}
      />
    </View>
  )
}

export default DBSProduct_FilterScreen;
const styles = StyleSheet.create({
  item: { width: '100%', borderBottomWidth: 0.5, borderBottomColor: Colors.lightGray, paddingVertical: 10 },
  itemImage: { width: '95%', height: 50, marginBottom: 2, marginRight: 10, borderRadius: 5 },
  SearchNMore: {
    backgroundColor: Colors.lightBackground, width: '100%', shadowColor: "#000", shadowColor: "#000",
    shadowOffset: { width: 0, height: 1, },
    shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3,
    maxHeight: height / 2
  },
  toggleShow: { opacity: 1, transition: "all .2s", visibility: "visible" },
  toggleHide: { opacity: 0, transition: "all .2s", visibility: "hidden", display: 'none' },
  itemName: { color: Colors.blueHope, fontSize: 16, fontWeight: 'bold' },
  itemContent: { color: Colors.grey },
  badge: { position: 'absolute', top: 7, left: -3, zIndex: 9999, backgroundColor: Colors.transparentBlueHope, color: Colors.white, borderRadius: 12, paddingHorizontal: 5, fontSize: 12 }
});
