/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import { StyleSheet, ScrollView, View, Image, Text } from 'react-native';
import { Tag, List, Flex } from '@ant-design/react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import moment from 'moment';
import { Component_Header } from '@app/components';
import { Colors } from '@themes';

const Item = List.Item
const FB_MiniList = (props) => {
  const navigation = useNavigation();
  const { headerText, onPressSeeMore, showSeeMore } = props;
  const data = [{
    image: require('@images/products/mechanical-engineering.jpg'),
    title: "Thành Long tìm kiếm đối tác kết nối sản phẩm CNHT - Lò xo",
    content: "CÔNG TY TNHH LÒ XO THÀNH PHÁT chuyên sản xuất các loại lò xo dùng trong sản xuất công nghiệp, dịch vụ, mặt hàng trang trí ... Lò xo được sản xuất trên dây chuyền công nghệ máy móc CNC hiện đại hoàn toàn tự động , đáp ứng được mọi yêu cầu của khách hàng",
    from: '2022-06-01',
    view: 200,
    tags: ["Cơ khí chế tạo", "ThanhLong", "CÔNG TY TNHH LÒ XO THÀNH PHÁT"],
    ID: 1
  }, {
    image: require('@images/products/car.jpg'),
    title: "Rạng Đông tìm kiếm đối tác kết nối sản phẩm CNHT - Phích nước thủy tinh",
    content: "Công ty cổ phần Bóng đèn Phích nước Rạng Đông (tiền thân là nhà máy Bóng đèn Phích nước Rạng Đông) được khởi công xây dựng từ năm 1958, là một trong 13 nhà máy đầu tiên được thành lập theo quyết định của Chính phủ, đặt nền móng cho nền công nghiệp Việt Nam thời kỳ đầu xây dựng chủ nghĩa xã hội.",
    from: '2022-05-04',
    view: 10,
    tags: ["Bóng đèn", "Rạng đông"],
    ID: 2
  }, {
    image: require('@images/products/leather-shoes.jpg'),
    title: "Nhựa An Phú Việt tìm kiếm đối tác kết nối sản phẩm CNHT – Linh kiện điện thoại vỏ ốp",
    content: "Công ty TNHH nhựa An Phú Việt chuyên sản xuất các sản phẩm từ plastic như linh kiện điện tử, điện thoại, xe máy; lắp ráp các phụ tùng thiết bị điện tử cung cấp cho các Công ty lớn như Samsung Việt Nam, Panasonic, Brother, Honda,...",
    from: '2022-05-03',
    view: 25,
    tags: null,
    ID: 3
  }]
  return (
    <View>
      <List renderHeader={<Component_Header
        headerText={headerText || "Thông tin chào mua"}
        seeMore={{ show: showSeeMore == null ? true : showSeeMore, onPressFunc: onPressSeeMore }}
        textIcon={{ name: "bags-shopping", color: Colors.blueHope, size: 18 }}></Component_Header>}>
        {
          data.map((x, index) => {
            return (
              <Item key={"fs" + index} arrow="empty" multipleLine wrap={true} onPress={() => {
                navigation.navigate('ForBuy_DetailScreen', { id: x.ID });
              }} thumb={
                <Image
                  source={x.image}
                  style={styles.itemImage}
                />
              } style={{}}>
                {x.title}
                <Text>
                  <Text style={{ fontSize: 13, color: Colors.lightGray }}>
                    <FontAwesome name="calendar-plus" size={13} color={Colors.lightGray} />&nbsp;
                    {x.from ? moment(x.from).format("DD/MM/yyyy") : ""}
                    &emsp;
                    <FontAwesome name="eye" size={13} color={Colors.lightGray} />&nbsp;
                    {x.view}
                  </Text>
                  &emsp;
                  {x.tags?.map(a => { return (<Tag style={{ paddingRight: 3 }} key={"fbmt" + a} small>{a}</Tag>) })}
                </Text>
              </Item>
            )
          })
        }
      </List >
    </View >
  );
};

export default FB_MiniList;

const styles = StyleSheet.create({
  headerText: { paddingTop: 8, paddingLeft: 15, paddingBottom: 8, fontWeight: 'bold', fontSize: 18 },
  itemImage: { width: 75, height: 75, marginBottom: 2, marginRight: 10, borderRadius: 5 }
})
