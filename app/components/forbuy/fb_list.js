/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, ActivityIndicator, FlatList, RefreshControl, Switch, TouchableOpacity } from 'react-native';
import { Accordion, Tag, Flex, Button } from '@ant-design/react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { TDSearchComponent } from '@app/components/search';
import { TDPickerSelect, TDRadioList } from '@app/components/tdcommon';
import style from '@app/modules/react-native-datepicker/style';
import { Colors } from '@themes';
import { BASE_URL, fullOrderData } from '@app/data';

let tmrSearch;
const FB_List = (props) => {
  const { showSearchBox, showMoreBox, setShowSearchBox, setShowMoreBox } = props;
  const _data = [{
    image: require('@images/products/mechanical-engineering.jpg'),
    title: "Thành Long tìm kiếm đối tác kết nối sản phẩm CNHT - Lò xo",
    content: "CÔNG TY TNHH LÒ XO THÀNH PHÁT chuyên sản xuất các loại lò xo dùng trong sản xuất công nghiệp, dịch vụ, mặt hàng trang trí ... Lò xo được sản xuất trên dây chuyền công nghệ máy móc CNC hiện đại hoàn toàn tự động , đáp ứng được mọi yêu cầu của khách hàng",
    from: '2022-06-01',
    view: 200,
    tags: ["Cơ khí chế tạo", "ThanhLong", "THÀNH PHÁT"],
    ID: 1
  }, {
    image: require('@images/products/car.jpg'),
    title: "Rạng Đông tìm kiếm đối tác kết nối sản phẩm CNHT - Phích nước thủy tinh",
    content: "Công ty cổ phần Bóng đèn Phích nước Rạng Đông (tiền thân là nhà máy Bóng đèn Phích nước Rạng Đông) được khởi công xây dựng từ năm 1958, là một trong 13 nhà máy đầu tiên được thành lập theo quyết định của Chính phủ, đặt nền móng cho nền công nghiệp Việt Nam thời kỳ đầu xây dựng chủ nghĩa xã hội.",
    from: '2022-05-04',
    view: 10,
    tags: ["Bóng đèn", "Rạng đông"],
    ID: 12
  }, {
    image: require('@images/products/leather-shoes.jpg'),
    title: "Nhựa An Phú Việt tìm kiếm đối tác kết nối sản phẩm CNHT – Linh kiện điện thoại vỏ ốp",
    content: "Công ty TNHH nhựa An Phú Việt chuyên sản xuất các sản phẩm từ plastic như linh kiện điện tử, điện thoại, xe máy; lắp ráp các phụ tùng thiết bị điện tử cung cấp cho các Công ty lớn như Samsung Việt Nam, Panasonic, Brother, Honda,...",
    from: '2022-05-03',
    view: 25,
    tags: null,
    ID: 13
  }, {
    image: require('@images/products/mechanical-engineering.jpg'),
    title: "Thành Long tìm kiếm đối tác kết nối sản phẩm CNHT - Lò xo",
    content: "CÔNG TY TNHH LÒ XO THÀNH PHÁT chuyên sản xuất các loại lò xo dùng trong sản xuất công nghiệp, dịch vụ, mặt hàng trang trí ... Lò xo được sản xuất trên dây chuyền công nghệ máy móc CNC hiện đại hoàn toàn tự động , đáp ứng được mọi yêu cầu của khách hàng",
    from: '2022-06-01',
    view: 200,
    tags: ["Cơ khí chế tạo", "ThanhLong", "THÀNH PHÁT"],
    ID: 14
  }, {
    image: require('@images/products/car.jpg'),
    title: "Rạng Đông tìm kiếm đối tác kết nối sản phẩm CNHT - Phích nước thủy tinh",
    content: "Công ty cổ phần Bóng đèn Phích nước Rạng Đông (tiền thân là nhà máy Bóng đèn Phích nước Rạng Đông) được khởi công xây dựng từ năm 1958, là một trong 13 nhà máy đầu tiên được thành lập theo quyết định của Chính phủ, đặt nền móng cho nền công nghiệp Việt Nam thời kỳ đầu xây dựng chủ nghĩa xã hội.",
    from: '2022-05-04',
    view: 10,
    tags: ["Bóng đèn", "Rạng đông"],
    ID: 15
  }, {
    image: require('@images/products/leather-shoes.jpg'),
    title: "Nhựa An Phú Việt tìm kiếm đối tác kết nối sản phẩm CNHT – Linh kiện điện thoại vỏ ốp",
    content: "Công ty TNHH nhựa An Phú Việt chuyên sản xuất các sản phẩm từ plastic như linh kiện điện tử, điện thoại, xe máy; lắp ráp các phụ tùng thiết bị điện tử cung cấp cho các Công ty lớn như Samsung Việt Nam, Panasonic, Brother, Honda,...",
    from: '2022-05-03',
    view: 25,
    tags: null,
    ID: 16
  }]
  const [refreshing, setRefreshing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(_data);
  const [takenTotal, setTakenTotal] = useState(6);
  const [total, setTotal] = useState(20);
  const [footerLoad, setFooterLoad] = useState(true);
  const navigation = useNavigation();
  const [showDetail, setShowDetail] = useState(false);
  const [searchStr, setSearchStr] = useState('');
  const [order, setOrder] = useState('ID|DESC');
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (takenTotal > data.length) {
          data.push(..._data);
        }
        if (searchStr != '' && searchStr != null) {
          let _ = data.filter(x => { return x.title.toLowerCase().includes(searchStr) });
          setData(_);
        }
      } catch (error) {
      }
      setIsLoading(false);
      setRefreshing(false);
    };
    if (refreshing || isLoading)
      fetchData();
    return () => { };
  }, [refreshing, isLoading]);

  useEffect(() => {
  }, [showMoreBox]);

  const onRefresh = () => {
    setRefreshing(true);
  };
  //Loadmore flatlist
  const getLoadMore = async () => {
    setFooterLoad(true);
    if (takenTotal < total) {
      setTakenTotal(takenTotal + 6);
      setRefreshing(true);
    }
    else {
      setFooterLoad(false);
    }
  };
  //Chuyển đổi kiểu hiển thị
  const toggleSwitch = () => {
    setRefreshing(true);
    setShowDetail(!showDetail)
    setTakenTotal(6);
  }

  //Hàm tìm kiếm
  const onChangeText = (e) => {
    tmrSearch && clearTimeout(tmrSearch);
    tmrSearch = setTimeout(_ => {
      setSearchStr(e);
      setRefreshing(true)
    }, 1000);
  }
  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
        <>
          <View style={styles.SearchNMore}>
            <View style={showSearchBox ? styles.toggleShow : styles.toggleHide}>
              <Flex>
                <TDSearchComponent placeholder="Tìm kiếm" onChangeText={(e) => onChangeText(e)} onSubmitEditing={(e) => onChangeText(e)} />
              </Flex>
            </View>
            <View style={showMoreBox ? styles.toggleShow : styles.toggleHide}>
              <Flex key={"fl1"}>
                <Text style={{ paddingLeft: 10, paddingRight: 15, fontWeight: 'bold' }}>Hiển thị chi tiết</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={showDetail ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={showDetail}
                />
              </Flex>
              <Flex key={"fl2"}>
                <TDRadioList
                  onChangeValue={value => { setOrder(value) }}
                  value={order}
                  data={fullOrderData}
                  title="Sắp xếp"
                  inline />
              </Flex>
            </View>
          </View>
          <FlatList
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data ? data : []}
            renderItem={({ item, index }) => {
              return <RenderItem item={item} navigation={navigation} showDetail={showDetail} numberOrder={index + 1} />;
            }}
            //onScroll={(a, b) => { _handleOnScroll(a, b) }}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <Text style={{ textAlign: 'center', color: '#50565B', marginTop: 10 }}>Không có dữ liệu</Text>
            )}
            onEndReached={() => {
              getLoadMore()
            }}
            onScroll={() => { 
              setShowSearchBox(false);
              setShowMoreBox(false);
            }}
            onEndReachedThreshold={0.5}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            ListFooterComponent={data.length == 0 ? (<></>) : footerLoad ? <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} /> : <View><Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', paddingTop: 30, paddingBottom: 30 }}>Đã hết danh sách!</Text></View>}
          />
        </>
      )
      }
    </>
  );
};

//Render item trong danh sách
const RenderItem = (props) => {
  const { navigation, item, showDetail, numberOrder } = props;
  const [state, setState] = useState({
    activeSections: [],
  })
  const onChange = (activeSections) => {
    setState({ activeSections });
  }
  return (
    <View style={{ width: '100%' }}>
      <Text style={styles.badge}>{numberOrder}</Text>
      {!showDetail ? (
        <Accordion onChange={onChange} activeSections={state.activeSections}>
          <Accordion.Panel header={
            <View style={{ width: '98%' }}>
              <TouchableOpacity onPress={() => { navigation.navigate("ForBuy_DetailScreen", { id: item.ID }) }}>
                <Text style={styles.headerText}>{item.title}</Text>
              </TouchableOpacity>
              <Text style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 13, color: Colors.lightGray }}>
                  <FontAwesome name="calendar-plus" size={13} color={Colors.lightGray} />&nbsp;
                  {item.from ? moment(item.from).format("DD/MM/yyyy") : ""}
                  &emsp;
                  <FontAwesome name="eye" size={13} color={Colors.lightGray} />&nbsp;
                  {item.view}
                </Text>
                &emsp;
                {item.tags?.map(a => { return (<Tag style={{ paddingRight: 3 }} key={"fbt" + item.ID + a} small>{a}</Tag>) })}
              </Text>
            </View>
          }>
            {state.activeSections.length != 0 ?
              <View style={{ width: '100%' }}>
                <Text>{item.content}</Text>
                <Image
                  resizeMode={'contain'}
                  source={item.image}
                  style={styles.itemImage}
                />
                <Button type="primary" onPress={() => { navigation.navigate("ForBuy_DetailScreen", { id: item.ID }) }}>Xem thông tin</Button>
              </View> : <></>
            }
          </Accordion.Panel >
        </Accordion >)
        :
        (<View>
          <Text style={styles.headerText}>{item.title}</Text>
          <Text>
            <Text style={{ fontSize: 13, color: Colors.lightGray }}>
              <FontAwesome name="calendar-plus" size={13} color={Colors.lightGray} />&nbsp;
              {item.from ? moment(item.from).format("DD/MM/yyyy") : ""}
              &emsp;
              <FontAwesome name="eye" size={13} color={Colors.lightGray} />&nbsp;
              {item.view}
            </Text>
            &emsp;
            {item.tags?.map(a => { return (<Tag style={{ paddingRight: 3 }} key={"fbt" + item.ID + a} small>{a}</Tag>) })}
          </Text>
          <Image
            resizeMode={'contain'}
            source={item.image}
            style={styles.itemImage}
          />
        </View>
        )}
    </View >
  )
}

export default FB_List;

const styles = StyleSheet.create({
  SearchNMore: {
    backgroundColor: "#90c6ed78", width: '100%', shadowColor: "#000",
    shadowOffset: { width: 0, height: 1, },
    shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3,
  },
  headerText: { paddingTop: 15, paddingBottom: 3, fontWeight: 'bold', fontSize: 18 },
  itemImage: { width: '100%', height: 200, marginBottom: 2, marginRight: 10, borderRadius: 5 },
  toggleShow: { opacity: 1, transition: "all .2s", visibility: "visible" },
  toggleHide: { opacity: 0, transition: "all .2s", visibility: "hidden", display: 'none' },
  badge: { position: 'absolute', top: 7, left: -3, zIndex: 9999, backgroundColor: Colors.transparentBlueHope, color: Colors.white, borderRadius: 12, paddingHorizontal: 5, fontSize: 12 }
})
